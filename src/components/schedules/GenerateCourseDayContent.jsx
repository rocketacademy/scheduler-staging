import React from "react";
import GenerateNotifications from "./GenerateNotifications";
import GenerateDatetypeSections from "./GenerateDatetypeSections";

// generates the content and section headings for each course day
const GenerateCourseDayContent = ({ day }) => {
  let projectdue;
  let projectstart;
  let ipdue;
  if (!day.dateTypes.holidayType) {
    projectdue = day.dateTypes.projects.projectDue;
    projectstart = day.dateTypes.projects.projectStart;
    ipdue = day.dateTypes.ip.ipDue;
  }
 

  return (
    <>
      {/* project due notification  */}
      <GenerateNotifications
        status={projectdue}
        ipdue={ipdue}
        projectdue={projectdue}
        projectstart={projectstart}
        day={day}
      />
      {/* career prep due notification  */}
      <GenerateNotifications
        status={ipdue}
        ipdue={ipdue}
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
        ipdue={ipdue}
        projectdue={projectdue}
        projectstart={projectstart}
        day={day}
      />
    </>
  );
};

export default GenerateCourseDayContent;
