import { DateTime } from 'luxon';
import holidayData from './data/2021-sg-stat-holidays.json';
import basicsData from './data/schedule-templates/basics-schedule-template.json';
// import ftbcDataJson from './data/schedule-templates/ftbc1.0-schedule-template.json';
import ftbcDataJson from './data/schedule-templates/ftbc2.0-schedule-template.json';
// import ftbcDataJson from './data/schedule-templates/ftbc3.0-schedule-template.json';
import ptbcDataJson from './data/schedule-templates/ptbc1.0-schedule-template.json';
// import ptbcDataJson from './data/schedule-templates/ptbc2.0-schedule-template.json';

const publicHolidays = holidayData.PH;
const publicHolidayArray = [];
// get array of all public holiday dates
Object.keys(publicHolidays).map((key, index) => {
  publicHolidayArray.push(key);
});

const companyHolidays = holidayData.company;
const companyHolidayArray = [];
const winterBreak = [];
// get array of all company holiday dates
Object.keys(companyHolidays).map((key, index) => {
  companyHolidayArray.push(key);
  // get array of winter break dates
  if (companyHolidays[key].name === 'winter break') {
    winterBreak.push(companyHolidays[key].date);
  }
});

const phWithoutCh = [];
// get array of public holidays not including those included in winter break
publicHolidayArray.forEach((holiday) => {
  if (!companyHolidayArray.includes(holiday)) {
    phWithoutCh.push(holiday);
  }
});

let bootcampData;

// helper function for getting utc date/time
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

// helper function for deciding what goes in topLevelObject based on course type
const generateTopLevelObject = (courseType, topLevelObject, lessonDays) => {
  if (courseType === 'Basics') {
    topLevelObject = {
      daysOfWeek: lessonDays,
      courseStartIndex: basicsData.courseStartIndex,
      totalCourseDays: basicsData.totalCourseDays,
      ...topLevelObject,
    };
  } else {
    const bootcampDays = bootcampData.daysOfWeek;
    const startIndex = bootcampData.courseStartIndex;

    topLevelObject = {
      daysOfWeek: bootcampDays,
      courseStartIndex: startIndex,
      totalCourseDays: bootcampData.totalCourseDays,
      ...topLevelObject,
    };
  }

  return topLevelObject;
};

