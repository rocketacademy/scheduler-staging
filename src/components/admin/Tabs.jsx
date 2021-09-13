import React, { useState, useEffect } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import DataShift from "./data-shift/DataShift";
import mainDataFile from "../../data/bootcamp-course-days.json";
import GenerateDataShiftContent from "./GenerateDataShiftContent";

const TabsContainer = ({ batchArray }) => {
  const [key, setKey] = useState("datePicker");
  // remains empty until user picks/ generates schedule to edit
  const [batchDataCopy, setBatchDataCopy] = useState({});

  const [batchCopy, setBatchCopy] = useState({});
  // this is the main bootcamp data json file that has not been mapped onto any dates
  const [mainCopy, setMainCopy] = useState(
    JSON.parse(JSON.stringify(mainDataFile))
  );
  // this is the course days section of the bootcamp data json file  
  const [mainDataCopy, setMainDataCopy] = useState(
    JSON.parse(JSON.stringify(mainDataFile.days))
  );

  useEffect(() => {
    setMainCopy({...mainCopy, days: mainDataCopy})
  }, [mainDataCopy]);

  useEffect(() => {
    setBatchCopy({...batchCopy, days: batchDataCopy});
  }, [batchDataCopy])

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
          bootcampDataCopy={mainDataCopy}
          setBootcampDataCopy={setMainDataCopy}
          mainCopy={mainCopy}
          setMainCopy={setMainCopy}
        />
      </Tab>
      {/* this tab contains the component for generating/ editing individual batch schedules */}
      <Tab eventKey="dataShift" title="Batch">
        <DataShift
          batchArray={batchArray}
          bootcampDataCopy={batchDataCopy}
          setBootcampDataCopy={setBatchDataCopy}
          setBatchCopy={setBatchCopy}
          batchCopy={batchCopy}
        />
      </Tab>
    </Tabs>
  );
};

export default TabsContainer;
