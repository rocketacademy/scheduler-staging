import React from "react";
import GenerateDataShiftContent from "../GenerateDataShiftContent";
import ActiveCourses from "./ActiveCourses.jsx";
import DatePicker from "./DatePicker.jsx";

const DataShift = ({ batchArray, bootcampDataCopy, setBootcampDataCopy, setBatchCopy, batchCopy }) => {
 
  return (
    <>
      <div className="datashift-container">
        <div className="all-courses-navbar">
          {/* this component contains links to indivudual batch schedules to be rendered and edited */}
          <ActiveCourses
            batchArray={batchArray}
            setBootcampDataCopy={setBootcampDataCopy}
            setBatchCopy={setBatchCopy}
          />
        </div>
        <div className="data-shift">
          <div className="data-container">
            {/* this component generates a course schedule based on start date and course type from the main json data file */}
            <DatePicker
              bootcampDataCopy={bootcampDataCopy}
              setBootcampDataCopy={setBootcampDataCopy}
            />
            {/* this component allows the user to edit the schedule rendered */}
            <GenerateDataShiftContent
              batchArray={batchArray}
              bootcampDataCopy={bootcampDataCopy}
              setBootcampDataCopy={setBootcampDataCopy}
              batchCopy={batchCopy}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DataShift;
