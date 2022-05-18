import { DateTime } from "luxon";
import holidayData from "./data/holidays.json";
import ftbcDataJson from "./data/schedule-templates/ftbc1.0-schedule-template.json";
// import ftbcDataJson from "./data/schedule-templates/ftbc2.0-schedule-template.json";
// import ftbcDataJson from "./data/schedule-templates/ftbc3.0-schedule-template.json";
// import ptbcDataJson from "./data/schedule-templates/ptbc1.0-schedule-template.json";
// import ptbcDataJson from "./data/schedule-templates/ptbc2.0-schedule-template.json";
import ptbcDataJson from "./data/schedule-templates/ptbc3.0-schedule-template.json";

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

let bootcampData;

// Getting UTC datetime
const getLocalDateTime = (courseType, date) => {
  const changedFormat = date.toFormat("yyyy-MM-dd");
  let utc;
  if (courseType === "FTBC" || (courseType === "PTBC" && date.weekday === 6)) {
    utc = DateTime.fromISO(`${changedFormat}T10:00`, { zone: "Singapore" })
      .toUTC()
      .toISO();
  } else if (courseType === "PTBC" && date.weekday === 2) {
    utc = DateTime.fromISO(`${changedFormat}T19:30`, { zone: "Singapore" })
      .toUTC()
      .toISO();
  }
  return utc;
};

const generateTopLevelObject = (courseType) => {
  const topLevelObject = {
    courseType,
    days: {},
  };

  topLevelObject.daysOfWeek = bootcampData.daysOfWeek;
  topLevelObject.courseStartDaysOfWeekIndex =
    bootcampData.courseStartDaysOfWeekIndex;
  topLevelObject.totalCourseDays = bootcampData.totalCourseDays;

  return topLevelObject;
};

// Generate dateObj if the course date falls on a public holiday
const generateHolidayObject = (dateString, week, date, dateObj, courseType) => {
  let weekOfCourse;
  if (courseType.includes("BC") && schoolHolidayArray.includes(dateString)) {
    weekOfCourse = null;
  } else {
    weekOfCourse = week;
  }

  dateObj = {
    courseDay: null,
    courseDate: dateString,
    courseWeek: weekOfCourse,
    dayNumber: date.weekday,
    dateTypes: {},
  };

  if (publicHolidaysNotSchoolHolidays.includes(dateString)) {
    dateObj.dateTypes = publicHolidays[dateString];
  } else {
    dateObj.dateTypes = schoolHolidays[dateString];
  }

  return dateObj;
};

// Generate dateObj for a normal course day
const generateCourseDayObject = (
  dateObj,
  dateString,
  week,
  weekDay,
  date,
  utc,
  courseDay
) => ({
  courseDate: dateString,
  courseWeek: week,
  weekDay,
  dayNumber: date.weekday,
  meetingDateTimeUTC: utc,
  ...dateObj,
  ...bootcampData.days[courseDay],
});

// Generate filename
const getFilename = (startDate, endDate, courseType, batchNum) => {
  const displayDate = DateTime.fromFormat(startDate, "yyyy-MM-dd");
  const displayName = `${displayDate.toFormat(
    "dd-MM-yyyy"
  )}_${endDate}_${courseType}${batchNum}`;
  return displayName;
};

const generateDataObject = (startDate, batchNum, courseType) => {
  if (courseType === "FTBC") {
    bootcampData = ftbcDataJson;
  } else if (courseType === "PTBC") {
    bootcampData = ptbcDataJson;
  }

  let currDate = DateTime.fromFormat(startDate, "yyyy-MM-dd");
  let utc = getLocalDateTime(courseType, currDate);
  let dateWeek = DateTime.fromFormat(startDate, "yyyy-MM-dd");
  let week = 1;
  let weekDay = 1;
  let courseDayCount;
  // Starts from 0 to track index of JSON data file
  let courseDay = 0;

  const data = generateTopLevelObject(courseType);

  // Set num course days based on course type
  if (courseType === "FTBC") {
    courseDayCount = ftbcDataJson.days.length;
  } else if (courseType === "PTBC") {
    courseDayCount = ptbcDataJson.days.length;
  }

  const dayArray = data.daysOfWeek;
  let dayIndex = data.courseStartDaysOfWeekIndex;

  while (courseDayCount > 0) {
    const dateString = currDate.toFormat("dd-MM-yyyy");

    // Set filename from start date, end date, courseType (FTBC/PTBC), batchNum
    // if this condition is met, dateString will be the end date of course
    if (courseDay + 1 === data.totalCourseDays) {
      // start date
      data.courseName = getFilename(
        startDate,
        dateString,
        courseType,
        batchNum
      );
    }

    let dateObj;
    // If date is a public holiday
    if (
      publicHolidaysNotSchoolHolidays.includes(dateString) ||
      winterBreak.includes(dateString)
    ) {
      dateObj = generateHolidayObject(
        dateString,
        week,
        currDate,
        dateObj,
        courseType
      );
    } else {
      dateObj = generateCourseDayObject(
        dateObj,
        dateString,
        week,
        weekDay,
        currDate,
        utc,
        courseDay
      );

      // Increase course days on days that classes are held,
      // DO NOT increase course days on holidays
      courseDayCount -= 1;
      courseDay += 1;
    }
    data.days[dateString] = dateObj;

    // If we have reached end of week, return to beginning of array (i.e. beginning of week)
    if (dayIndex === dayArray.length - 1) {
      weekDay = 1;
      dayIndex = 0;
      currDate = currDate
        .plus({ weeks: 1 })
        .set({ weekday: dayArray[dayIndex] });
      dateWeek = dateWeek.plus({ weeks: 1 });
      if (!schoolHolidayArray.includes(dateString)) {
        week += 1;
      }
    }
    // Else the current day is within the week
    else {
      dayIndex += 1;
      currDate = currDate.set({ weekday: dayArray[dayIndex] });
      if (!publicHolidaysNotSchoolHolidays.includes(dateString)) {
        weekDay += 1;
      }
    }
    utc = getLocalDateTime(courseType, currDate);
  }
  return data;
};

export default generateDataObject;
