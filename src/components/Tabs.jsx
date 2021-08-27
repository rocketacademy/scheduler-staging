import React, { useState } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import DatePicker from "./DatePicker";
import DataShift from "./DataShift";

const TabsContainer = () => {
  const [key, setKey] = useState("datePicker");
  const [bootcampDataCopy, setBootcampDataCopy] = useState({});

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      <Tab eventKey="datePicker" title="Generate">
        <DatePicker
          bootcampDataCopy={bootcampDataCopy}
          setBootcampDataCopy={setBootcampDataCopy}
        />
      </Tab>
      <Tab eventKey="dataShift" title="Edit">
        <DataShift
          bootcampDataCopy={bootcampDataCopy}
          setBootcampDataCopy={setBootcampDataCopy}
        />
      </Tab>
    </Tabs>
  );
};

export default TabsContainer;
