import React from 'react';
import TabsContainer from './components/admin/Tabs';
import ptbc1 from '../src/data/17-08-2021_13-08-2022_BATCH1.json';
import ptbc2 from '../src/data/16-11-2021_12-11-2022_BATCH2.json';
import ftbc5 from '../src/data/04-10-2021_25-03-2022_BATCH5.json';
import ftbc6 from '../src/data/10-01-2022_01-07-2022_BATCH6.json';
import ftbc7 from '../src/data/28-03-2022_15-09-2022_BATCH7.json';
import ptbc3 from '../src/data/12-03-2022_17-01-2023_BATCH3.json';

import {
  HashRouter,
  Switch,
  Route,
} from "react-router-dom";
import ScheduleContainer from './components/schedules/ScheduleContainer';

function App() {

  // put all batch data files in an array to be passed into separate components for /shedule and /admin
  const batchArray = [{name:"ptbc1", content: ptbc1}, {name:"ptbc2", content: ptbc2}, {name:"ptbc3", content: ptbc3}, {name:"ftbc5", content: ftbc5}, {name:"ftbc6", content: ftbc6}, {name:"ftbc7", content: ftbc7}];

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
