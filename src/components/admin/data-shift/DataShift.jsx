import React from "react";
import GenerateDataShiftContent from "../GenerateDataShiftContent";
import ActiveCourses from "./ActiveCourses.jsx";
import DatePicker from "./DatePicker.jsx";

const DataShift = ({ 
  batchArray, 
  bootcampData, 
  setBootcampData, 
  setBatchFile, 
  batchFile, 
  setDaysInBatchFile, 
  setDaysInMainFile
 }) => {
 
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
