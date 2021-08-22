import React from 'react';
import Table from 'react-bootstrap/Table';
import { DateTime } from 'luxon';
import TableClass from './TableClass';
import TableProjects from './TableProjects';
import { scroller } from 'react-scroll';

function CurrentContentTable({ scheduleData, courseType }) {
    let firstDay;
    let moveDate;
    let lastDay;

    if (courseType === "Bootcamp PT") {
        firstDay = DateTime.now().startOf('month');
        lastDay = DateTime.now().endOf('month');
    } else {
        firstDay = DateTime.now().startOf('week');
        lastDay = DateTime.now().endOf('week');
    }
   
    moveDate = firstDay;

    const weekDatesArray = [];
    while (moveDate <= lastDay) {
        weekDatesArray.push(moveDate.toFormat('dd-MM-yyyy'));
        moveDate = moveDate.plus({ days: 1 });
    };

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
            {courseType === 'Bootcamp PT' && (
            <h3 className="table-heading">Current Month  ({firstDay.toFormat('dd/MM/yyyy')} - {lastDay.toFormat('dd/MM/yyyy')})</h3>
            )}
            {courseType === 'Bootcamp FT' && (
            <h3 className="table-heading">Current Week</h3>
            )}
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
                        const formattedDate = DateTime.fromFormat(date.courseDate, 'dd-MM-yyyy').toFormat('EEE d MMM');
                        const id = `week-${date.courseWeek}-day-${date.dayNumber}`;
    
                        return (
                            <tr>
                                <td 
                                onClick={() => scroller.scrollTo( id, {
                                    smooth: true,
                                    offset: -70,
                                    duration: 100,
                                })} className="table-date"
                                >
                                    <h6>{formattedDate}</h6>
                                    <p>Week {date.courseWeek}, Course Day {date.courseDay}</p>
                                </td>
                                <td><TableProjects day={currentWeekData[index]} /></td>
                                <TableClass day={currentWeekData[index]} 
                                            sectionClass="preClass"  
                                            />
                                <TableClass day={currentWeekData[index]} 
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
