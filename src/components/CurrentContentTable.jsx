import React, { useRef, useEffect } from "react";
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
    dayBefore = findPreviousDay(scheduleData, dayBefore, coursetype);
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
    nextDay = findNextDay(scheduleData, nextDay, coursetype);
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
  let firstDayMonth;
  let lastDayMonth;
  let moveDateMonth;

  // shows current month for part time bootcamp
  firstDayMonth = DateTime.now().startOf("month");
  lastDayMonth = DateTime.now().endOf("month");

  // shows current week for full time bootcamp
  firstDay = DateTime.now().startOf("week");
  lastDay = DateTime.now().endOf("week");

  moveDate = firstDay;
  const weekDatesArray = [];
  // getting all the dates between first day and last day of week inclusive and storing them in an array
  while (moveDate <= lastDay) {
    weekDatesArray.push(moveDate.toFormat("dd-MM-yyyy"));
    moveDate = moveDate.plus({ days: 1 });
  }

  moveDateMonth = firstDayMonth;

  const monthDatesArray = [];
  if (coursetype === "pt") {
    // getting all the dates between first day and last day of week inclusive and storing them in an array
    while (moveDateMonth <= lastDayMonth) {
      monthDatesArray.push(moveDateMonth.toFormat("dd-MM-yyyy"));
      moveDateMonth = moveDateMonth.plus({ days: 1 });
    }
  }
  console.log(monthDatesArray);

  // finds previous course day
  previousDay = findPreviousDay(scheduleData, today, coursetype);

  // find the next day if current day is not a course day
  nextDay = findNextDay(scheduleData, today, coursetype);

  // getting the data objects that correspond to the dates in weekDatesArray and storing them in an array
  const currentWeekData = [];
  const currentMonthData = [];

  for (let i = 0; i < weekDatesArray.length; i += 1) {
    Object.keys(scheduleData).map((day) => {
      if (day === weekDatesArray[i]) {
        currentWeekData.push(scheduleData[day]);
      }
    });
  }

  if (coursetype === "pt") {
    for (let i = 0; i < monthDatesArray.length; i += 1) {
      Object.keys(scheduleData).map((day) => {
        if (day === monthDatesArray[i]) {
          currentMonthData.push(scheduleData[day]);
        }
      });
    }
  }

  console.log(currentMonthData);
  let tableData;

  if (coursetype === "pt") {
    tableData = currentMonthData;
  } else {
    tableData = currentWeekData;
  }
  console.log("table data", tableData);
  // getting the week's courseWeek that the indicator will point to
  const weekNumbers = [];
  weekDatesArray.forEach((date) => {
    if (
      scheduleData[date] &&
      !weekNumbers.includes(scheduleData[date].courseWeek)
    ) {
      weekNumbers.push(scheduleData[date].courseWeek);
    }
  });

  // indicates whether or not courseweek and course day is shown on the courseday header
  const todaySectionHeader = true;

  // creating ids for scrollTo function for top section
  const currentDayId = `${coursetype}-week-${scheduleData[nextDay].courseWeek}-day-${scheduleData[nextDay].dayNumber}`;
  const previousDayId = `${coursetype}-week-${scheduleData[previousDay].courseWeek}-day-${scheduleData[previousDay].dayNumber}`;

  return (
    <div className="schedule-table">
      <div className="today-date">
        {nextDay && previousDay && (
          <>
            <div>
              <GenerateCourseDayHeader
                todaySectionHeader={todaySectionHeader}
                day={scheduleData[nextDay]}
                coursetype={coursetype}
              />
            </div>
            <div className="main-header-course-day">
              <h5>
                Current Course Day:{" "}
                {scheduleData[today.toFormat("dd-MM-yyyy")] ? (
                  <span>
                    {scheduleData[today.toFormat("dd-MM-yyyy")].courseDay}
                  </span>
                ) : (
                  <span> {scheduleData[nextDay].courseDay}</span>
                )}
              </h5>
            </div>
            <div className="top-content-container">
              <div className="top-content-section">
                <>
                  <h5
                    className="top-content-day"
                    onClick={() =>
                      scroller.scrollTo(currentDayId, {
                        smooth: true,
                        offset: -70,
                        duration: 100,
                      })
                    }
                  >
                    Current Course Day:
                  </h5>
                  <br></br>
                  <GenerateCourseDayContent day={scheduleData[nextDay]} />
                </>
              </div>
              <div className="top-content-section">
                <>
                  <h5
                    className="top-content-day"
                    onClick={() =>
                      scroller.scrollTo(previousDayId, {
                        smooth: true,
                        offset: -70,
                        duration: 100,
                      })
                    }
                  >
                    Previous Course Day:
                  </h5>
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
      <h5>
        Course Week:{" "}
        {weekNumbers.map((num) => {
          return <span>{num}</span>;
        })}{" "}
      </h5>
      <Table bordered hover size="sm">
        <thead>
          <tr>
            <th></th>
            <th>Projects</th>
            <th>Pre Class</th>
            <th>In Class</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((date, index) => {
            // getting the formatted date that will be shown in the table
            const formattedDate = DateTime.fromFormat(
              date.courseDate,
              "dd-MM-yyyy"
            ).toFormat("EEE d MMM");
            // getting the id that links formattedDate to element in main content page
            const id = `${coursetype}-week-${date.courseWeek}-day-${date.dayNumber}`;

            return (
              <tr
                className={
                  date.courseDate === today.toFormat("dd-MM-yyyy")
                    ? "table-secondary"
                    : null
                }
              >
                <td
                  // library react-scroll used to scroll to an element with matching id on main page
                  className="table-date"
                >
                  <h6
                    onClick={() =>
                      scroller.scrollTo(id, {
                        smooth: true,
                        offset: -70,
                        duration: 100,
                      })
                    }
                  >
                    {formattedDate}
                  </h6>
                  <p>
                    Week {date.courseWeek}
                    <br></br>Course Day {date.courseDay}
                  </p>
                </td>
                {/* getting data for projects section of table */}
                <td>
                  <TableProjects day={tableData[index]} />
                </td>
                {/* getting data for preclass and inclass section of table */}
                <TableClass day={tableData[index]} sectionClass="preClass" />
                <TableClass day={tableData[index]} sectionClass="inClass" />
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default CurrentContentTable;
