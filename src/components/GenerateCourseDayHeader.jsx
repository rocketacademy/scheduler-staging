import React from "react";
import { DateTime } from "luxon";

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
        <div className="main-header-div">
          <div className="main-header">
            {!todaySectionHeader ? (
              <h3 className="day-header">
                {formattedDate}, Week {day.courseWeek}, Course Day{" "}
                {day.courseDay}
              </h3>
            ) : (
              <h3 className="day-header">{formattedDate}</h3>
            )}
          </div>
          <p>
            Meeting Time: {meetingTime} SGT ({timeOffset})
          </p>
          <p>{day.dateTypes.module}</p>
        </div>
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

  if (day.meetingDateTimeUTC) {
    return (
      <NormalCourseDay
        todaySectionHeader={todaySectionHeader}
        day={day}
        timeZoneSet={timeZoneSet}
      />
    );
  } else {
    return (
      <HolidayCourseDay
        todaySectionHeader={todaySectionHeader}
        day={day}
        timeZoneSet={timeZoneSet}
      />
    );
  }
};

export default GenerateCourseDayHeader;
