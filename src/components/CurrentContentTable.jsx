import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import { DateTime } from "luxon";
import TableClass from "./TableClass";
import TableProjects from "./TableProjects";
import { scroller } from "react-scroll";

function CurrentContentTable({ scheduleData, coursetype }) {
  const [noClass, setNoClass] = useState(false);

  const today = DateTime.now();
  const todayWords = today.toFormat("EEE d MMM");
  let firstDay;
  let moveDate;
  let lastDay;

  // getting first and last days shown in table , depending on type of bootcamp
  if (coursetype === "pt") {
    // shows current month for part time bootcamp
    firstDay = DateTime.now().startOf("month");
    lastDay = DateTime.now().endOf("month");
  } else {
    // shows current week for full time bootcamp
    firstDay = DateTime.now().startOf("week");
    lastDay = DateTime.now().endOf("week");
  }

  moveDate = firstDay;

  const weekDatesArray = [];
  // getting all the dates between first day and last day inclusive and storing them in an array
  while (moveDate <= lastDay) {
    weekDatesArray.push(moveDate.toFormat("dd-MM-yyyy"));
    moveDate = moveDate.plus({ days: 1 });
  }

  // getting the data objects that correspond to the dates in weekDatesArray and storing them in an array
  const currentWeekData = [];
  for (let i = 0; i < weekDatesArray.length; i += 1) {
    Object.keys(scheduleData).map((day) => {
      if (day === weekDatesArray[i]) {
        currentWeekData.push(scheduleData[day]);
      }
    });
  }

  // getting the current date and formatting it such that it follows the format used in the data files
  const todayFormatted = today.toFormat("dd-MM-yyyy");

  let todayId;
  // if today's date matches a date in the schedule file, an id is generated for the scrollTo function
  if (scheduleData[todayFormatted]) {
    todayId = `${coursetype}-week-${scheduleData[todayFormatted].courseWeek}-day-${scheduleData[todayFormatted].dayNumber}`;
  }

  return (
    <div className="schedule-table">
      <h4 className="table-heading">
        {/* if today's date matches a date in the schedule, a scrollTo function is added to it which takes the user to today's content on clicking the link */}
        {scheduleData[todayFormatted] ? (
          <div
            className="today-date"
            onClick={() =>
              scroller.scrollTo(todayId, {
                smooth: true,
                offset: -70,
                duration: 100,
              })
            }
          >
            Today : {todayWords}
          </div>
        ) : (
          // if not, 'no class' is rendered on click
          <div className="today-date" onClick={() => setNoClass(true)}>
            Today: {todayWords}
            {noClass && <span className="no-class-date">no class</span>}
          </div>
        )}

        <br></br>
      </h4>
      {/* table which displays current week's/ month's content based on course type  */}
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
            const formattedDate = DateTime.fromFormat(
              date.courseDate,
              "dd-MM-yyyy"
            ).toFormat("EEE d MMM");
            // getting the id that links formattedDate to element in main content page
            const id = `${coursetype}-week-${date.courseWeek}-day-${date.dayNumber}`;

            return (
              <tr>
                <td
                  // library react-scroll used to scroll to an element with matching id on main page
                  onClick={() =>
                    scroller.scrollTo(id, {
                      smooth: true,
                      offset: -70,
                      duration: 100,
                    })
                  }
                  className="table-date"
                >
                  <h6>{formattedDate}</h6>
                  <p>
                    Week {date.courseWeek}
                    <br></br>Course Day {date.courseDay}
                  </p>
                </td>
                {/* getting data for projects section of table */}
                <td>
                  <TableProjects day={currentWeekData[index]} />
                </td>
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
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default CurrentContentTable;
