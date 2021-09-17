import React from "react";
import CourseWeeks from "./CourseWeeks";

// side navbar , displays a list of course weeks
function SideBar({ scheduleData, coursetype, firstDayOfCourse }) {
  return (
    <div className="sidebar">
      <CourseWeeks 
        scheduleData={scheduleData} 
        coursetype={coursetype} 
        firstDayOfCourse={firstDayOfCourse}  />
    </div>
  );
}

export default SideBar;
