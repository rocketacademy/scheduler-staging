import React from "react";
import Nav from "react-bootstrap/Nav";
import { scroller } from "react-scroll";
import { DateTime } from "luxon";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

// one of the components in Sidebar
function CourseWeeks({ scheduleData, coursetype }) {
  const weeks = [];
  // getting all the week numbers
  Object.keys(scheduleData).forEach((day) => {
    if (!weeks.includes(scheduleData[day].courseWeek)) {
      weeks.push(scheduleData[day].courseWeek);
    }
  });

  //   const weekSubArrays = [];
  //   for (let j = 0; j < weeks.length; j += 1) {
  //     const weekDateArray = [];
  //     Object.keys(scheduleData).map((date) => {
  //       if (scheduleData[date].courseWeek === weeks[j]) {
  //         weekDateArray.push(scheduleData[date]);
  //       }
  //     });
  //     weekSubArrays.push(weekDateArray);
  //   }

  //   console.log(weekSubArrays);
  const todayDate = DateTime.now();
  const firstDayOfWeek = DateTime.now().startOf("week");
  const lastDayOfWeek = DateTime.now().endOf("week");
  let target = firstDayOfWeek;
  const weeksDates = [];

  while (target <= lastDayOfWeek) {
    weeksDates.push(target.toFormat("dd-MM-yyyy"));
    target = target.plus({ days: 1 });
  }

  console.log("weeks dates", weeksDates);
  const weekNumber = [];
  weeksDates.forEach((date) => {
    if (
      scheduleData[date] &&
      !weekNumber.includes(scheduleData[date].courseWeek)
    ) {
      weekNumber.push(scheduleData[date].courseWeek);
    }
  });
  console.log("weeknumber", weekNumber);
  // const weeksInAMonth = [];
  // // putting week numbers into subarrays and pushing them into weeksInAMonth
  // while(weeks.length) {
  // const weekNumbers = weeks.splice(0,4);
  //     weeksInAMonth.push(weekNumbers);
  // }

  return (
    <div className="sidebar-courseweeks">
      <h4>Course Weeks</h4>
      <Nav
        variant="pills"
        defaultActiveKey="link-0"
        className="flex-column"
        navbarScroll="true"
      >
        <Nav.Item>
          <Nav.Link
            eventKey="link-0"
            // uses react-scroll library for scroll function
            onClick={() =>
              scroller.scrollTo(`${coursetype}-top`, {
                smooth: true,
                offset: -70,
                duration: 100,
              })
            }
          >
            Schedule Table
          </Nav.Link>
        </Nav.Item>
        {weeks.map((week, index) => {
          // generating id that is linked to id of an element in main content of page
          // on click, page will scroll to where the element is
          const navId = `link-${index + 1}`;
          const id = `${coursetype}-week-${week}-day-1`;

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
                Week {week}
                {weeks[index] === weekNumber[0] && (
                  <span className="current-wk-indicator">
                    <KeyboardBackspaceIcon />
                    {"  "}
                    this week
                  </span>
                )}
              </Nav.Link>
            </Nav.Item>
          );
        })}
      </Nav>
    </div>
  );
}

export default CourseWeeks;
