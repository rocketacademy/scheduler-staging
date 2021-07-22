import { DateTime } from 'luxon';
import holidayData from './data/sg-stat-holidays.json';
import basicsData from './data/basics-course-days.json';
import bootcampData from './data/bootcamp-course-days.json';

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

// helper function for getting utc date/time
const getLocalDateTime = (utc, timeString, courseName, courseType, date) => {
    const changedFormat = date.toFormat("yyyy-MM-dd");
    if (courseType === 'Basics') {
    utc = DateTime.fromISO(changedFormat + timeString, {zone: 'Singapore'}).toUTC().toISO();
    } else {
        if (courseType === 'Bootcamp' && Number(courseName) % 2 === 0) {
            utc = DateTime.fromISO(changedFormat + 'T13:00', {zone: 'Singapore'}).toUTC().toISO();
        } else if (courseType === 'Bootcamp' && Number(courseName) % 2 !== 0) {
            utc = DateTime.fromISO(changedFormat + 'T10:00', {zone: 'Singapore'}).toUTC().toISO();
        }
    }
    return utc;
}

// helper function for deciding what goes in topLevelObject based on course type
const generateTopLevelObject = (courseType, topLevelObject) => {
        if (courseType === 'Basics') {
            topLevelObject = {
                daysOfWeek: [2, 6],
                courseStartIndex: 1,
                totalCourseDays: 13,
                ...topLevelObject
            };
        } else if (courseType === 'Bootcamp') {
            topLevelObject = {
                daysOfWeek: [1, 2, 3, 4, 5],
                courseStartIndex: 0,
                totalCourseDays: 49,
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
    } else if (courseType === 'Bootcamp') {
            dateObj = {
            ...dateObj, ...bootcampData.days[courseDay]
        }
    }
    return dateObj;
}

const generateDataObject = (startDate, courseName, courseType) => {
    let date = DateTime.fromFormat(startDate, "yyyy-MM-dd");
    // T16:00 is the time of class on the first day
    let utc = DateTime.fromISO(startDate + 'T16:00', {zone: 'Singapore'}).toUTC().toISO();
    // utc = utc.toUTC().toISO();
    console.log('utc string', utc);
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

        data = generateTopLevelObject(courseType, topLevelObject);
        console.log(data);

        // set the number of course days based on course type
        if (courseType === 'Basics') {
            courseDayCount = 13;
        } else if (courseType === 'Bootcamp') {
            courseDayCount = 49;
        }

        const dayArray = data.daysOfWeek;
        let dayIndex = data.courseStartIndex;
    
        while (courseDayCount > 0) {
            const dateString = date.toFormat('dd-MM-yyyy');

            // setting filename from start date, end date, courseName of course 
            // if this consition is met, dateString will be the end date of course
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

           
            if (classDatesCount === data.totalCourseDays && courseType === 'Basics') {
                date = date.plus({ days: 2 }); 
                utc = getLocalDateTime (utc, 'T19:00', courseName, courseType, date);
                weekDay += 1;
                week += 1;

            } else {
                // this is the end of the dayArray (last day of the week)
                if ( dayIndex === dayArray.length -1) {
                    weekDay = 1;
                    week += 1;
                    dateWeek = dateWeek.plus({ weeks: 1 });
                    // at the end of the array, return to beginning of array (return to beginning of week)
                    dayIndex = 0;
                    date = date.plus({ weeks: 1 }).set({ weekday: dayArray[dayIndex] })
                    utc = getLocalDateTime (utc, 'T19:00', courseName, courseType, date);

                } else {
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

    return data;
}

export default generateDataObject;