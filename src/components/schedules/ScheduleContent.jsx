import React from "react";
import GenerateCourseDayHeader from "./GenerateCourseDayHeader";
import GenerateCourseDayContent from "./GenerateCourseDayContent";
import ContentTable from "./schedule-table/ContentTable";
import { scroller } from "react-scroll";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import CurrentDaySection from "./current-day/CurrentDaySection";
import Accordion from "react-bootstrap/Accordion";

// Generate schedule content for a particular course
function ScheduleContent({
  scheduleData,
  coursetype,
  title,
  today,
  firstDayOfCourse,
}) {
  // Used by scrollTo function to identify where to scroll to from the up arrow at the bottom of the screen
  const id = `${coursetype}-top`;
  const todaySectionHeader = false;

  let nextToday;
  if (coursetype === "ft") {
    nextToday = today.plus({ weeks: 1 });
  } else {
    nextToday = today.plus({ months: 1 });
  }

  console.log("scheduleData", scheduleData);

  return (
    <div className="content">
      {/* button that takes user back to the top of the page  */}
      <div
        className="up-arrow"
        onClick={() =>
          scroller.scrollTo(id, {
            smooth: true,
            offset: -70,
            duration: 100,
          })
        }
      >
        <ExpandLessIcon />
      </div>
      <h1 className="schedule-header">{title}</h1>
      <p id={id}></p>

      {/* generates table which shows schedule for current week/ month depending on course type */}
      <CurrentDaySection
        scheduleData={scheduleData}
        coursetype={coursetype}
        today={today}
        firstDayOfCourse={firstDayOfCourse}
      />
      <div className="schedule-accordion-container">
        <Accordion className="current-week-accordion" defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <ContentTable
              scheduleData={scheduleData}
              coursetype={coursetype}
              startDay={today}
            />
          </Accordion.Item>
        </Accordion>
        <Accordion className="current-week-accordion">
          {coursetype === "ft" && (
            <Accordion.Item eventKey="0">
              <ContentTable
                scheduleData={scheduleData}
                coursetype={coursetype}
                startDay={nextToday}
              />
            </Accordion.Item>
          )}
        </Accordion>
      </div>
      <div className="schedule-list">
        <h1>Full Schedule</h1>
        {/* generates individual day schedule content */}
        {Object.keys(scheduleData).map((day) => {
          const id = `${coursetype}-week-${scheduleData[day].courseWeek}-day-${scheduleData[day].dayNumber}`;

          return (
            <div className="day-class" id={id}>
              {/* generates schedule header for individual day */}
              <GenerateCourseDayHeader
                todaySectionHeader={todaySectionHeader}
                day={scheduleData[day]}
                coursetype={coursetype}
              />
              {/* generates content if course day is not a holiday */}
              {!scheduleData[day].dateTypes.holidayType && (
                <GenerateCourseDayContent day={scheduleData[day]} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ScheduleContent;
