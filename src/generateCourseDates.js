import { DateTime } from 'luxon';
import holidayData from './data/2021-sg-stat-holidays.json';
import basicsData from './data/basics-course-days.json';
import bootcampDataJson from './data/bootcamp-course-days.json';

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
    if(companyHolidays[key].name === 'winter break') {
        winterBreak.push(companyHolidays[key].date);
    }
});

const phWithoutCh = [];
// get array of public holidays not including those included in winter break
publicHolidayArray.forEach((holiday) => {
    if(!companyHolidayArray.includes(holiday)) {
        phWithoutCh.push(holiday);
    }
});

let bootcampData;

// helper function for getting utc date/time
const getLocalDateTime = (utc, timeString, courseName, courseType, date) => {
    const changedFormat = date.toFormat("yyyy-MM-dd");
    if (courseType === 'Basics') {
        utc = DateTime.fromISO(changedFormat + timeString, {zone: 'Singapore'}).toUTC().toISO();
    } else if (courseType === 'Bootcamp FT' && Number(courseName) % 2 === 0) {
        utc = DateTime.fromISO(changedFormat + 'T13:00', {zone: 'Singapore'}).toUTC().toISO();
    } else if ((courseType === 'Bootcamp FT' && Number(courseName) % 2 !== 0) || (courseType === 'Bootcamp PT' && (date.weekday === 6))) {
        utc = DateTime.fromISO(changedFormat + 'T10:00', {zone: 'Singapore'}).toUTC().toISO();
    } else if (courseType === 'Bootcamp PT' && (date.weekday === 1)) {
        utc = DateTime.fromISO(changedFormat + 'T19:30', {zone: 'Singapore'}).toUTC().toISO();
    } else if (courseType === 'Bootcamp PT' && (date.weekday === 6)) {
        utc = DateTime.fromISO(changedFormat + 'T10:00', {zone: 'Singapore'}).toUTC().toISO();
    }
    return utc;
}

// helper function for deciding what goes in topLevelObject based on course type
const generateTopLevelObject = (courseType, topLevelObject, lessonDays, courseName) => {
    console.log('lesson days', lessonDays);

        if (courseType === 'Basics') {
            topLevelObject = {
                daysOfWeek: lessonDays,
                courseStartIndex: 0,
                totalCourseDays: basicsData.totalCourseDays,
                ...topLevelObject
            };
        } else if (courseType === 'Bootcamp FT' || courseType === 'Bootcamp PT') {
            let bootcampDays;
            // TODO:  this is to be removed when ftbc4 finishes
            let startIndex;

            if (courseType === 'Bootcamp FT') {
                bootcampDays = bootcampData.daysOfWeek.fullTime;
                startIndex = bootcampData.courseStartIndex;
                if (courseName === '4') {
                    startIndex = 4;
                }
            } else {
                bootcampDays = bootcampData.daysOfWeek.partTime;
                startIndex = bootcampData.courseStartIndex;
            }

            topLevelObject = {
                daysOfWeek: bootcampDays,
                courseStartIndex: startIndex,
                totalCourseDays: bootcampData.totalCourseDays,
                ...topLevelObject
            }
        }

        return topLevelObject;
    }

// helper function that generates dateObj if the course date falls on a public holiday
const generateHolidayObject = (dateString, week, date, dateObj) => {
    dateObj = {
        courseDay: null,
        courseDate: dateString,
        courseWeek: week,
        dayNumber: date.weekday,
        dateTypes: {}
    }

    if (phWithoutCh.includes(dateString)) {
        dateObj.dateTypes = publicHolidays[dateString];
    } else {
        dateObj.dateTypes = companyHolidays[dateString];
    }

    return dateObj;
}

// helper function that generates dateObj for a normal courseday
const generateCourseDayObject = (dateObj, dateString, week, weekDay, date, utc, courseType, courseDay) => {
    // get whatever index of basicsData that is specified by courseDayCount
        dateObj = {
            courseDate: dateString,
            courseWeek: week,
            weekDay: weekDay,
            dayNumber: date.weekday, 
            meetingDateTimeUTC: utc,
            };
    
    // data is different for basics and bootcamp
    if (courseType === 'Basics') {
        dateObj = {
            ...dateObj, ...basicsData.days[courseDay]
        }
    } else if (courseType === 'Bootcamp FT' || courseType === 'Bootcamp PT') {
            dateObj = {
            ...dateObj, ...bootcampData.days[courseDay]
        }
    }
    return dateObj;
}

