import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";

import ftbc7 from "./data/28-03-2022_20-09-2022_FTBC7.json";
import ftbc8 from "./data/04-07-2022_26-10-2022_FTBC8.json";
import ptbc1 from "./data/17-08-2021_23-07-2022_PTBC1.json";
import ptbc2 from "./data/16-11-2021_25-10-2022_PTBC2.json";
import ptbc4 from "./data/14-05-2022_07-01-2023_PTBC4.json";

import ScheduleContainer from "./components/schedules/ScheduleContainer";
import BatchScheduleGenerator from "./components/BatchScheduleGenerator";

function App() {
  // Schedule data for each batch
  const batchArray = [
    { name: "ftbc7", content: ftbc7 },
    { name: "ftbc8", content: ftbc8 },
    { name: "ptbc1", content: ptbc1 },
    { name: "ptbc2", content: ptbc2 },
    { name: "ptbc4", content: ptbc4 },
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
