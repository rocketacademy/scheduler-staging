import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";

import ftbc6 from "./data/10-01-2022_01-07-2022_FTBC6.json";
import ftbc7 from "./data/28-03-2022_19-09-2022_FTBC7.json";
import ptbc1 from "./data/17-08-2021_26-07-2022_PTBC1.json";
import ptbc2 from "./data/16-11-2021_29-10-2022_PTBC2.json";
import ptbc3 from "./data/12-03-2022_11-03-2023_PTBC3.json";
import ptbc4 from "./data/14-05-2022_10-01-2023_PTBC4.json";

import ScheduleContainer from "./components/schedules/ScheduleContainer";
import TabsContainer from "./components/admin/Tabs";

function App() {
  // Create array of batch data for components for /schedule and /admin
  const batchArray = [
    { name: "ftbc6", content: ftbc6 },
    { name: "ftbc7", content: ftbc7 },
    { name: "ptbc1", content: ptbc1 },
    { name: "ptbc2", content: ptbc2 },
    { name: "ptbc3", content: ptbc3 },
    { name: "ptbc4", content: ptbc4 },
  ];

  return (
    <div className="App">
      <HashRouter>
        <Switch>
          {/* route that takes user to part of app that edits course schedules */}
          <Route path="/admin">
            <TabsContainer batchArray={batchArray} />
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
