import React, { useState, useEffect } from "react";
import GenerateDataShiftContent from "../GenerateDataShiftContent";
import ActiveCourses from "./ActiveCourses.jsx";
import DatePicker from "./DatePicker.jsx";

const DataShift = ({ 
  batchArray, 
 }) => {

  // remains empty until user picks/ generates schedule to edit. this is the days section of the batch data file
  const [batchDays, setBatchDays] = useState({});
  // this is the whole data file
  const [batchFile, setBatchFile] = useState({});

  // this is the main bootcamp data json file that has not been mapped onto any dates
  const [mainFile, setMainFile] = useState();
  // this is the course days section of the bootcamp data json file
  const [mainDays, setMainDays] = useState();
  // helper function for setting state (mainFile)
  const setDaysInMainFile = (mainDays) => {
    setMainFile({ ...mainFile, days: mainDays });
  };

  // helper function for setting state (batchFile)
  const setDaysInBatchFile = (batchDays) => {
    setBatchFile({ ...batchFile, days: batchDays });
  };

  const bootcampData = batchDays;
  const setBootcampData = setBatchDays;

  return (
    <>
      <div className="datashift-container">
        <div className="all-courses-navbar">
          {/* this component contains links to indivudual batch schedules to be rendered and edited */}
          <ActiveCourses
            batchArray={batchArray}
            setBootcampData={setBootcampData}
            setBatchFile={setBatchFile}
          />
        </div>
        <div className="data-shift">
          <div className="data-container">
            {/* this component generates a course schedule based on start date and course type from the main json data file */}
            <DatePicker
              bootcampData={bootcampData}
              setBootcampData={setBootcampData}
              setBatchFile={setBatchFile}
            />
            {/* this component allows the user to edit the schedule rendered */}
            <GenerateDataShiftContent
              batchArray={batchArray}
              bootcampData={bootcampData}
              setBootcampData={setBootcampData}
              batchFile={batchFile}
              setDaysInBatchFile={setDaysInBatchFile}
              setDaysInMainFile={setDaysInMainFile}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DataShift;
