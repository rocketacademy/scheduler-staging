import React from "react";
import Accordion from "react-bootstrap/Accordion";
import AddIcon from "@material-ui/icons/Add";
import Section from "./inner-accordion/Section";

function MainAccordion({
  dayIndex,
  bootcampDataCopy,
  setBootcampDataCopy,
  day,
  setShowInputModal,
  setCourseDate,
  // fold,
  // setFold,
}) {
  const handlePlusClick = (day) => {
    console.log(day);
    setCourseDate(day);
    setShowInputModal(true);
  };

  return (
    <div>
      {bootcampDataCopy[day].dateTypes.module && (
        <Accordion>
          <Accordion.Item eventKey={dayIndex}>
            <Accordion.Header>
              <div
                className="course-day-symbol"
                onClick={() => handlePlusClick(day)}
              >
                {" "}
                <AddIcon />
              </div>
              <div className="course-day-header">
                {bootcampDataCopy.constructor === Object ? (
                  <>
                    {day}, Week: {bootcampDataCopy[day].courseWeek}, Course Day:{" "}
                    {bootcampDataCopy[day].courseDay},{" "}
                    {bootcampDataCopy[day].dateTypes.module}{" "}
                  </>
                ) : (
                  <>
                    Course Day: {bootcampDataCopy[day].courseDay},{" "}
                    {bootcampDataCopy[day].dateTypes.module}{" "}
                  </>
                )}
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <div className="course-day">
                <div>
                  {Object.keys(bootcampDataCopy[day].dateTypes).map(
                    (section) => (
                      <Section
                        day={day}
                        setBootcampDataCopy={setBootcampDataCopy}
                        section={section}
                        sectionType={bootcampDataCopy[day].dateTypes[section]}
                        dayIndex={dayIndex}
                        bootcampDataCopy={bootcampDataCopy}
                      />
                    )
                  )}
                </div>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      )}
    </div>
  );
}

export default MainAccordion;