// ##################################################################
// ##################################################################

const generateDataObject = (startDate, courseName, courseType, input, lessonDays) => {
    // used if we are generating batch schedule straight after making changes to main json file
    if (input) {
        bootcampData = input;
    } else {
        bootcampData = bootcampDataJson;
    }

    let date = DateTime.fromFormat(startDate, "yyyy-MM-dd");
    let utc;
    utc = getLocalDateTime(utc, 'T16:00', courseName, courseType, date);
    let dateWeek = DateTime.fromFormat(startDate, "yyyy-MM-dd");
    let classDatesCount = 1;
    let week = 1;
    let weekDay = 1;
    let data;
    let courseDayCount;
    // starts from 0 because it's tracking the index of the json data file
    let courseDay = 0;

    let topLevelObject = {
            courseType: courseType,
            days: {}
        };

    data = generateTopLevelObject(courseType, topLevelObject, lessonDays, courseName);

    // set the number of course days based on course type
    if (courseType === 'Basics') {
        courseDayCount = 13;
    } else if (courseType === 'Bootcamp FT' || courseType === 'Bootcamp PT') {
        courseDayCount = 116;
    }

    const dayArray = data.daysOfWeek;
    let dayIndex = data.courseStartIndex;

    while (courseDayCount > 0) {
        const dateString = date.toFormat('dd-MM-yyyy');

        // setting filename from start date, end date, courseName of course 
        // if this condition is met, dateString will be the end date of course
        if (courseDay + 1 === data.totalCourseDays) {
            // start date
            const displayDate = DateTime.fromFormat(startDate, "yyyy-MM-dd");
            const displayName = `${displayDate.toFormat('dd-MM-yyyy')}_${dateString}_BATCH${courseName}`;
            data.courseName = displayName;
        }

        let dateObj;
        // if date is a public holiday
        if (phWithoutCh.includes(dateString) || winterBreak.includes(dateString)) {
            dateObj = generateHolidayObject (dateString, week, date, dateObj);

        // if date is not a holiday
        } else {
            dateObj = generateCourseDayObject (dateObj, dateString, week, weekDay, date, utc, courseType, courseDay);

            // increase course days on days that classes are held,
            // DO NOT increase course days on holidays
            courseDayCount -= 1;
            courseDay += 1;
        }
        data.days[dateString] = dateObj;

        const firstDay = DateTime.fromFormat(startDate, "yyyy-MM-dd").toFormat('dd-MM-yyyy');
        const formattedDate = date.toFormat('dd-MM-yyyy');

        if (classDatesCount === data.totalCourseDays && courseType === 'Basics') {
            date = date.plus({ days: 2 }); 
            utc = getLocalDateTime (utc, 'T19:30', courseName, courseType, date);
            weekDay += 1;
            week += 1;

        } else {
            // first meeting of basics is a pre-course meeting that always starts on a saturday
            // (not included in daysOfWeek)
            
            // this is the end of the dayArray (last day of the week)
            if (( dayIndex === dayArray.length -1) || 
                (formattedDate === firstDay && courseType === 'Basics')) {
                weekDay = 1;
                week += 1;
                dateWeek = dateWeek.plus({ weeks: 1 });
                // return to beginning of array (return to beginning of week)
                dayIndex = 0;
                date = date.plus({ weeks: 1 }).set({ weekday: dayArray[dayIndex] })
                utc = getLocalDateTime (utc, 'T19:30', courseName, courseType, date);

            } else {
                // day within the week
                dayIndex += 1;
                date = date.set({ weekday: dayArray[dayIndex] })
                utc = getLocalDateTime (utc, 'T13:00', courseName, courseType, date);

                if (!phWithoutCh.includes(dateString)) {
                    weekDay += 1;
                }
            }
        }
        // increase classDatesCount regardless of whether it is a public holiday
        classDatesCount += 1;
    }
    // TODO: needs to be removed after ftbc4 are finished
    if (courseType === 'Bootcamp FT' && courseName === '4') {
        data.days['09-07-2021'].dayNumber = 1;
    }
    return data;
}

export default generateDataObject;