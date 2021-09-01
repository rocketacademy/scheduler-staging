import React from "react";
import { DateTime } from "luxon";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import { scroller } from "react-scroll";

// helper function that generates course day header for a normal course day
const NormalCourseDay = ({ todaySectionHeader, day, timeZoneSet, id }) => {
  localDate = DateTime.fromISO(day.meetingDateTimeUTC, { zone: timeZoneSet });
  formattedDate = localDate.toFormat("EEE d MMM");
  meetingTime = localDate.toFormat("t");
  timeOffset = localDate.toFormat("ZZZZ");
  timeZone = localDate.toFormat("z");

  return (
    <>
      {timeZone === timeZoneSet && (
        <>
          <div className="main-header">
            <h3 className="day-header">
              {formattedDate}, Week {day.courseWeek}, Course Day {day.courseDay}
            </h3>
            {/* scrolls back up to the top of the page  */}
            {!todaySectionHeader && (
              <div
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
            )}
          </div>
          <p>
            Meeting Time: {meetingTime} SGT ({timeOffset})
          </p>
          <p>{day.dateTypes.module}</p>
        </>
      )}
    </>
  );
};

// helper function that generates courseday header for a holiday
const HolidayCourseDay = ({ todaySectionHeader, day, timeZoneSet, id }) => {
  localDate = DateTime.fromFormat(day.courseDate, "dd-MM-yyyy");
  formattedDate = localDate.toFormat("EEE d MMM");
  timeZone = localDate.toFormat("z");
  // depending on if the holiday is a public/company holiday,
  // a different output will be rendered
  if (day.dateTypes.holidayType === "public holiday") {
    holiday = `Public Holiday (${day.dateTypes.name})`;
  } else {
    holiday = `Company Holiday (${day.dateTypes.name})`;
  }

  return (
    <>
      {timeZone === timeZoneSet && (
        <div className="main-header">
          <h2>
            {formattedDate}: {day.dateTypes.location} {holiday}
          </h2>
          {!todaySectionHeader && (
            <div
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
          )}
        </div>
      )}
    </>
  );
};

let localDate;
let formattedDate;
let meetingTime;
let timeZone;
let timeOffset;
let holiday;

// ######################################################
// ######################################################

// function that generates the header for each course day
const GenerateCourseDayHeader = ({ todaySectionHeader, day, coursetype }) => {
  // this is the timezone of the area we are in
  const timeZoneSet = "Asia/Singapore";
  // used by scrollTo function to identify where to scroll to
  const id = `${coursetype}-top`;

  if (day.meetingDateTimeUTC) {
    return (
      <NormalCourseDay
        todaySectionHeader={todaySectionHeader}
        day={day}
        timeZoneSet={timeZoneSet}
        id={id}
      />
    );
  } else {
    return (
      <HolidayCourseDay
        todaySectionHeader={todaySectionHeader}
        day={day}
        timeZoneSet={timeZoneSet}
        id={id}
      />
    );
  }
};

export default GenerateCourseDayHeader;
