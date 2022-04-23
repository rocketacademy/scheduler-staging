import { DateTime } from 'luxon';
import holidayData from './data/holidays.json';
import basicsData from './data/schedule-templates/basics-schedule-template.json';
// import ftbcDataJson from './data/schedule-templates/ftbc1.0-schedule-template.json';
import ftbcDataJson from './data/schedule-templates/ftbc2.0-schedule-template.json';
// import ftbcDataJson from './data/schedule-templates/ftbc3.0-schedule-template.json';
import ptbcDataJson from './data/schedule-templates/ptbc1.0-schedule-template.json';
// import ptbcDataJson from './data/schedule-templates/ptbc2.0-schedule-template.json';
// import ptbcDataJson from './data/schedule-templates/ptbc3.0-schedule-template.json';

const { publicHolidays } = holidayData;
const publicHolidayArray = [];
// get array of all public holiday dates
Object.keys(publicHolidays).map((key, index) => {
  publicHolidayArray.push(key);
});

const { schoolHolidays } = holidayData;
const schoolHolidayArray = [];
const winterBreak = [];
// Get array of all school holiday dates
Object.keys(schoolHolidays).map((key, index) => {
  schoolHolidayArray.push(key);
  // Get array of winter break dates
  if (schoolHolidays[key].name === 'winter break') {
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
const getLocalDateTime = (utc, timeString, courseType, date) => {
  const changedFormat = date.toFormat('yyyy-MM-dd');
  if (courseType === 'Basics') {
    utc = DateTime.fromISO(changedFormat + timeString, { zone: 'Singapore' }).toUTC().toISO();
  } else if ((courseType === 'FTBC') || (courseType === 'PTBC' && (date.weekday === 6))) {
    utc = DateTime.fromISO(`${changedFormat}T10:00`, { zone: 'Singapore' }).toUTC().toISO();
  } else if (courseType === 'PTBC' && (date.weekday === 2)) {
    utc = DateTime.fromISO(`${changedFormat}T19:30`, { zone: 'Singapore' }).toUTC().toISO();
  }
  return utc;
};

const generateTopLevelObject = (courseType, lessonDays) => {
  const topLevelObject = {
    courseType,
    days: {},
  };

  if (courseType === 'Basics') {
    topLevelObject.daysOfWeek = lessonDays;
    topLevelObject.courseStartIndex = basicsData.courseStartIndex;
    topLevelObject.totalCourseDays = basicsData.totalCourseDays;
  } else {
    topLevelObject.daysOfWeek = bootcampData.daysOfWeek;
    topLevelObject.courseStartIndex = bootcampData.courseStartIndex;
    topLevelObject.totalCourseDays = bootcampData.totalCourseDays;
  }

  return topLevelObject;
};

// Generate dateObj if the course date falls on a public holiday
const generateHolidayObject = (dateString, week, date, dateObj, courseType) => {
  let weekOfCourse;
  if (courseType.includes('Bootcamp') && schoolHolidayArray.includes(dateString)) {
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
const generateCourseDayObject = (dateObj, dateString, week, weekDay, date, utc, courseType, courseDay) => {
  // Get index of basicsData that is specified by courseDayCount
  dateObj = {
    courseDate: dateString,
    courseWeek: week,
    weekDay,
    dayNumber: date.weekday,
    meetingDateTimeUTC: utc,
  };

  if (courseType === 'Basics') {
    dateObj = {
      ...dateObj, ...basicsData.days[courseDay],
    };
  } else if (courseType === 'FTBC' || courseType === 'PTBC') {
    dateObj = {
      ...dateObj, ...bootcampData.days[courseDay],
    };
  }
  return dateObj;
};

// Generate filename
const getFilename = (startDate, endDate, courseType, batchNum) => {
  const displayDate = DateTime.fromFormat(startDate, 'yyyy-MM-dd');
  const displayName = `${displayDate.toFormat('dd-MM-yyyy')}_${endDate}_${courseType}${batchNum}`;
  return displayName;
};

const generateDataObject = (startDate, batchNum, courseType, input, lessonDays) => {
  // Used if generating batch schedule after making changes to main JSON file
  if (input) {
    bootcampData = input;
  } else if (courseType === 'FTBC') {
    bootcampData = ftbcDataJson;
  } else if (courseType === 'PTBC') {
    bootcampData = ptbcDataJson;
  }

  // Set time for Basics course
  let basicsTimeslots = ['T19:30', 'T19:30'];
  if (lessonDays) {
    if (lessonDays[0] === 1 && lessonDays[1] === 4) {
      basicsTimeslots = ['T19:30', 'T19:30'];
    } else if (lessonDays[0] === 7 && lessonDays[1] === 4) {
      basicsTimeslots = ['T19:00', 'T19:30'];
    } else {
      basicsTimeslots = ['T19:30', 'T13:00'];
    }
  }

  let currDate = DateTime.fromFormat(startDate, 'yyyy-MM-dd');
  let utc;
  utc = getLocalDateTime(utc, 'T16:00', courseType, currDate);
  let dateWeek = DateTime.fromFormat(startDate, 'yyyy-MM-dd');
  let classDatesCount = 1;
  let week = courseType === 'Basics' ? 0 : 1;
  let weekDay = 1;
  let courseDayCount;
  // Starts from 0 to track index of JSON data file
  let courseDay = 0;

  const data = generateTopLevelObject(courseType, lessonDays);

  // Set num course days based on course type
  if (courseType === 'Basics') {
    courseDayCount = basicsData.days.length;
  } else if (courseType === 'FTBC') {
    courseDayCount = ftbcDataJson.days.length;
  } else if (courseType === 'PTBC') {
    courseDayCount = ptbcDataJson.days.length;
  }

  const dayArray = data.daysOfWeek;
  let dayIndex = data.courseStartIndex;

  while (courseDayCount > 0) {
    const dateString = currDate.toFormat('dd-MM-yyyy');

    // Set filename from start date, end date, courseType (FTBC/PTBC/Basics), batchNum
    // if this condition is met, dateString will be the end date of course
    if (courseDay + 1 === data.totalCourseDays) {
      // start date
      data.courseName = getFilename(startDate, dateString, courseType, batchNum);
    }

    let dateObj;
    // If date is a public holiday
    if (publicHolidaysNotSchoolHolidays.includes(dateString) || winterBreak.includes(dateString)) {
      dateObj = generateHolidayObject(dateString, week, currDate, dateObj, courseType);
    } else {
      dateObj = generateCourseDayObject(dateObj, dateString, week, weekDay, currDate, utc, courseType, courseDay);

      // increase course days on days that classes are held,
      // DO NOT increase course days on holidays
      courseDayCount -= 1;
      courseDay += 1;
    }
    data.days[dateString] = dateObj;

    // Check for first day of Basics course
    const firstDay = DateTime.fromFormat(startDate, 'yyyy-MM-dd').toFormat('dd-MM-yyyy');
    const formattedDate = currDate.toFormat('dd-MM-yyyy');

    if (classDatesCount === data.totalCourseDays && courseType === 'Basics') {
      currDate = currDate.plus({ weeks: 1 }).set({ weekday: 1 });
      utc = getLocalDateTime(utc, 'T19:30', courseType, currDate);
      weekDay += 1;
      week += 1;

      // If last day of FTBC is not Friday, add days to schedule to end on Friday
    } else if (courseType === 'FTBC' && data.days[currDate.toFormat('dd-MM-yyyy')].courseDay === 112 && currDate.weekday !== 2) {
      // Get number of days to Friday
      let differenceInDays;
      if (currDate.weekday === 1) {
        differenceInDays = 5 - currDate.weekday;
      } else if (currDate.weekday === 5) {
        differenceInDays = 7;
        week += 1;
      } else if (currDate.weekday === 4) {
        differenceInDays = 8;
      } else {
        differenceInDays = 9;
      }

      // Get extra dates to Friday
      const datesToAdd = [];
      for (let i = 1; i <= differenceInDays; i += 1) {
        const newDate = currDate.plus({ days: i }).toFormat('dd-MM-yyyy');
        const newWeekday = DateTime.fromFormat(newDate, 'dd-MM-yyyy').weekday;
        if (newWeekday < 6) {
          datesToAdd.push(newDate);
        }
      }

      // Put all dates to add to schedule in combinedDates array
      // Consider possibility of public holiday occuring during those days
      const newDateObjectsArray = [];
      for (let k = 0; k < datesToAdd.length; k += 1) {
        let addedCourseday;
        if (publicHolidaysNotSchoolHolidays.includes(datesToAdd[k])) {
          addedCourseday = null;
        } else {
          addedCourseday = 113 + k;
        }
        const dateInfo = {
          date: datesToAdd[k],
          courseday: addedCourseday,
        };
        newDateObjectsArray.push(dateInfo);
      }
      // Third-last courseday is feature freeze day
      // Move forward if day falls on public holiday
      let featureFreezeDay;
      if (publicHolidaysNotSchoolHolidays.includes(newDateObjectsArray[newDateObjectsArray.length - 3].date)) {
        featureFreezeDay = newDateObjectsArray[newDateObjectsArray.length - 4].date;
      } else {
        featureFreezeDay = newDateObjectsArray[newDateObjectsArray.length - 3].date;
      }

      // End date is project presentation day
      // Move forward if day falls on public holiday
      let endDate;
      if (publicHolidaysNotSchoolHolidays.includes(newDateObjectsArray[newDateObjectsArray.length - 1].date)) {
        endDate = newDateObjectsArray[newDateObjectsArray.length - 2].date;
      } else {
        endDate = newDateObjectsArray[newDateObjectsArray.length - 1].date;
      }

      // Find total course days after adding days
      let lastCourseDay;
      // Generate new dateObj
      for (let j = 0; j < newDateObjectsArray.length; j += 1) {
        const targetWeekday = DateTime.fromFormat(newDateObjectsArray[j].date, 'dd-MM-yyyy').weekday;
        const newDate = DateTime.fromFormat(newDateObjectsArray[j].date, 'dd-MM-yyyy');
        utc = getLocalDateTime(utc, 'T13:00', courseType, newDate);
        // Helper function to add dateObj to schedule data
        const addDateObjToSchedule = (dateObj) => {
          data.days[newDateObjectsArray[j].date] = dateObj;
          data.days[newDateObjectsArray[j].date].courseDay = newDateObjectsArray[j].courseday;
        };

        if (newDateObjectsArray[j].date === featureFreezeDay) {
          dateObj = generateCourseDayObject(dateObj, newDateObjectsArray[j].date, week, targetWeekday, newDate, utc, courseType, 113);
          addDateObjToSchedule(dateObj);
        } else if (newDateObjectsArray[j].date === endDate) {
          dateObj = generateCourseDayObject(dateObj, newDateObjectsArray[j].date, week, targetWeekday, newDate, utc, courseType, 115);
          addDateObjToSchedule(dateObj);
          lastCourseDay = dateObj.courseDay;
          // content is the same for all other days, except if the day is a public holiday
        } else if (publicHolidaysNotSchoolHolidays.includes(newDateObjectsArray[j].date)) {
          dateObj = generateHolidayObject(newDateObjectsArray[j].date, week, newDate, dateObj, courseType);
          addDateObjToSchedule(dateObj);
        } else {
          dateObj = generateCourseDayObject(dateObj, newDateObjectsArray[j].date, week, targetWeekday, newDate, utc, courseType, 114);
          addDateObjToSchedule(dateObj);
        }
      }
      data.courseName = getFilename(startDate, endDate, courseType, batchNum);
      data.totalCourseDays = lastCourseDay;
      break;
    } else {
      // First Basics class is pre-course briefing on Saturday (not included in daysOfWeek)
      // This end of dayArray (last day of week)
      if ((dayIndex === dayArray.length - 1)
                || (formattedDate === firstDay && courseType === 'Basics')) {
        weekDay = 1;
        // Return to beginning of array (return to beginning of week)
        dayIndex = 0;
        currDate = currDate.plus({ weeks: 1 }).set({ weekday: dayArray[dayIndex] });
        dateWeek = dateWeek.plus({ weeks: 1 });
        if (!schoolHolidayArray.includes(dateString)) {
          week += 1;
        }
        utc = getLocalDateTime(utc, basicsTimeslots[0], courseType, currDate);
      } else {
        // Day within week
        dayIndex += 1;
        currDate = currDate.set({ weekday: dayArray[dayIndex] });
        if (!publicHolidaysNotSchoolHolidays.includes(dateString)) {
          weekDay += 1;
        }
        utc = getLocalDateTime(utc, basicsTimeslots[1], courseType, currDate);
      }
    }
    // Increase classDatesCount regardless of whether day is public holiday
    classDatesCount += 1;
  }
  return data;
};

export default generateDataObject;
