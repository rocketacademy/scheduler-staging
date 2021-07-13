import React, { useState, useEffect } from 'react';
import holidayData from '../data/sg-stat-holidays.json';
import courseData from '../data/basics-course-days.json';
import moment from 'moment';

const DataList = () => {
    const [state, setState] = useState({dates: {}});
    const [startDate, setStartDate] = useState('');
    const [classDates, setClassDates] = useState([]);
    console.log(courseData);

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
    
    publicHolidayArray.forEach((holiday) => {
        if(!companyHolidayArray.includes(holiday)) {
            console.log(!companyHolidayArray.includes(holiday));
            phWithoutCh.push(holiday);
        }
    });
    console.log('not including comapny holidays', phWithoutCh);

    useEffect(() => {
        console.log('inside use effect');
        const targetDate = new Date(startDate);
        console.log('target date', targetDate);
        targetDate.setDate(targetDate.getDate() + 43);

        const dd = ((targetDate.getDate()).toString()).padStart(2, '0');
        const mm = ((targetDate.getMonth() + 1).toString()).padStart(2, '0'); // 0 is January, so we must add 1
        const yyyy = targetDate.getFullYear();

        const endDate = yyyy + "-" + mm + "-" + dd;

        console.log('start date', startDate);
        console.log('end date', endDate);

        const start = moment(startDate);
        let end = moment(endDate);
        const noHolidays = end.format('DD-MM-YYYY');
        console.log('no holidays', noHolidays);
        const day = 2;                   
        const day2 = 6;

        let classDates = [];
        let updatedEnd = end;        


        let current = start.clone();
        let current2 = start.clone();

        classDates.push(start.format('yyyy-MM-DD'));
        while ((current.day(7 + day).isBefore(end)) && (current2.day(7 + day2).isBefore(end))) {
            const date = current.clone();
            const newDate = date.format('yyyy-MM-DD');
            const dateFormat = date.format('DD-MM-yyyy');
            console.log('new date', newDate);
            classDates.push(newDate);

            const date2 = current2.clone();
            const newDate2 = date2.format('yyyy-MM-DD');
            const dateFormat2 = date2.format('DD-MM-yyyy');
            console.log('new date', newDate2);
            classDates.push(newDate2);

            if (phWithoutCh.includes(dateFormat)) {
                updatedEnd = end.add(3, 'days');
                console.log('updated end', end);
            }

            if (phWithoutCh.includes(dateFormat2)) {
                updatedEnd = end.add(4, 'days');
                console.log('updated end', end);
            }

            if (winterBreak.includes(dateFormat2) && winterBreak.includes(dateFormat)) {
                updatedEnd = end.add(7, 'days');
                console.log('updated end', end);
            } else if (winterBreak.includes(dateFormat)) {
                updatedEnd = end.add(3, 'days');
                console.log('updated end', end);
            }

        };

        const inclHolidays = updatedEnd.format('yyyy-MM-DD');
        const newEnd = moment(inclHolidays);
        console.log('new end', newEnd);
        console.log('included holidays', inclHolidays);

        if (noHolidays !== inclHolidays) {
            classDates = [];
            let current3 = start.clone();
            let current4 = start.clone();
            classDates.push(start.format('yyyy-MM-DD'));
                while ((current3.day(7 + day).isBefore(newEnd))) {
                    console.log('new end', newEnd);
                    const date = current3.clone();
                    const newDate = date.format('yyyy-MM-DD');
                    console.log('new date', newDate);
                    classDates.push(newDate);
                }

                while (current4.day(7 + day2).isBefore(newEnd)) {
                    const date2 = current4.clone();
                    const newDate2 = date2.format('yyyy-MM-DD');
                    console.log('new date', newDate2);
                    classDates.push(newDate2);
                }
            }
       

        const sortedClassDates = classDates.sort();
        console.log('sorted class dates', sortedClassDates);
        const formattedClassDates = [];
        sortedClassDates.forEach((date) => {
            const dateArray = date.split('-');
            dateArray.reverse();
            const joined = dateArray.join('-');
            formattedClassDates.push(joined);
        })
        console.log('formatted class dates', formattedClassDates);
        setClassDates(formattedClassDates);
    }, [startDate]);

    return (
        <>
        <div>
            <input type="date" value={startDate} onChange={(e) => {setStartDate(e.target.value)}}/>
        </div>
        <div>
            {classDates.map((date) => {
                return (
                    <div>
                        {date}
                    </div>
                )
            })}
        </div>
        </>
    )
};

export default DataList;
