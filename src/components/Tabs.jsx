import React, { useState } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import DatePicker from "./DatePicker";
import DataShift from "./DataShift";
import MainAccordion from "./MainAccordion";
import mainDataFile from "../data/bootcamp-course-days.json";
import GenerateDataShiftContent from "./GenerateDataShiftContent";

const TabsContainer = () => {
  const [key, setKey] = useState("datePicker");
  const [batchDataCopy, setBatchDataCopy] = useState({});
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
      <Tab eventKey="datePicker" title="Main">
        <GenerateDataShiftContent
          bootcampDataCopy={mainDataCopy}
          setBootcampDataCopy={setMainDataCopy}
        />
      </Tab>
      <Tab eventKey="dataShift" title="Batch">
        <DataShift
          bootcampDataCopy={batchDataCopy}
          setBootcampDataCopy={setBatchDataCopy}
        />
      </Tab>
    </Tabs>
  );
};

export default TabsContainer;
