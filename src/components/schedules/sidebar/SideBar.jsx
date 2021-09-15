import React from "react";
import CourseWeeks from "./CourseWeeks";
import Modules from "./Modules";

// side navbar , displays a list of course weeks
function SideBar({ scheduleData, coursetype }) {
  return (
    <div className="sidebar">
      <CourseWeeks scheduleData={scheduleData} coursetype={coursetype} />
    </div>
  );
}

export default SideBar;