// helper function that generates dateObj if the course date falls on a public holiday
const generateHolidayObject = (dateString, week, date, dateObj, courseType) => {
  let weekOfCourse;
  if (courseType.includes('Bootcamp') && companyHolidayArray.includes(dateString)) {
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

  if (phWithoutCh.includes(dateString)) {
    dateObj.dateTypes = publicHolidays[dateString];
  } else {
    dateObj.dateTypes = companyHolidays[dateString];
  }

  return dateObj;
};

// helper function that generates dateObj for a normal courseday
const generateCourseDayObject = (dateObj, dateString, week, weekDay, date, utc, courseType, courseDay) => {
  // get whatever index of basicsData that is specified by courseDayCount

  dateObj = {
    courseDate: dateString,
    courseWeek: week,
    weekDay,
    dayNumber: date.weekday,
    meetingDateTimeUTC: utc,
  };

  // data is different for basics and bootcamp
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

// helper function for generating filename
const getFilename = (startDate, endDate, courseType, batchNum) => {
  const displayDate = DateTime.fromFormat(startDate, 'yyyy-MM-dd');
  const displayName = `${displayDate.toFormat('dd-MM-yyyy')}_${endDate}_${courseType}${batchNum}`;
  return displayName;
};

// ##################################################################
// ##################################################################

const generateDataObject = (startDate, batchNum, courseType, input, lessonDays) => {
  // used if we are generating batch schedule straight after making changes to main json file
  if (input) {
    bootcampData = input;
  } else if (courseType === 'FTBC') {
    bootcampData = ftbcDataJson;
  } else if (courseType === 'PTBC') {
    bootcampData = ptbcDataJson;
  }

  console.log('lesson days', lessonDays);
  // used to set the time for basics course
  let basicsTimeslots;
  if (lessonDays) {
    if (lessonDays[0] === 1 && lessonDays[1] === 4) {
      basicsTimeslots = ['T19:30', 'T19:30'];
    } else if (lessonDays[0] === 7 && lessonDays[1] === 4) {
      basicsTimeslots = ['T19:00', 'T19:30'];
    } else {
      basicsTimeslots = ['T19:30', 'T13:00'];
    }
  }

  // random times, basicsTimeslots is only used for basics course
  if (basicsTimeslots === undefined) {
    basicsTimeslots = ['T19:30', 'T13:00'];
  }

  let date = DateTime.fromFormat(startDate, 'yyyy-MM-dd');
  let utc;
  utc = getLocalDateTime(utc, 'T16:00', courseType, date);
  let dateWeek = DateTime.fromFormat(startDate, 'yyyy-MM-dd');
  let classDatesCount = 1;
  let week;
  if (courseType === 'Basics') {
    week = 0;
  } else {
    week = 1;
  }
  let weekDay = 1;
  let data;
  let courseDayCount;
  // starts from 0 because it's tracking the index of the json data file
  let courseDay = 0;

  const topLevelObject = {
    courseType,
    days: {},
  };

  data = generateTopLevelObject(courseType, topLevelObject, lessonDays, batchNum);

  // set the number of course days based on course type
  if (courseType === 'Basics') {
    courseDayCount = basicsData.days.length;
  } else if (courseType === 'FTBC') {
    courseDayCount = ftbcDataJson.days.length;
  } else if (courseType === 'PTBC') {
    courseDayCount = ptbcDataJson.days.length;
  }

  const dayArray = data.daysOfWeek;
  console.log('day array', dayArray);
  let dayIndex = data.courseStartIndex;

  while (courseDayCount > 0) {
    const dateString = date.toFormat('dd-MM-yyyy');

    // setting filename from start date, end date, courseType (FTBC/PTBC/Basics), batchNum
    // if this condition is met, dateString will be the end date of course
    if (courseDay + 1 === data.totalCourseDays) {
      // start date
      data.courseName = getFilename(startDate, dateString, courseType, batchNum);
    }

    let dateObj;
    // if date is a public holiday
    if (phWithoutCh.includes(dateString) || winterBreak.includes(dateString)) {
      dateObj = generateHolidayObject(dateString, week, date, dateObj, courseType);
      // if date is not a holiday
    } else {
      dateObj = generateCourseDayObject(dateObj, dateString, week, weekDay, date, utc, courseType, courseDay);

      // increase course days on days that classes are held,
      // DO NOT increase course days on holidays
      courseDayCount -= 1;
      courseDay += 1;
    }
    data.days[dateString] = dateObj;

    // Check for first day of Basics course
    const firstDay = DateTime.fromFormat(startDate, 'yyyy-MM-dd').toFormat('dd-MM-yyyy');
    const formattedDate = date.toFormat('dd-MM-yyyy');

    if (classDatesCount === data.totalCourseDays && courseType === 'Basics') {
      date = date.plus({ weeks: 1 }).set({ weekday: 1 });
      utc = getLocalDateTime(utc, 'T19:30', courseType, date);
      weekDay += 1;
      week += 1;

      // If last day of FTBC is not Friday, add days to schedule to end on Friday
    } else if (courseType === 'FTBC' && data.days[date.toFormat('dd-MM-yyyy')].courseDay === 112 && date.weekday !== 2) {
      // Get number of days to Friday
      let differenceInDays;
      if (date.weekday === 1) {
        differenceInDays = 5 - date.weekday;
      } else if (date.weekday === 5) {
        differenceInDays = 7;
        week += 1;
      } else if (date.weekday === 4) {
        differenceInDays = 8;
      } else {
        differenceInDays = 9;
      }

      // Get extra dates to Friday
      const datesToAdd = [];
      for (let i = 1; i <= differenceInDays; i += 1) {
        const newDate = date.plus({ days: i }).toFormat('dd-MM-yyyy');
        const newWeekday = DateTime.fromFormat(newDate, 'dd-MM-yyyy').weekday;
        console.log('new ', newWeekday);
        if (newWeekday < 6) {
          datesToAdd.push(newDate);
        }
      }

      // Put all dates to add to schedule in combinedDates array
      // Consider possibility of public holiday occuring during those days
      const newDateObjectsArray = [];
      for (let k = 0; k < datesToAdd.length; k += 1) {
        let addedCourseday;
        if (phWithoutCh.includes(datesToAdd[k])) {
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
      if (phWithoutCh.includes(newDateObjectsArray[newDateObjectsArray.length - 3].date)) {
        featureFreezeDay = newDateObjectsArray[newDateObjectsArray.length - 4].date;
      } else {
        featureFreezeDay = newDateObjectsArray[newDateObjectsArray.length - 3].date;
      }

      // End date is project presentation day
      // Move forward if day falls on public holiday
      let endDate;
      if (phWithoutCh.includes(newDateObjectsArray[newDateObjectsArray.length - 1].date)) {
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
        } else if (phWithoutCh.includes(newDateObjectsArray[j].date)) {
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
        date = date.plus({ weeks: 1 }).set({ weekday: dayArray[dayIndex] });
        dateWeek = dateWeek.plus({ weeks: 1 });
        if (!companyHolidayArray.includes(dateString)) {
          week += 1;
        }
        utc = getLocalDateTime(utc, basicsTimeslots[0], courseType, date);
      } else {
        // Day within week
        dayIndex += 1;
        date = date.set({ weekday: dayArray[dayIndex] });
        if (!phWithoutCh.includes(dateString)) {
          weekDay += 1;
        }
        utc = getLocalDateTime(utc, basicsTimeslots[1], courseType, date);
      }
    }
    // Increase classDatesCount regardless of whether day is public holiday
    classDatesCount += 1;
  }
  console.log('data', data);
  return data;
};

export default generateDataObject;
