import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";

import ftbc13 from "./data/FTBC13_2023-08-28_2023-12-14.json";
import ftbc14 from "./data/FTBC14_2023-11-14_2024-03-18.json";

import ptbc7 from "./data/PTBC7_2023-03-18_2023-10-31.json"; // PTBC3.1, courseStartDaysOfWeekIndex 1 (Sat)
import ptbc8 from "./data/PTBC8_2023-06-24_2024-02-27.json"; // PTBC3.1, courseStartDaysOfWeekIndex 1 (Sat)HK public holidays

import ptbc9 from "./data/PTBC9_2023-09-23_2024-05-28.json"; // FTBC3.1 - Hk public holidays

// place holders
import ftbc15 from "./data/FTBC15_2024-02-26_2024-06-18.json";
import ptbc10 from "./data/PTBC10_2024-01-16_2024-09-07.json";

import ScheduleContainer from "./components/schedules/ScheduleContainer";
import BatchScheduleGenerator from "./components/BatchScheduleGenerator";

function App() {
  const batchArray = [
    { name: "ftbc13", content: ftbc13 },
    { name: "ftbc14", content: ftbc14 },
    { name: "ftbc15", content: ftbc15 },

    { name: "ptbc7", content: ptbc7 },
    { name: "ptbc8", content: ptbc8 },
    { name: "ptbc9", content: ptbc9 },
    { name: "ptbc10", content: ptbc10 },
  ];

  return (
    <div className="App">
      <HashRouter>
        <Switch>
          {/* route that takes user to part of app that edits course schedules */}
          <Route path="/admin">
            <BatchScheduleGenerator />
          </Route>
          {/* route that takes user to part of app that displays batch schedules for student use */}
          <Route path="/">
            <ScheduleContainer batchArray={batchArray} />
          </Route>
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
