import React, { useState } from "react";
import AddItemModal from "./AddItemModal";
import MainAccordion from "./MainAccordion";
import Button from "react-bootstrap/Button";
import download from "../download";

const GenerateDataShiftContent = ({
  bootcampDataCopy,
  setBootcampDataCopy,
}) => {
  const [showInputModal, setShowInputModal] = useState(false);
  const [courseDate, setCourseDate] = useState("");

  // function that handles download of main data file after edits
  const handleDownloadMainClick = () => {
    console.log("main data file mod", bootcampDataCopy);
    download(bootcampDataCopy, "modified-main-data-file.json");
  };

  // function that handles download of individual batch data file after edits
  const handleBatchDownloadClick = () => {
    console.log("batch data copy", bootcampDataCopy);
    download(
      bootcampDataCopy,
      `modified-${bootcampDataCopy.courseName}-file.json`
    );
  };

  // TODO: need to find another way to close all tabs of accordion
  // const handleClose = () => {
  //   const element = document.getElementsByClassName(
  //     "accordion-collapse collapse show"
  //   );

  //   Array.from(element).forEach((subelement) => {
  //     subelement.classList.remove("show");
  //   });
  //   // setFold(true);
  // };

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
            {/* TODO: not being used at the moment */}
            {/* <button
              type="submit"
              className="btn btn-primary"
              onClick={handleClose}
            >
              close all
            </button> */}
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
          {/* <button
            type="submit"
            className="btn btn-primary"
            onClick={handleClose}
          >
            close all
          </button> */}
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
