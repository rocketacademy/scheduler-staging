import React from "react";
import Section from "./Section";

const GenerateDataShiftContent = ({
  bootcampDataCopy,
  setBootcampDataCopy,
}) => {
  return Object.keys(bootcampDataCopy).map((day, dayIndex) => {
    const id = `schedule-week-${bootcampDataCopy[day].courseWeek}-day-${bootcampDataCopy[day].courseDay}`;

    return (
      <div className="course-day" id={id}>
        <div className="course-day-header">
          {day}, Week: {bootcampDataCopy[day].courseWeek}, Course Day:{" "}
          {bootcampDataCopy[day].courseDay},{" "}
          {bootcampDataCopy[day].dateTypes.module}
        </div>
        <div>
          {Object.keys(bootcampDataCopy[day].dateTypes).map((section) => (
            <Section
              setBootcampDataCopy={setBootcampDataCopy}
              section={section}
              sectionType={bootcampDataCopy[day].dateTypes[section]}
              dayIndex={dayIndex}
              bootcampDataCopy={bootcampDataCopy}
            />
          ))}
        </div>
      </div>
    );
  });
};

export default GenerateDataShiftContent;
