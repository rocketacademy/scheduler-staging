import React from "react";
import ScheduleContent from "./ScheduleContent";
import SideBar from "./sidebar/SideBar";
import { DateTime } from "luxon";

function BatchSchedule({ data, title }) {
  console.log(data, title);
  const scheduleData = JSON.parse(JSON.stringify(data.days));
  console.log(scheduleData);

  // needed to generate id for use with react-scroll library, also indicates if course is full time/ part time
  let coursetype;
  if (data.courseType === "PTBC") {
    coursetype = "pt";
  } else {
    coursetype = "ft";
  }

  let today = DateTime.now();

  // checking if first day of course is after today, if so today = first day of course, so that current day
  // section and tables and display first day/ weeks info
  const courseDatesArray = [];
  Object.keys(scheduleData).map((day) => {
    courseDatesArray.push(day);
  });
  courseDatesArray.sort(function (a, b) {
    return a - b;
  });
  const firstDayOfCourse = DateTime.fromFormat(
    courseDatesArray[0],
    "yyyy-MM-dd"
  );

  if (today < firstDayOfCourse) {
    today = firstDayOfCourse;
  }
  console.log(courseDatesArray);
  console.log(firstDayOfCourse);

  return (
    <div className="course-schedule">
      {/* contains links to main part of schedule page */}

      <SideBar
        scheduleData={scheduleData}
        coursetype={coursetype}
        firstDayOfCourse={firstDayOfCourse}
      />
      {/* contains current schedule table and main content of page */}
      <ScheduleContent
        scheduleData={scheduleData}
        coursetype={coursetype}
        title={title}
        today={today}
        firstDayOfCourse={firstDayOfCourse}
      />
    </div>
  );
}

export default BatchSchedule;
