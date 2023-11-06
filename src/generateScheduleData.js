import { DateTime } from "luxon";
import holidayData from "./data/holidays.json";
// import ftbcDataJson from "./data/schedule-templates/ftbc3.0-schedule-template.json";
// import ftbcDataJson from "./data/schedule-templates/ftbc3.1-schedule-template.json";
import ftbcDataJson from "./data/schedule-templates/ftbc3.2-schedule-template.json";

// import ptbcDataJson from "./data/schedule-templates/ptbc3.0-schedule-template.json";
// import ptbcDataJson from "./data/schedule-templates/ptbc3.1-schedule-template.json";
import ptbcDataJson from "./data/schedule-templates/ptbc3.2-schedule-template.json";

const { publicHolidays } = holidayData;
const publicHolidayArray = [];
// get array of all public holiday dates
Object.keys(publicHolidays).map((key) => {
  publicHolidayArray.push(key);
});

const { schoolHolidays } = holidayData;
const schoolHolidayArray = [];
const winterBreak = [];
// Get array of all school holiday dates
Object.keys(schoolHolidays).map((key) => {
  schoolHolidayArray.push(key);
  // Get array of winter break dates
  if (schoolHolidays[key].name === "winter break") {
    winterBreak.push(schoolHolidays[key].date);
  }
});

const publicHolidaysNotSchoolHolidays = [];
// Get array of public holidays not including those included in winter break
publicHolidayArray.forEach((holiday) => {
  if (!schoolHolidayArray.includes(holiday)) {
    publicHolidaysNotSchoolHolidays.push(holiday);
  }
});

// Retrieve template based on FTBC or PTBC course types
const getBootcampScheduleDataTemplate = (courseType) =>
  courseType === "FTBC" ? ftbcDataJson : ptbcDataJson;

// Generate base course schedule template based on course type
const generateScheduleDataTemplate = (courseType) => {
  const bootcampScheduleDataTemplate =
    getBootcampScheduleDataTemplate(courseType);

  return {
    courseType,
    days: {},
    daysOfWeek: bootcampScheduleDataTemplate.daysOfWeek,
    courseStartDaysOfWeekIndex:
      bootcampScheduleDataTemplate.courseStartDaysOfWeekIndex,
    totalCourseDays: bootcampScheduleDataTemplate.totalCourseDays,
  };
};

// Generate filename. startDateStr and endDateStr have format yyyy-MM-dd.
const generateScheduleFileName = (
  startDateStr,
  endDateStr,
  courseType,
  batchNum
) => `${courseType}${batchNum}_${startDateStr}_${endDateStr}`;

// Generate schedule record for holiday
const generateHolidayObject = (currDateStr, courseWeek, date) => ({
  courseDate: currDateStr,
  courseWeek: schoolHolidayArray.includes(currDateStr) ? null : courseWeek,
  dayNumber: date.weekday,
  dateTypes: publicHolidaysNotSchoolHolidays.includes(currDateStr)
    ? publicHolidays[currDateStr]
    : schoolHolidays[currDateStr],
});

// Return ISO representation of specific course date's time in UTC
const getUtcDateTimeForCourseDate = (courseType, currDate) => {
  const formattedDate = currDate.toFormat("yyyy-MM-dd");
  let utcTime;

  if (courseType === "FTBC") {
    utcTime = DateTime.fromISO(`${formattedDate}T10:00`, { zone: "Singapore" })
      .toUTC()
      .toISO();
  } else if (courseType === "PTBC" && currDate.weekday < 6) {
    utcTime = DateTime.fromISO(`${formattedDate}T19:30`, { zone: "Singapore" })
      .toUTC()
      .toISO();
  } else if (courseType === "PTBC" && currDate.weekday === 6) {
    utcTime = DateTime.fromISO(`${formattedDate}T10:00`, { zone: "Singapore" })
      .toUTC()
      .toISO();
  }
  return utcTime;
};

// Generate schedule record for course day
const generateCourseDayObject = (
  courseType,
  currDate,
  currDateStr,
  courseWeek,
  courseDayIndex
) => {
  // Add class time to currDate and convert to UTC
  let utcDateTimeForCourseDate = getUtcDateTimeForCourseDate(
    courseType,
    currDate
  );

  const bootcampScheduleDataTemplate =
    getBootcampScheduleDataTemplate(courseType);

  return {
    courseDate: currDateStr,
    courseWeek: courseWeek,
    dayNumber: currDate.weekday,
    meetingDateTimeUtc: utcDateTimeForCourseDate,
    ...bootcampScheduleDataTemplate.days[courseDayIndex],
  };
};

const generateScheduleData = (startDateStr, batchNum, courseType) => {
  const finalScheduleData = generateScheduleDataTemplate(courseType);

  let courseDayIndex = 0;
  let dayOfWeekIndex = finalScheduleData.courseStartDaysOfWeekIndex;
  let currDate = DateTime.fromFormat(startDateStr, "yyyy-MM-dd");
  let courseWeek = 1;
  let existsHolidayOnCourseDayInCurrWeek = false;

  // Create schedule records for every course day and holiday for specific batch
  while (courseDayIndex < finalScheduleData.totalCourseDays) {
    const currDateStr = currDate.toFormat("yyyy-MM-dd");

    // Generate schedule file name when we have calculated end date
    if (courseDayIndex === finalScheduleData.totalCourseDays - 1) {
      finalScheduleData.courseName = generateScheduleFileName(
        startDateStr,
        currDateStr,
        courseType,
        batchNum
      );
    }

    // If currDate is holiday, add holiday to schedule
    if (
      publicHolidaysNotSchoolHolidays.includes(currDateStr) ||
      winterBreak.includes(currDateStr)
    ) {
      finalScheduleData.days[currDateStr] = generateHolidayObject(
        currDateStr,
        courseWeek,
        currDate
      );
      existsHolidayOnCourseDayInCurrWeek = true;
    }
    // Else add course day to schedule
    else {
      finalScheduleData.days[currDateStr] = generateCourseDayObject(
        courseType,
        currDate,
        currDateStr,
        courseWeek,
        courseDayIndex
      );

      // Increase course day index on class days, not holidays
      courseDayIndex += 1;
    }

    // If reached end of week, return to beginning of day of week array
    if (dayOfWeekIndex === finalScheduleData.daysOfWeek.length - 1) {
      // If there was a holiday on a course day in an FTBC course in current week, use Friday as make-up
      if (
        courseType === "FTBC" &&
        existsHolidayOnCourseDayInCurrWeek &&
        currDate.weekday < 5
      ) {
        currDate = currDate.set({ weekday: 5 });
      }
      // Proceed to next week
      else {
        dayOfWeekIndex = 0;
        if (!schoolHolidayArray.includes(currDateStr)) {
          courseWeek += 1;
        }
        existsHolidayOnCourseDayInCurrWeek = false;
        currDate = currDate
          .plus({ weeks: 1 })
          .set({ weekday: finalScheduleData.daysOfWeek[dayOfWeekIndex] });
      }
    }
    // Else move currDate to next course day within same week
    else {
      dayOfWeekIndex += 1;
      currDate = currDate.set({
        weekday: finalScheduleData.daysOfWeek[dayOfWeekIndex],
      });
    }
  }

  return finalScheduleData;
};

export default generateScheduleData;
