import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";

import ftbc9 from "./data/17-10-2022_23-02-2023_FTBC9.json";
import ftbc10 from "./data/30-01-2023_22-05-2023_FTBC10 (1).json";
import ftbc11 from "./data/20-03-2023_11-07-2023_FTBC11.json";
import ftbc12 from "./data/08-05-2023_29-08-2023_FTBC12.json";

import ptbc5 from "./data/30-08-2022_29-04-2023_PTBC5.json";
import ptbc6 from "./data/26-11-2022_29-07-2023_PTBC6.json";
import ptbc7 from "./data/18-03-2023_31-10-2023_PTBC7.json";
import ptbc8 from "./data/17-06-2023_23-01-2024_PTBC8.json";

import ScheduleContainer from "./components/schedules/ScheduleContainer";
import BatchScheduleGenerator from "./components/BatchScheduleGenerator";

function App() {
  const batchArray = [
    { name: "ftbc9", content: ftbc9 },
    { name: "ftbc10", content: ftbc10 },
    { name: "ftbc11", content: ftbc11 },
    { name: "ftbc12", content: ftbc12 },

    { name: "ptbc5", content: ptbc5 },
    { name: "ptbc6", content: ptbc6 },
    { name: "ptbc7", content: ptbc7 },
    { name: "ptbc8", content: ptbc8 },
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
