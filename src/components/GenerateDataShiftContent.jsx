import React, { useState } from "react";
import Section from "./Section";
import Accordion from "react-bootstrap/Accordion";
import AddItemModal from "./AddItemModal";
import AddIcon from "@material-ui/icons/Add";

const GenerateDataShiftContent = ({
  bootcampDataCopy,
  setBootcampDataCopy,
}) => {
  const [showInputModal, setShowInputModal] = useState(false);
  const [courseDate, setCourseDate] = useState("");

  const handlePlusClick = (day) => {
    console.log(day);
    setCourseDate(day);
    setShowInputModal(true);
  };

  console.log("inside data shift", bootcampDataCopy);
  return (
    <>
      {Object.keys(bootcampDataCopy).length > 0 &&
        bootcampDataCopy.constructor === Object && (
          <>
            {Object.keys(bootcampDataCopy).map((day, dayIndex) => {
              return (
                <>
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
                            {day}, Week: {bootcampDataCopy[day].courseWeek},
                            Course Day: {bootcampDataCopy[day].courseDay},{" "}
                            {bootcampDataCopy[day].dateTypes.module}{" "}
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
                                    sectionType={
                                      bootcampDataCopy[day].dateTypes[section]
                                    }
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
                </>
              );
            })}
            {showInputModal && courseDate && (
              <AddItemModal
                show={showInputModal}
                onHide={() => setShowInputModal(false)}
                bootcampdatacopy={bootcampDataCopy}
                setbootcampdatacopy={setBootcampDataCopy}
                coursedate={courseDate}
              />
            )}
          </>
        )}
    </>
  );
};

export default GenerateDataShiftContent;
