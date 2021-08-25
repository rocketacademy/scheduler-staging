import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import download from "../download.js";
import ptbc1 from "../data/16-08-2021_10-10-2022_BATCH1.json";
import GenerateDataShiftContent from "./GenerateDataShiftContent";
import Form from "react-bootstrap/Form";
import { scroller } from "react-scroll";
import { DateTime } from "luxon";
import DataShiftSidebar from "./DataShiftSidebar.jsx";

const DataShift = () => {
  const [bootcampDataCopy, setBootcampDataCopy] = useState(
    JSON.parse(JSON.stringify(ptbc1.days))
  );

  const handleDownloadClick = () => {
    ptbc1.days = bootcampDataCopy;
    download(ptbc1, "modified-bootcamp-data.json");
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
