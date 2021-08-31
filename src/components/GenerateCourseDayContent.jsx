import React from "react";
import GenerateNotifications from "./GenerateNotifications";
import GenerateDatetypeSections from "./GenerateDatetypeSections";

// generates the content and section headings for each course day
const GenerateCourseDayContent = ({ day }) => {
  const projectdue = day.dateTypes.projects.projectDue;
  const projectstart = day.dateTypes.projects.projectStart;
  const cpdue = day.dateTypes.cp.cpDue;

  return (
    <>
      {/* project due notification  */}
      <GenerateNotifications
        status={projectdue}
        cpdue={cpdue}
        projectdue={projectdue}
        projectstart={projectstart}
        day={day}
      />
      {/* career prep due notification  */}
      <GenerateNotifications
        status={cpdue}
        cpdue={cpdue}
        projectdue={projectdue}
        projectstart={projectstart}
        day={day}
      />
      {/* preclass section  */}
      <GenerateDatetypeSections
        datetype={day.dateTypes}
        classType="preClass"
        day={day}
      />
      {/* in class section  */}
      <GenerateDatetypeSections
        datetype={day.dateTypes}
        classType="inClass"
        day={day}
      />
      {/* post class section  */}
      <GenerateDatetypeSections
        datetype={day.dateTypes}
        classType="postClass"
        day={day}
      />
      {/* project start notification  */}
      <GenerateNotifications
        status={projectstart}
        cpdue={cpdue}
        projectdue={projectdue}
        projectstart={projectstart}
        day={day}
      />
    </>
  );
};

export default GenerateCourseDayContent;
