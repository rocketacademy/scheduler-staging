import React from 'react';
import TabsContainer from './components/admin/Tabs';
import ptbc1 from '../src/data/21-08-2021_10-10-2022_BATCH1.json';
import ftbc3 from '../src/data/12-04-2021_23-09-2021_BATCH3.json';
import ftbc4 from '../src/data/12-07-2021_22-12-2021_BATCH4.json';
import ptbc2 from '../src/data/15-11-2021_21-01-2023_BATCH2.json';
import ftbc5 from '../src/data/04-10-2021_24-03-2022_BATCH5.json';

import {
  HashRouter,
  Switch,
  Route,
} from "react-router-dom";
import ScheduleContainer from './components/schedules/ScheduleContainer';

function App() {

  // put all batch data files in an array to be passed into separate components for /shedule and /admin
  const batchArray = [{name:"ptbc1", content: ptbc1}, {name:"ptbc2", content: ptbc2}, {name: "ftbc3", content: ftbc3}, {name: "ftbc4", content: ftbc4}, {name:"ftbc5", content: ftbc5}];

  return (
    <div className="App">
        <HashRouter>
          <Switch>
            {/* route that takes user to part of app that edits course schedules */}
            <Route path="/admin">
              <TabsContainer batchArray={batchArray} />
            </Route>
            {/* route that takes user to part of app that displays batch schedules for student use */}
            <Route path="/schedules">
              <ScheduleContainer batchArray={batchArray} />
            </Route>
          </Switch>
        </HashRouter>
    </div>
  );
}

export default App;
