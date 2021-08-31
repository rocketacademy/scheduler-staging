import React, { useState } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import DataShift from "./DataShift";
import mainDataFile from "../data/bootcamp-course-days.json";
import GenerateDataShiftContent from "./GenerateDataShiftContent";

const TabsContainer = ({ batchArray }) => {
  const [key, setKey] = useState("datePicker");
  // remains empty until user picks/ generates schedule to edit
  const [batchDataCopy, setBatchDataCopy] = useState({});
  // this is the main bootcamp data json file that has not been mapped onto any dates
  const [mainDataCopy, setMainDataCopy] = useState(
    JSON.parse(JSON.stringify(mainDataFile.days))
  );
  console.log("main data copy", mainDataCopy);

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      {/* this tab contains the component for editing the main data file */}
      <Tab eventKey="datePicker" title="Main">
        <GenerateDataShiftContent
          bootcampDataCopy={mainDataCopy}
          setBootcampDataCopy={setMainDataCopy}
        />
      </Tab>
      {/* this tab contains the component for generating/ editing individual batch schedules */}
      <Tab eventKey="dataShift" title="Batch">
        <DataShift
          batchArray={batchArray}
          bootcampDataCopy={batchDataCopy}
          setBootcampDataCopy={setBatchDataCopy}
        />
      </Tab>
    </Tabs>
  );
};

export default TabsContainer;
