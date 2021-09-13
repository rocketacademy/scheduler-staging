import React from "react";
import Accordion from "react-bootstrap/Accordion";
import AddIcon from "@material-ui/icons/Add";
import Section from "./inner-accordion/Section";

function MainAccordion({
  dayIndex,
  bootcampData,
  setBootcampData,
  day,
  setShowInputModal,
  setCourseDate,
  handleCloseAll,
  setAccordionKey,
  accordionKey
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
      {bootcampData[day].dateTypes.module && (
        <Accordion key={accordionKey}>
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
                {bootcampData.constructor === Object ? (
                  <>
                    {day}, Week: {bootcampData[day].courseWeek}, Course Day:{" "}
                    {bootcampData[day].courseDay},{" "}
                    {bootcampData[day].dateTypes.module}{" "}
                  </>
                ) : (
                  <>
                    Course Day: {bootcampData[day].courseDay},{" "}
                    {bootcampData[day].dateTypes.module}{" "}
                  </>
                )}
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <div className="course-day">
                <div>
                  {Object.keys(bootcampData[day].dateTypes).map(
                    (section) => (
                      <Section
                        day={day}
                        setBootcampData={setBootcampData}
                        section={section}
                        sectionType={bootcampData[day].dateTypes[section]}
                        dayIndex={dayIndex}
                        bootcampData={bootcampData}
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
