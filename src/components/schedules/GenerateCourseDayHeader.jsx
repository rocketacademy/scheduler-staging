import React from "react";
import { DateTime } from "luxon";

// Generate course day header for normal course day
function NormalCourseDay({
  todaySectionHeader,
  day,
  timeZoneSet,
  timeZoneSet1,
}) {
  // console.log("day and time", day, timeOffset);
  localDate = DateTime.fromISO(day.meetingDateTimeUtc, { zone: timeZoneSet });
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
          {day.courseDay > 0 && <p>{day.dateTypes.module}</p>}
        </div>
      )}
    </>
  );
}

// helper function that generates courseday header for a holiday
function HolidayCourseDay({ day, timeZoneSet, timeZoneSet1 }) {
  localDate = DateTime.fromFormat(day.courseDate, "yyyy-MM-dd");
  formattedDate = localDate.toFormat("EEE d MMM");
  timeZone = localDate.toFormat("z");
  // depending on if the holiday is a public/school holiday,
  // a different output will be rendered
  if (day.dateTypes.holidayType === "public holiday") {
    holiday = `${day.dateTypes.location} Public Holiday (${day.dateTypes.name})`;
    console.log("public");
  } else {
    console.log("school");
    holiday = "School Holiday";
  }
  console.log("timeZone", timeZone);
  console.log("timeZoneSet", timeZoneSet);

  console.log(timeZone === timeZoneSet);
  return (
    <div>
      {timeZone === (timeZoneSet || timeZoneSet1) && (
        <div className="main-header">
          <h2>{`${formattedDate}: ${holiday}`}</h2>
        </div>
      )}
    </div>
  );
}

let localDate;
let formattedDate;
let meetingTime;
let timeZone;
let timeOffset;
let holiday;

// ######################################################
// ######################################################

// function that generates the header for each course day
function GenerateCourseDayHeader({ todaySectionHeader, day }) {
  // console.log("one more time", todaySectionHeader, day);
  // this is the timezone of the area we are in
  const timeZoneSet = "Asia/Singapore";
  const timeZoneSet1 = "Asia/Hong_Kong";
  console.log(day);

  if (day.meetingDateTimeUtc) {
    return (
      <NormalCourseDay
        todaySectionHeader={todaySectionHeader}
        day={day}
        timeZoneSet={(timeZoneSet, timeZoneSet1)}
      />
    );
  }
  return (
    <HolidayCourseDay
      todaySectionHeader={todaySectionHeader}
      day={day}
      timeZoneSet={(timeZoneSet, timeZoneSet1)}
    />
  );
}

export default GenerateCourseDayHeader;
