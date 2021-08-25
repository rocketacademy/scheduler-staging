import React from "react";
import ScheduleContent from "./ScheduleContent";
import SideBar from "./SideBar";
// import "../sass/BatchSchedule.scss";

function BatchSchedule({ data, title }) {
  const scheduleData = JSON.parse(JSON.stringify(data.days));

  // needed to generate id for use with react-scroll library, also indicates full time/ part time
  let coursetype;
  if (data.courseType === "Bootcamp PT") {
    coursetype = "pt";
  } else {
    coursetype = "ft";
  }

  return (
    <div className="course-schedule">
      {/* contains links to main part of schedule page */}
      <SideBar scheduleData={scheduleData} coursetype={coursetype} />
      {/* contains current schedule table and main content of page */}
      <ScheduleContent
        scheduleData={scheduleData}
        coursetype={coursetype}
        title={title}
      />
    </div>
  );
}

export default BatchSchedule;
