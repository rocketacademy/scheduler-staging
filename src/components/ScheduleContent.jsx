import React from "react";
import GenerateCourseDayHeader from "./GenerateCourseDayHeader";
import GenerateCourseDayContent from "./GenerateCourseDayContent";
import CurrentContentTable from "./CurrentContentTable";
import { scroller } from "react-scroll";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";

// generates schedule content for a particular course
function ScheduleContent({ scheduleData, coursetype, title }) {
  // used by scrollTo function to identify where to scroll to from the up arrow at the bottom of the screen
  const id = `${coursetype}-top`;
  const todaySectionHeader = false;

  return (
    <div className="content">
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
      <CurrentContentTable
        scheduleData={scheduleData}
        coursetype={coursetype}
      />
      <div className="schedule-list">
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
