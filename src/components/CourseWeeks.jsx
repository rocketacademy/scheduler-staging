import React, { useEffect, useRef } from "react";
import Nav from "react-bootstrap/Nav";
import { scroller } from "react-scroll";
import { DateTime } from "luxon";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

// one of the components in Sidebar
function CourseWeeks({ scheduleData, coursetype }) {
  const weeks = [];
  const executeScroll = () => myRef.current.scrollIntoView({ block: "center" });

  useEffect(() => {
    executeScroll();
  }, []);

  const CurrentWeekDiv = () => {
    return (
      <>
        <div ref={myRef}></div>
      </>
    );
  };

  // getting all the week numbers
  Object.keys(scheduleData).forEach((day) => {
    if (!weeks.includes(scheduleData[day].courseWeek)) {
      weeks.push(scheduleData[day].courseWeek);
    }
  });

  // getting first and last days of week
  const firstDayOfWeek = DateTime.now().startOf("week");
  const lastDayOfWeek = DateTime.now().endOf("week");
  let target = firstDayOfWeek;
  // array where all course dates in current week will be stored
  const weeksDates = [];

  // storing week's dates in the array
  while (target <= lastDayOfWeek) {
    weeksDates.push(target.toFormat("dd-MM-yyyy"));
    target = target.plus({ days: 1 });
  }

  // getting the week's courseWeek that the indicator will point to
  const weekNumber = [];
  const myRef = useRef(null);

  weeksDates.forEach((date) => {
    if (
      scheduleData[date] &&
      !weekNumber.includes(scheduleData[date].courseWeek)
    ) {
      weekNumber.push(scheduleData[date].courseWeek);
    }
  });

  return (
    <div className="sidebar-courseweeks">
      <h4>Course Weeks</h4>
      <Nav
        variant="pills"
        defaultActiveKey="0"
        className="flex-column"
        navbarScroll="true"
      >
        <Nav.Item>
          <Nav.Link
            eventKey="0"
            // uses react-scroll library for scroll function
            onClick={() =>
              scroller.scrollTo(`${coursetype}-top`, {
                smooth: true,
                offset: -70,
                duration: 100,
              })
            }
          >
            Top of Page
          </Nav.Link>
        </Nav.Item>
        {weeks.map((week, index) => {
          // generating id that is linked to id of an element in main content of page
          // on click, page will scroll to where the element is
          const navId = `${index + 1}`;
          let id;
          if (coursetype === "pt" && week === 1) {
            id = `${coursetype}-week-${week}-day-6`;
          } else {
            id = `${coursetype}-week-${week}-day-1`;
          }

          const sidebarId = `${coursetype}-sidebar-week-${week}`;
          return (
            <Nav.Item>
              <Nav.Link
                eventKey={navId}
                // uses react-scroll library for scroll function
                onClick={() =>
                  scroller.scrollTo(id, {
                    smooth: true,
                    offset: -70,
                    duration: 100,
                  })
                }
              >
                {week === weekNumber[0] && <CurrentWeekDiv />}
                <div>
                  Week {week}
                  {/* week indicator that indicates that a certain week is the current week  */}
                  {weeks[index] === weekNumber[0] && (
                    <span id={sidebarId} className="current-wk-indicator">
                      <KeyboardBackspaceIcon />
                      {"  "}
                      this week
                    </span>
                  )}
                </div>
              </Nav.Link>
            </Nav.Item>
          );
        })}
      </Nav>
    </div>
  );
}

export default CourseWeeks;
