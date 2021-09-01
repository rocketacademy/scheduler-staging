import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import { DateTime } from "luxon";
import TableClass from "./TableClass";
import TableProjects from "./TableProjects";
import { scroller } from "react-scroll";
import GenerateCourseDayContent from "./GenerateCourseDayContent";
import GenerateDatetypeSections from "./GenerateDatetypeSections";
import GenerateCourseDayHeader from "./GenerateCourseDayHeader";

// helper function that finds previous course day
const findPreviousDay = (scheduleData, today, coursetype) => {
  let dayBefore;
  if (coursetype === "ft") {
    if (today.weekday === 1) {
      dayBefore = today.plus({ days: -3 }).toFormat("dd-MM-yyyy");
    } else {
      dayBefore = today.plus({ days: -1 }).toFormat("dd-MM-yyyy");
    }
  } else if (coursetype === "pt") {
    if (today.weekday === 1) {
      dayBefore = today
        .plus({ weeks: -1 })
        .set({ weekday: 6 })
        .toFormat("dd-MM-yyyy");
    } else if (today.weekday > 1 && today.weekday <= 6) {
      dayBefore = today.set({ weekday: 1 }).toFormat("dd-MM-yyyy");
    } else {
      dayBefore = today.set({ weekday: 6 }).toFormat("dd-MM-yyyy");
    }
  }

  if (scheduleData[dayBefore].dateTypes.holidayType) {
    dayBefore = findPreviousDay(dayBefore);
  }

  return dayBefore;
};

//helper funcyion that finds next course day
const findNextDay = (scheduleData, today, coursetype) => {
  let nextDay;
  if (coursetype === "ft") {
    if (today.weekday === 6) {
      nextDay = today.plus({ days: 3 }).toFormat("dd-MM-yyyy");
    } else {
      nextDay = today.toFormat("dd-MM-yyyy");
    }
  } else if (coursetype === "pt") {
    if (today.weekday <= 6) {
      nextDay = today.set({ weekday: 6 }).toFormat("dd-MM-yyyy");
    } else {
      nextDay = today.plus({ days: 2 }).toFormat("dd-MM-yyyy");
    }
  }

  if (scheduleData[nextDay].dateTypes.holidayType) {
    nextDay = findNextDay(nextDay);
  }

  return nextDay;
};
// ##############################################################################

function CurrentContentTable({ scheduleData, coursetype }) {
  const today = DateTime.now();
  let firstDay;
  let moveDate;
  let lastDay;
  let previousDay;
  let nextDay;

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

  // getting the current date and formatting it such that it follows the format used in the data files
  const todayFormatted = today.toFormat("dd-MM-yyyy");

  // finds previous course day
  previousDay = findPreviousDay(scheduleData, today, coursetype);

  // find the next day if current day is not a course day
  nextDay = findNextDay(scheduleData, today, coursetype);

  // getting the data objects that correspond to the dates in weekDatesArray and storing them in an array
  const currentWeekData = [];
  for (let i = 0; i < weekDatesArray.length; i += 1) {
    Object.keys(scheduleData).map((day) => {
      if (day === weekDatesArray[i]) {
        currentWeekData.push(scheduleData[day]);
      }
    });
  }

  let todayId;
  // if today's date matches a date in the schedule file, an id is generated for the scrollTo function
  if (scheduleData[todayFormatted]) {
    todayId = `${coursetype}-week-${scheduleData[todayFormatted].courseWeek}-day-${scheduleData[todayFormatted].dayNumber}`;
  }

  // indicates whether or not the up arrow is shown on the courseday header
  const todaySectionHeader = true;

  return (
    <div className="schedule-table">
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
        {nextDay && previousDay && (
          <>
            <div>
              <GenerateCourseDayHeader
                todaySectionHeader={todaySectionHeader}
                day={scheduleData[nextDay]}
                coursetype={coursetype}
              />
            </div>
            <div className="top-content-container">
              <div className="top-content-section">
                <>
                  <h5 className="top-content-day">Current Course Day:</h5>
                  <br></br>
                  <GenerateCourseDayContent day={scheduleData[nextDay]} />
                </>
              </div>
              <div className="top-content-section">
                <>
                  <h5 className="top-content-day">Previous Course Day:</h5>
                  <br></br>
                  <GenerateDatetypeSections
                    datetype={scheduleData[previousDay].dateTypes}
                    classType="postClass"
                    day={scheduleData[previousDay]}
                  />
                </>
              </div>
            </div>
          </>
        )}
      </div>

      <br></br>
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
