import { DateTime } from 'luxon';
import holidayData from './data/2021-sg-stat-holidays.json';
import basicsData from './data/basics-course-days.json';
import bootcampDataJson from './data/bootcamp-course-days.json';
import ptbcDataJson from './data/ptbc-course-days.json';

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
    } else if ((courseType === 'Bootcamp FT') || (courseType === 'Bootcamp PT' && (date.weekday === 6))) {
        utc = DateTime.fromISO(changedFormat + 'T10:00', {zone: 'Singapore'}).toUTC().toISO();
    } else if (courseType === 'Bootcamp PT' && (date.weekday === 2)) {
        utc = DateTime.fromISO(changedFormat + 'T19:30', {zone: 'Singapore'}).toUTC().toISO();
    } 
    return utc;
}

// helper function for deciding what goes in topLevelObject based on course type
const generateTopLevelObject = (courseType, topLevelObject, lessonDays, courseName) => {

    if (courseType === 'Basics') {
        topLevelObject = {
            daysOfWeek: lessonDays,
            courseStartIndex: basicsData.courseStartIndex,
            totalCourseDays: basicsData.totalCourseDays,
            ...topLevelObject
        };
    } else {
        const bootcampDays = bootcampData.daysOfWeek;       
        let startIndex = bootcampData.courseStartIndex;

        // TODO:  this is to be removed when ftbc4 finishes
        if (courseType === 'Bootcamp FT' && courseName === '4') {
            startIndex = 4;
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

// helper function for generating filename
const getFilename = (startDate, dateString, courseName) => {
    const displayDate = DateTime.fromFormat(startDate, "yyyy-MM-dd");
    const displayName = `${displayDate.toFormat('dd-MM-yyyy')}_${dateString}_BATCH${courseName}`;
    return displayName;
}
 
// ##################################################################
// ##################################################################

const generateDataObject = (startDate, courseName, courseType, input, lessonDays) => {
    // used if we are generating batch schedule straight after making changes to main json file
    if (input) {
        bootcampData = input;
    } else if (courseType === 'Bootcamp FT') {
        bootcampData = bootcampDataJson;
    } else if (courseType === 'Bootcamp PT') {
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

    let date = DateTime.fromFormat(startDate, "yyyy-MM-dd");
    let utc;
    utc = getLocalDateTime(utc, 'T16:00', courseName, courseType, date);
    let dateWeek = DateTime.fromFormat(startDate, "yyyy-MM-dd");
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

    let topLevelObject = {
            courseType: courseType,
            days: {}
        };

    data = generateTopLevelObject(courseType, topLevelObject, lessonDays, courseName);

    // set the number of course days based on course type
    if (courseType === 'Basics') {
        courseDayCount = 13;
    } else if (courseType === 'Bootcamp FT') {
        courseDayCount = 116;
    } else if (courseType === 'Bootcamp PT') {
        courseDayCount = 97;
    }

    const dayArray = data.daysOfWeek;
    console.log('day array', dayArray);
    let dayIndex = data.courseStartIndex;

    while (courseDayCount > 0) {
        const dateString = date.toFormat('dd-MM-yyyy');

        // setting filename from start date, end date, courseName of course 
        // if this condition is met, dateString will be the end date of course
        if (courseDay + 1 === data.totalCourseDays) {
            // start date
            data.courseName = getFilename(startDate, dateString, courseName);
        }

        let dateObj;
        // if date is a public holiday
        if (phWithoutCh.includes(dateString) || winterBreak.includes(dateString)) {
            dateObj = generateHolidayObject (dateString, week, date, dateObj, courseType);
        // if date is not a holiday
        } else {
            dateObj = generateCourseDayObject (dateObj, dateString, week, weekDay, date, utc, courseType, courseDay);

            // increase course days on days that classes are held,
            // DO NOT increase course days on holidays
            courseDayCount -= 1;
            courseDay += 1;
        }
        data.days[dateString] = dateObj;

        // used to check for first day of basics course
        const firstDay = DateTime.fromFormat(startDate, "yyyy-MM-dd").toFormat('dd-MM-yyyy');
        const formattedDate = date.toFormat('dd-MM-yyyy');

        if (classDatesCount === data.totalCourseDays && courseType === 'Basics') {
            date = date.plus({ weeks: 1 }).set({weekday: 1}); 
            utc = getLocalDateTime (utc, 'T19:30', courseName, courseType, date);
            weekDay += 1;
            week += 1;

            // checking if the last day of bootcamp is a friday, if not, we need to add days to schedule
            // to make it end on a friday
        } else if (courseType === 'Bootcamp FT' && data.days[date.toFormat('dd-MM-yyyy')].courseDay === 112 && date.weekday !== 2) {
            // getting the number days to Friday
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
    
            // getting the extra dates to Friday
            const datesToAdd = [];
            for (let i = 1; i <= differenceInDays; i += 1) {
                const newDate =  date.plus({ days: i }).toFormat('dd-MM-yyyy');
                const newWeekday =  DateTime.fromFormat(newDate, 'dd-MM-yyyy').weekday;
                console.log('new ', newWeekday);
                if (newWeekday < 6) {
                    datesToAdd.push(newDate);
                }
            }
            
            // put all dates we want to add to schedule in combinedDates array
            // take into consideration possibility of public holiday occuring during those days
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
                    courseday: addedCourseday
                }
                newDateObjectsArray.push(dateInfo);
            }
            // third last courseday is feature freeze day
            // move it forward if this day falls on a public holiday
            let featureFreezeDay;
            if (phWithoutCh.includes(newDateObjectsArray[newDateObjectsArray.length - 3].date)) {
                featureFreezeDay = newDateObjectsArray[newDateObjectsArray.length - 4].date;
            } else {
                featureFreezeDay = newDateObjectsArray[newDateObjectsArray.length - 3].date;
            }

            // last day of course is project presentation day
            // move it forward if this day falls on a public holiday
            let lastDay;
            if (phWithoutCh.includes(newDateObjectsArray[newDateObjectsArray.length - 1].date)) {
                lastDay = newDateObjectsArray[newDateObjectsArray.length - 2].date;
            } else {
                lastDay = newDateObjectsArray[newDateObjectsArray.length - 1].date;

            };
            
            // needed to find totalcourse days after adding days
            let lastCourseDay;
            // generate new dateObjs 
            for (let j = 0; j < newDateObjectsArray.length; j += 1) {
                const targetWeekday = DateTime.fromFormat(newDateObjectsArray[j].date, 'dd-MM-yyyy').weekday;
                const newDate = DateTime.fromFormat(newDateObjectsArray[j].date, 'dd-MM-yyyy');
                utc = getLocalDateTime (utc, 'T13:00', courseName, courseType, newDate);
                // helper function for adding dateObj to schedule data
                const addDateObjToSchedule = (dateObj) => {
                    data.days[newDateObjectsArray[j].date] = dateObj;
                    data.days[newDateObjectsArray[j].date].courseDay = newDateObjectsArray[j].courseday;
                }
                
                if (newDateObjectsArray[j].date === featureFreezeDay) {
                    dateObj = generateCourseDayObject (dateObj, newDateObjectsArray[j].date, week, targetWeekday, newDate, utc, courseType, 113);
                    addDateObjToSchedule(dateObj);
                } else if (newDateObjectsArray[j].date === lastDay) {
                    dateObj = generateCourseDayObject (dateObj, newDateObjectsArray[j].date, week, targetWeekday, newDate, utc, courseType, 115);
                    addDateObjToSchedule(dateObj);
                    lastCourseDay = dateObj.courseDay;
                    // content is the same for all other days, except if the day is a public holiday
                } else {
                    if (phWithoutCh.includes(newDateObjectsArray[j].date)) {
                        dateObj = generateHolidayObject (newDateObjectsArray[j].date, week, newDate, dateObj, courseType);
                        addDateObjToSchedule(dateObj);
                    } else {
                        dateObj = generateCourseDayObject (dateObj, newDateObjectsArray[j].date, week, targetWeekday, newDate, utc, courseType, 114);
                        addDateObjToSchedule(dateObj);
                    }
                }


            }
            data.courseName = getFilename(startDate, lastDay, courseName);
            data.totalCourseDays = lastCourseDay;
            break;

        } else {
            // first meeting of basics is a pre-course meeting that always starts on a saturday
            // (not included in daysOfWeek)
           // this is the end of the dayArray (last day of the week)
            if (( dayIndex === dayArray.length -1) || 
                (formattedDate === firstDay && courseType === 'Basics')) {
                    weekDay = 1;
                    // return to beginning of array (return to beginning of week)
                    dayIndex = 0;
                    date = date.plus({ weeks: 1 }).set({ weekday: dayArray[dayIndex] })
                    dateWeek = dateWeek.plus({ weeks: 1 });
                    if (!companyHolidayArray.includes(dateString)) {
                        week += 1;
                    };
                    utc = getLocalDateTime (utc, basicsTimeslots[0], courseName, courseType, date);
                    
            } else {
                // day within the week
                dayIndex += 1;
                date = date.set({ weekday: dayArray[dayIndex] })
                    if (!phWithoutCh.includes(dateString)) {
                        weekDay += 1;
                    }
                utc = getLocalDateTime (utc, basicsTimeslots[1], courseName, courseType, date);
            }
        }
        // increase classDatesCount regardless of whether it is a public holiday
        classDatesCount += 1;
    }
    // TODO: needs to be removed after ftbc4 is finished
    if (courseType === 'Bootcamp FT' && courseName === '4') {
        data.days['09-07-2021'].dayNumber = 1;
    }
    console.log('data', data);
    return data;
}

export default generateDataObject;