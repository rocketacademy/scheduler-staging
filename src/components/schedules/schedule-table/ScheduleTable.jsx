import React from "react";
import { scroller } from "react-scroll";
import Table from "react-bootstrap/Table";
import { DateTime } from "luxon";
import Accordion from "react-bootstrap/Accordion";
import TableClass from "./TableClass";
import TableProjects from "./TableProjects";

function ScheduleTable({ weekNumbers, tableData, coursetype, today }) {
  return (
    <>
      <Accordion.Header>
        <h5>
          {/* header shows different info depending on date and coursetype  */}
          {coursetype === "ft" &&
            today.toFormat("yyyy-MM-dd") ===
              DateTime.now().toFormat("yyyy-MM-dd") && (
              <>
                Current Course Week:{" "}
                {weekNumbers.map((num) => (
                  <span>{num}</span>
                ))}
              </>
            )}
          {coursetype === "ft" &&
            today.toFormat("yyyy-MM-dd") !==
              DateTime.now().toFormat("yyyy-MM-dd") && (
              <>
                Next Course Week:{" "}
                {weekNumbers.map((num) => (
                  <span>{num}</span>
                ))}
              </>
            )}
          {coursetype === "pt" && <>Current Month's Schedule</>}
        </h5>
      </Accordion.Header>
      <Accordion.Body>
        <Table bordered hover size="sm">
          <thead>
            <tr>
              <th />
              <th>Projects</th>
              <th>Pre Class</th>
              <th>In Class</th>
              <th>Post Class</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((date, index) => {
              // getting the formatted date that will be shown in the table
              const formattedDate = DateTime.fromFormat(
                date.courseDate,
                "yyyy-MM-dd"
              ).toFormat("EEE d MMM");
              // getting the id that links formattedDate to element in main content page
              const id = `${coursetype}-week-${date.courseWeek}-day-${date.dayNumber}`;

              return (
                <tr
                  className={
                    today.toFormat("yyyy-MM-dd") ===
                      DateTime.now().toFormat("yyyy-MM-dd") &&
                    date.courseDate === today.toFormat("yyyy-MM-dd")
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
                      <br />
                      Course Day {date.courseDay}
                    </p>
                  </td>
                  {/* getting data for projects section of table */}
                  <td>
                    <TableProjects day={tableData[index]} />
                  </td>
                  {/* getting data for preclass and inclass section of table */}
                  <TableClass day={tableData[index]} sectionClass="preClass" />
                  <TableClass day={tableData[index]} sectionClass="inClass" />
                  <TableClass day={tableData[index]} sectionClass="postClass" />
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Accordion.Body>
    </>
  );
}

export default ScheduleTable;
