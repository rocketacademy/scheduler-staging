import moment from 'moment';
import React , { useState } from 'react';
import { DateTime } from 'luxon';
import fs from 'fs';
import holidayData from '../data/sg-stat-holidays.json';
import courseData from '../data/basics-course-days.json';

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

console.log('winter break', winterBreak);
console.log('public holiday dates', publicHolidayArray);
console.log('company holiday dates', companyHolidayArray);

const phWithoutCh = [];

// get array of public holidays not including those included in winter break
publicHolidayArray.forEach((holiday) => {
    if(!companyHolidayArray.includes(holiday)) {
        console.log(!companyHolidayArray.includes(holiday));
        phWithoutCh.push(holiday);
    }
});
console.log('not including comapny holidays', phWithoutCh);

console.log('course data', courseData);

const CourseDataList = () => {
    const [startDate, setStartDate] = useState('');
    const date = moment(startDate);
    // const utc = moment(startDate + 'T19:00', "YYYY-MM-DDTHH:mm").utc().toISOString();
    const dateWeek = moment(startDate);
    let data = {days: []};
    let courseDayCount = 0;
    let classDatesCount = 0;
    let week = 1;
    let weekDay = 1;

    while (courseDayCount < 12) {
        let dateString = date.format('DD-MM-YYYY');

        // if date is a public holiday
        if (phWithoutCh.includes(dateString)) {
            const dateObj = {
                courseDay: null,
                courseDate: dateString,
                dateTypes: {}
            }

            dateObj.dateTypes = 'public holiday';
            data.days[dateString] = dateObj;
        // if date is not a holiday
        } else {
            // get whatever index of courseData that is specified by courseDayCount
            const dateObj = courseData.days[courseDayCount];
            dateObj.courseDate = dateString;
            dateObj.courseWeek = week;
            dateObj.weekDay = weekDay;
            // dateObj.meetingDateTimeUTC = utc;
            data.days[dateString] = dateObj;
            // increase course day count on days that classes are held,
            // DO NOT increase class day count on holidays
            courseDayCount += 1;
            console.log('course day count', courseDayCount);
        }

        // if there was a public holdays during the course
        // brings us to monday
        if (classDatesCount > 12) {
            date.add(2,'day'); 
            weekDay += 1;
        } else {
            // if days is Tuesday, add 4 days so that the next day will be Saturday
            // if day is Saturday, add 3 days so that the next day is Tuesday
            if (date.day() === 2) {
                date.add(4, 'day'); 
                weekDay += 1;
            } else if (date.day() === 6) {
                date.add(3, 'day');
                dateWeek.add(1, 'week');
                week += 1;
                weekDay = 1;
            // only happens if course goes past the normal 6 week duration
            } else if (date.day() === 1) {
                date.add(2,'day'); 
                weekDay += 1;
            }       

        }

       

        // increase classDatesCount regardless of whether it is a public holiday
        classDatesCount += 1;
    }
    console.log('start date', startDate);
    console.log('data', data);

    return (
        <div>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </div>
    )
}

export default CourseDataList;
