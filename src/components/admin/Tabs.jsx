import React, { useState, useEffect } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import DataShift from "./data-shift/DataShift";
import mainDataFile from "../../data/bootcamp-course-days.json";
import GenerateDataShiftContent from "./GenerateDataShiftContent";

const TabsContainer = ({ batchArray }) => {
  const [key, setKey] = useState("datePicker");
  // remains empty until user picks/ generates schedule to edit. this is the days section of the batch data file
  const [batchDays, setBatchDays] = useState({});
  // this is the whole data file
  const [batchFile, setBatchFile] = useState({});

  // this is the main bootcamp data json file that has not been mapped onto any dates
  const [mainFile, setMainFile] = useState(
    JSON.parse(JSON.stringify(mainDataFile))
  );
  // this is the course days section of the bootcamp data json file  
  const [mainDays, setMainDays] = useState(
    JSON.parse(JSON.stringify(mainDataFile.days))
  );

  // update main file every time days key changes
  useEffect(() => {
    setMainFile({...mainFile, days: mainDays})
  }, [mainDays]);

  // update batch file everytime days key changes
  useEffect(() => {
    setBatchFile({...batchFile, days: batchDays});
  }, [batchDays])

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className=""
    >
      {/* this tab contains the component for editing the main data file */}
      <Tab eventKey="datePicker" title="Main">
        <GenerateDataShiftContent
          bootcampData={mainDays}
          setBootcampData={setMainDays}
          mainFile={mainFile}
          setMainFile={setMainFile}
        />
      </Tab>
      {/* this tab contains the component for generating/ editing individual batch schedules */}
      <Tab eventKey="dataShift" title="Batch">
        <DataShift
          batchArray={batchArray}
          bootcampData={batchDays}
          setBootcampData={setBatchDays}
          setBatchFile={setBatchFile}
          batchFile={batchFile}
        />
      </Tab>
    </Tabs>
  );
};

export default TabsContainer;
