import React , { useState } from 'react';
import { DateTime } from 'luxon';
import holidayData from '../data/sg-stat-holidays.json';
import basicsData from '../data/basics-course-days.json';
import bootcampData from '../data/bootcamp-course-days.json';

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
        console.log(!companyHolidayArray.includes(holiday));
        phWithoutCh.push(holiday);
    }
});



const DatePicker = ({setJsonContent}) => {
    const [startDate, setStartDate] = useState('');
    const [courseName, setCourseName] = useState('');
    const [courseType, setCourseType] = useState('');
    let date = DateTime.fromFormat(startDate, "yyyy-MM-dd");
    const d = DateTime.fromISO(startDate + 'T13:00', {zone: 'Singapore'});
    let utc = d.toUTC().toISO();
    console.log(d.toUTC().toISO());
    let dateWeek = DateTime.fromFormat(startDate, "yyyy-MM-dd");
    let classDatesCount = 0;
    let week = 1;
    let weekDay = 1;
    let data;
    let courseDayCount;
    let courseDay = 0;

    // based on user input for course type, the following top level info is set
    const handleSubmit = () => {
        let topLevelObject = {
            courseType: courseType,
            courseName: `${date.toFormat('dd-MM-yyyy')}batch${courseName}`,
            days: {}
        };

        if (courseType === 'Basics') {
            topLevelObject = {
                daysOfWeek: [2, 6],
                courseStartIndex: 1,
                totalCourseDays: 13,
                ...topLevelObject
            };

            courseDayCount = 13;

        } else if (courseType === 'Bootcamp') {
            topLevelObject = {
                daysOfWeek: [1, 2, 3, 4, 5],
                courseStartIndex: 0,
                totalCourseDays: 49,
                ...topLevelObject
            }

            courseDayCount = 49;
        }

        data = topLevelObject;
        console.log(data);
        console.log(data.daysOfWeek);
        const dayArray = data.daysOfWeek;
        let dayIndex = data.courseStartIndex;
    
        while (courseDayCount > 0) {
            // let dateString = date.format('DD-MM-YYYY');
            const dateString = date.toFormat('dd-MM-yyyy');
            console.log('date', date);
            console.log('date string', dateString);

            // if date is a public holiday
            if (phWithoutCh.includes(dateString) || winterBreak.includes(dateString)) {
                const dateObj = {
                    courseDay: null,
                    courseDate: dateString,
                    courseWeek: week,
                    dateTypes: {}
                }

                if (phWithoutCh.includes(dateString)) {
                    // TODO: add entire holiday object into here
                    dateObj.dateTypes = publicHolidays[dateString];
                } else {
                    dateObj.dateTypes = companyHolidays[dateString];
                }

                data.days[dateString] = dateObj;
            // if date is not a holiday
            } else {
                // get whatever index of basicsData that is specified by courseDayCount
                // 
                let dateObj = {
                    courseDate: dateString,
                    courseWeek: week,
                    weekDay: weekDay,
                    meetingDateTimeUTC: utc,
                    };
            
                if (courseType === 'Basics') {
                    dateObj = {
                        ...dateObj, ...basicsData.days[courseDay]
                    }
                } else if (courseType === 'Bootcamp') {
                     dateObj = {
                        ...dateObj, ...bootcampData.days[courseDay]
                    }
                }

                data.days[dateString] = dateObj;
                // increase course days on days that classes are held,
                // DO NOT increase course days on holidays
                courseDayCount -= 1;
                courseDay += 1;
            }
           
            if (classDatesCount > data.totalCourseDays && courseType === 'Basics') {
                date = date.plus({ days: 2 }); 
                utc = null;
                weekDay += 1;

            } else {
                // formatted is for getting utc date/time
                const formatted = date.toFormat("yyyy-MM-dd");
                if (courseType === 'Bootcamp' && Number(courseName) % 2 === 0) {
                    utc = DateTime.fromISO(formatted + 'T13:00', {zone: 'Singapore'}).toUTC().toISO();
                } else if (courseType === 'Bootcamp' && Number(courseName) % 2 !== 0) {
                    utc = DateTime.fromISO(formatted + 'T10:00', {zone: 'Singapore'}).toUTC().toISO();
                }

                // this is the end of the array
                if ( dayIndex === dayArray.length -1) {
                    if (courseType === 'Basics') {
                        utc = DateTime.fromISO(formatted + 'T19:00', {zone: 'Singapore'}).toUTC().toISO();
                    }
                    weekDay = 1;
                    week += 1;
                    dateWeek = dateWeek.plus({ weeks: 1 });
                    // at the end of the array, return to beginning of array
                    dayIndex = 0;
                    date = date.plus({ weeks: 1 }).set({ weekday: dayArray[dayIndex] })
                } else {
                    if (courseType === 'Basics') {
                        utc = DateTime.fromISO(formatted + 'T13:00', {zone: 'Singapore'}).toUTC().toISO();
                    }
                    dayIndex += 1;
                    date = date.set({ weekday: dayArray[dayIndex] })
                   
                    if (!phWithoutCh.includes(dateString)) {
                        weekDay += 1;
                    }
                }
            }
            // increase classDatesCount regardless of whether it is a public holiday
            classDatesCount += 1;
        }
        console.log('start date', startDate);
        console.log('data', data);

        const jsonContentStr = JSON.stringify(data);
        setJsonContent(jsonContentStr);
    }

    return (
        <>
        <div>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </div>
        <div>
            <input type="number" value={courseName} onChange={(e) => setCourseName(e.target.value)} />
        </div>
        <div>
            <select name="courseType" onChange={(e) => setCourseType(e.target.value)}>
                <option>select course type</option>
                <option value="Bootcamp">Bootcamp</option>
                <option value="Basics">Basics</option>
            </select>
        </div>
        <div>
            <button onClick={handleSubmit}>Submit</button>
        </div>
        </>
    )
}

export default DatePicker;
