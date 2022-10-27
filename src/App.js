import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";

import ftbc9 from "./data/17-10-2022_23-02-2023_FTBC9.json";
import ftbc10 from "./data/16-01-2023_10-05-2023_FTBC10.json";
import ptbc6 from "./data/28-11-2022_03-08-2023_PTBC6.json";
import ptbc4 from "./data/14-05-2022_07-01-2023_PTBC4.json";
import ptbc5 from "./data/30-08-2022_29-04-2023_PTBC5.json";

import ScheduleContainer from "./components/schedules/ScheduleContainer";
import BatchScheduleGenerator from "./components/BatchScheduleGenerator";

function App() {
  // Schedule data for each batch
  const batchArray = [
    { name: "ftbc9", content: ftbc9 },
    { name: "ftbc10", content: ftbc10 },
    { name: "ptbc4", content: ptbc4 },
    { name: "ptbc5", content: ptbc5 },
    { name: "ptbc6", content: ptbc6 },
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
