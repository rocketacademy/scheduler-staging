import React, { useState } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import BatchSchedule from './BatchSchedule';
import ptbc1 from '../data/16-08-2021_10-10-2022_BATCH1.json';
import ftbc4 from '../data/12-07-2021_22-12-2021_BATCH4.json';

function ScheduleContainer() {
    // this sets which schedule is shown on page load
    const [key, setKey] = useState('FTBC4');

    // pass individual batch json files into BatchSchedule to generate schedules
  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      <Tab eventKey="FTBC4" title="FTBC4">
        <BatchSchedule data={ftbc4} title="FTBC 4" />
      </Tab>
      <Tab eventKey="PTBC1" title="PTBC1">
        <BatchSchedule data={ptbc1} title="PTBC 1" />
      </Tab>
    </Tabs>
  );
}

export default ScheduleContainer
