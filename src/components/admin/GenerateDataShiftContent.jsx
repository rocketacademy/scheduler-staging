import React, { useState } from "react";
import AddItemModal from "./main-accordion/AddItemModal";
import MainAccordion from "./main-accordion/MainAccordion";
import Button from "react-bootstrap/Button";
import download from "../../download";

const GenerateDataShiftContent = ({
  bootcampDataCopy,
  setBootcampDataCopy,
}) => {
  const [showInputModal, setShowInputModal] = useState(false);
  const [courseDate, setCourseDate] = useState("");
  // used in the close all functionality
  const [accordionKey, setAccordionKey] = useState(1234);

  // function that handles download of main data file after edits
  const handleDownloadMainClick = () => {
    download(bootcampDataCopy, "modified-main-data-file.json");
  };

  // function that handles download of individual batch data file after edits
  const handleBatchDownloadClick = () => {
    download(
      bootcampDataCopy,
      `modified-${bootcampDataCopy.courseName}-file.json`
    );
  };

  // state set so that rerender occurs
  const handleCloseAll = () => {
    const newAccordionKeyValue = accordionKey + 1;
    setAccordionKey(newAccordionKeyValue);
  }

  return (
    <>
      {/* renders batch schedule data file  */}
      {bootcampDataCopy.constructor === Object &&
        Object.keys(bootcampDataCopy).length > 0 && (
          <div>
            <div className="download-button-container">
              <Button
                variant="primary"
                type="submit"
                onClick={handleBatchDownloadClick}
              >
                Download File
              </Button>
            </div>
            <div className="close-all-container">
              <Button onClick={handleCloseAll}>close all</Button>
            </div>
            {Object.keys(bootcampDataCopy).map((day, dayIndex) => {
              return (
                <>
                <div>
                  <MainAccordion
                    dayIndex={dayIndex}
                    bootcampDataCopy={bootcampDataCopy}
                    setBootcampDataCopy={setBootcampDataCopy}
                    day={day}
                    setShowInputModal={setShowInputModal}
                    setCourseDate={setCourseDate}
                    handleCloseAll={handleCloseAll}
                    accordionKey={accordionKey}
                    setAccordionKey={setAccordionKey}
                  />
                </div>
                </>
              );
            })}
            {/* modal that takes in user input to create a new item in the schedule  */}
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
      {/* displays main data file  */}
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
          <div className="close-all-container">
            <Button onClick={handleCloseAll}>Close All</Button>
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
                handleCloseAll={handleCloseAll}
                    accordionKey={accordionKey}
                    setAccordionKey={setAccordionKey}
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
