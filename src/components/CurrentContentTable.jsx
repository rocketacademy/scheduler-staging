import React from 'react';
import Table from 'react-bootstrap/Table';
import { DateTime } from 'luxon';
import TableClass from './TableClass';
import TableProjects from './TableProjects';
import { scroller } from 'react-scroll';

function CurrentContentTable({ 
                            scheduleData,   
                            coursetype
                            }) {

    let firstDay;
    let moveDate;
    let lastDay;
    let heading;

    // getting first and last days shown in table , depending on type of bootcamp
    if (coursetype === "pt") {
        // shows current month for part time bootcamp
        firstDay = DateTime.now().startOf('month');
        lastDay = DateTime.now().endOf('month');
        heading = `Current Month (${firstDay.toFormat('dd/MM/yyyy')} - ${lastDay.toFormat('dd/MM/yyyy')}`;
    } else {
        // shows current week for full time bootcamp
        firstDay = DateTime.now().startOf('week');
        lastDay = DateTime.now().endOf('week');
        heading = `Current Week (${firstDay.toFormat('dd/MM/yyyy')} - ${lastDay.toFormat('dd/MM/yyyy')})`;
    }
   
    moveDate = firstDay;

    const weekDatesArray = [];
    // getting all the dates between first day and last day inclusive and storing them in an array
    while (moveDate <= lastDay) {
        weekDatesArray.push(moveDate.toFormat('dd-MM-yyyy'));
        moveDate = moveDate.plus({ days: 1 });
    };

    // getting the data objects that correspond to the dates in weekDatesArray and storing them in an array
    const currentWeekData = [];
    for (let i = 0; i < weekDatesArray.length; i += 1) {
        Object.keys(scheduleData).map((day) => {
            if (day === weekDatesArray[i]) {
                currentWeekData.push(scheduleData[day]);
            }
        })
    }

    return (
        <div className="schedule-table">
            <h3 className="table-heading">{heading}</h3>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                    <th></th>
                    <th>Projects</th>
                    <th>Pre Class</th>
                    <th>In Class</th>
                    </tr>
                </thead>
                <tbody>
                    {currentWeekData.map((date, index) => {
                        // getting the formatted date that will be shown in the table
                        const formattedDate = DateTime.fromFormat(date.courseDate, 'dd-MM-yyyy').toFormat('EEE d MMM');
                        // getting the id that links formattedDate to element in main content page
                        const id = `${coursetype}-week-${date.courseWeek}-day-${date.dayNumber}`;

                        return (
                            <tr>
                                <td 
                                // library react-scroll used to scroll to an element with matching id on main page
                                onClick={() => scroller.scrollTo( id, {
                                    smooth: true,
                                    offset: -70,
                                    duration: 100,
                                })} className="table-date"
                                >
                                    <h6>{formattedDate}</h6>
                                    <p>Week {date.courseWeek}<br></br>Course Day {date.courseDay}</p>
                                </td>
                                {/* getting data for projects section of table */}
                                <td><TableProjects day={currentWeekData[index]} /></td>
                                {/* getting data for preclass and inclass section of table */}
                                <TableClass
                                        day={currentWeekData[index]} 
                                        sectionClass="preClass"  
                                        />
                                <TableClass 
                                        day={currentWeekData[index]} 
                                        sectionClass="inClass"  
                                        />
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    )
}

export default CurrentContentTable
