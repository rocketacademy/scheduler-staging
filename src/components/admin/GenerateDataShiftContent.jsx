import React, { useState } from "react";
import AddItemModal from "./main-accordion/AddItemModal";
import MainAccordion from "./main-accordion/MainAccordion";
import Button from "react-bootstrap/Button";
import download from "../../download";
import generateDataObject from "../../generateCourseDates";
import { DateTime } from "luxon";
import fulltimeDataFile from "../../data/bootcamp-course-days.json";
import partTimeDataFile from "../../data/ptbc-course-days.json";

// helper function for cpoying data to clipboard
const copyToClipboard = (data) => {
  // from stackoverflow, https://stackoverflow.com/questions/58376758/how-to-copy-a-json-data-to-the-clipboard-with-the-button
  let selBox = document.createElement("textarea");
  selBox.style.position = "fixed";
  selBox.style.left = "0";
  selBox.style.top = "0";
  selBox.style.opacity = "0";
  // this copies the JSON data to clipboard with original formatting
  selBox.value = JSON.stringify(data, undefined, 2);
  document.body.appendChild(selBox);
  selBox.focus();
  selBox.select();
  document.execCommand("copy");
  document.body.removeChild(selBox);
};

// ############################################################################
// ############################################################################
const GenerateDataShiftContent = ({
  bootcampData,
  setBootcampData,
  mainFile,
  setMainFile,
  batchFile,
  mainDays,
  setMainDays,
  setDaysInBatchFile,
  setDaysInMainFile,
  batchArray,
}) => {
  const [showInputModal, setShowInputModal] = useState(false);
  const [courseDate, setCourseDate] = useState("");
  // used in the close all functionality
  const [accordionKey, setAccordionKey] = useState(1234);

  const displayDataFile = (dataFile) => {
    console.log("data file", dataFile);

    setMainFile(dataFile);
    setMainDays(dataFile.days);
  };

  // function that handles download of main data file after edits
  const handleDownloadMainClick = async () => {
    download(mainFile, "modified-main-data-file.json");
  };

  // function that handles download of individual batch data file after edits
  const handleBatchDownloadClick = () => {
    download(batchFile, `modified-${batchFile.courseName}-file.json`);
  };

  // state set so that rerender occurs
  const handleCloseAll = () => {
    const newAccordionKeyValue = accordionKey + 1;
    setAccordionKey(newAccordionKeyValue);
  };

  // copys json data file to clipboard
  const handleEditInGithub = (data) => {
    copyToClipboard(data);

    let gitbookUrl;
    if (data.repoUrls) {
      gitbookUrl = mainFile.repoUrls.edit;
    } else {
      gitbookUrl = `https://github.com/rocketacademy/scheduler/edit/main/src/data/${batchFile.courseName}.json`;
    }
    // opens a new window in the browser at specified address(gitbook edit page)
    console.log("gitbook url", gitbookUrl);

    window.open(gitbookUrl, "_blank");
  };

  const handleBatchEdit = async (index) => {
    try {
      const batch = batchArray[index];
      const startDate = DateTime.fromFormat(
        batch.content.courseName.slice(0, 10),
        "dd-MM-yyyy"
      ).toFormat("yyyy-MM-dd");
      let courseType;
      if (batch.name.includes("pt")) {
        courseType = "Bootcamp PT";
      } else {
        courseType = "Bootcamp FT";
      }
      const courseName =
        batch.content.courseName[batch.content.courseName.length - 1];
      const data = await generateDataObject(
        startDate,
        courseName,
        courseType,
        mainFile
      );
      copyToClipboard(data);
      window.open(
        `https://github.com/rocketacademy/scheduler/edit/main/src/data/${data.courseName}.json`,
        "_blank"
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* renders batch schedule data file  */}
      {bootcampData &&
        bootcampData.constructor === Object &&
        Object.keys(bootcampData).length > 0 && (
          <div>
            <div className="download-button-container">
              <Button
                variant="primary"
                type="submit"
                onClick={() => handleEditInGithub(batchFile)}
              >
                Edit in GitHub Repo
              </Button>{" "}
              <Button
                variant="primary"
                type="submit"
                onClick={handleBatchDownloadClick}
              >
                Download Modified Batch File
              </Button>
            </div>
            <div className="close-all-container">
              <Button onClick={handleCloseAll}>close all</Button>
            </div>
            {Object.keys(bootcampData).map((day, dayIndex) => {
              return (
                <>
                  <div>
                    <MainAccordion
                      dayIndex={dayIndex}
                      bootcampData={bootcampData}
                      setBootcampData={setBootcampData}
                      day={day}
                      setShowInputModal={setShowInputModal}
                      setCourseDate={setCourseDate}
                      handleCloseAll={handleCloseAll}
                      accordionKey={accordionKey}
                      setAccordionKey={setAccordionKey}
                      setDaysInBatchFile={setDaysInBatchFile}
                      setDaysInMainFile={setDaysInMainFile}
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
                bootcampdata={bootcampData}
                setbootcampdata={setBootcampData}
                setShowInputModal={setShowInputModal}
                coursedate={courseDate}
                setDaysInBatchFile={setDaysInBatchFile}
                setDaysInMainFile={setDaysInMainFile}
              />
            )}
          </div>
        )}
      {/* displays fulltime or part time data file  */}
      <div className="data-button-container">
        <Button
          className="btn btn-primary"
          onClick={() => displayDataFile(fulltimeDataFile)}
        >
          Full Time
        </Button>
        <Button
          className="btn btn-primary"
          onClick={() => displayDataFile(partTimeDataFile)}
        >
          Part Time
        </Button>
      </div>
      {bootcampData && bootcampData.constructor === Array && mainFile && (
        <div className="accordion-container">
          <div className="download-button-container">
            <Button
              className="btn btn-primary"
              onClick={() => handleEditInGithub(mainFile)}
            >
              Edit in GitHub Repo
            </Button>
            <Button
              className="btn btn-primary"
              onClick={handleDownloadMainClick}
            >
              download modified file
            </Button>
          </div>
          <div className="batchfile-edit-container">
            {batchArray.map((batch, index) => {
              // different batches are shown depending on whether the data file rendered is the part time or full time one
              if (mainFile.daysOfWeek.length < 5) {
                return (
                  <>
                    {batch.name.includes("pt") && (
                      <Button
                        className="batch-update"
                        onClick={() => handleBatchEdit(index)}
                      >
                        Update {batch.name}
                      </Button>
                    )}
                  </>
                );
              } else {
                return (
                  <>
                    {batch.name.includes("ft") && (
                      <Button
                        className="batch-update"
                        onClick={() => handleBatchEdit(index)}
                      >
                        Update {batch.name}
                      </Button>
                    )}
                  </>
                );
              }
            })}
          </div>
          <div className="close-all-container">
            <Button onClick={handleCloseAll}>Close All</Button>
          </div>
          {bootcampData.map((day, dayIndex) => {
            return (
              <MainAccordion
                dayIndex={dayIndex}
                bootcampData={bootcampData}
                setBootcampData={setBootcampData}
                day={dayIndex}
                setShowInputModal={setShowInputModal}
                setCourseDate={setCourseDate}
                handleCloseAll={handleCloseAll}
                accordionKey={accordionKey}
                setAccordionKey={setAccordionKey}
                setDaysInMainFile={setDaysInMainFile}
                setDaysInBatchFile={setDaysInBatchFile}
              />
            );
          })}
          {showInputModal && (
            <AddItemModal
              show={showInputModal}
              onHide={() => setShowInputModal(false)}
              bootcampdata={bootcampData}
              setbootcampdata={setBootcampData}
              setShowInputModal={setShowInputModal}
              coursedate={courseDate}
              setDaysInMainFile={setDaysInMainFile}
              setDaysInBatchFile={setDaysInBatchFile}
            />
          )}
        </div>
      )}
    </>
  );
};

export default GenerateDataShiftContent;
