import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import download from "../download.js";
import ptbc1 from "../data/16-08-2021_10-10-2022_BATCH1.json";
import GenerateDataShiftContent from "./GenerateDataShiftContent";
import DataShiftSidebar from "./DataShiftSidebar.jsx";
import DatePicker from "./DatePicker.jsx";

const DataShift = ({ bootcampDataCopy, setBootcampDataCopy }) => {
  const handleDownloadClick = () => {
    console.log("batch data copy", bootcampDataCopy);
    download(
      bootcampDataCopy,
      `modified-${bootcampDataCopy.courseName}-file.json`
    );
  };

  return (
    <>
      <div className="datashift-container">
        <div className="datashift-button-container">
          <DataShiftSidebar bootcampDataCopy={bootcampDataCopy} />
          <Button variant="info" type="submit" onClick={handleDownloadClick}>
            Download File
          </Button>
        </div>
        <div className="data-shift">
          <div className="data-container">
            <DatePicker
              bootcampDataCopy={bootcampDataCopy}
              setBootcampDataCopy={setBootcampDataCopy}
            />
            <GenerateDataShiftContent
              bootcampDataCopy={bootcampDataCopy}
              setBootcampDataCopy={setBootcampDataCopy}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DataShift;
