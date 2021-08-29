import React, { useState } from "react";
import AddItemModal from "./AddItemModal";
import MainAccordion from "./MainAccordion";
import download from "../download";

const GenerateDataShiftContent = ({
  bootcampDataCopy,
  setBootcampDataCopy,
}) => {
  const [showInputModal, setShowInputModal] = useState(false);
  const [courseDate, setCourseDate] = useState("");

  const handleDownloadMainClick = () => {
    console.log("main data file mod", bootcampDataCopy);
    download(bootcampDataCopy, "modified-main-data-file.json");
  };

  return (
    <>
      {bootcampDataCopy.constructor === Object &&
        Object.keys(bootcampDataCopy).length > 0 && (
          <div>
            {Object.keys(bootcampDataCopy).map((day, dayIndex) => {
              return (
                <>
                  <MainAccordion
                    dayIndex={dayIndex}
                    bootcampDataCopy={bootcampDataCopy}
                    setBootcampDataCopy={setBootcampDataCopy}
                    day={day}
                    setShowInputModal={setShowInputModal}
                    setCourseDate={setCourseDate}
                  />
                  {/* {bootcampDataCopy[day].dateTypes.module && (
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
                  )} */}
                </>
              );
            })}
            {showInputModal && courseDate && (
              <AddItemModal
                show={showInputModal}
                onHide={() => setShowInputModal(false)}
                bootcampdatacopy={bootcampDataCopy}
                setbootcampdatacopy={setBootcampDataCopy}
                setShowInputModal={setShowInputModal}
                coursedate={courseDate}
              />
            )}
          </div>
        )}
      {bootcampDataCopy.constructor === Array && (
        <div className="accordion-container">
          <div className="download-button-container">
            <button
              className="btn btn-primary"
              onClick={handleDownloadMainClick}
            >
              download modified file
            </button>
          </div>
          {bootcampDataCopy.map((day, dayIndex) => {
            return (
              <MainAccordion
                dayIndex={dayIndex}
                bootcampDataCopy={bootcampDataCopy}
                setBootcampDataCopy={setBootcampDataCopy}
                day={dayIndex}
                setShowInputModal={setShowInputModal}
                setCourseDate={setCourseDate}
              />
            );
          })}
          {showInputModal && courseDate && (
            <AddItemModal
              show={showInputModal}
              onHide={() => setShowInputModal(false)}
              bootcampdatacopy={bootcampDataCopy}
              setbootcampdatacopy={setBootcampDataCopy}
              setShowInputModal={setShowInputModal}
              coursedate={courseDate}
            />
          )}
        </div>
      )}
    </>
  );
};

export default GenerateDataShiftContent;
