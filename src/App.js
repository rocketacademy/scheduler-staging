import React from 'react';
import {
  HashRouter,
  Switch,
  Route,
} from 'react-router-dom';
import TabsContainer from './components/admin/Tabs';
import ftbc6 from './data/10-01-2022_01-07-2022_FTBC6.json';
import ftbc7 from './data/28-03-2022_15-09-2022_FTBC7.json';
import ftbc7New from './data/28-03-2022_15-09-2022_FTBC7 (v1.1).json';
import ptbc1 from './data/17-08-2021_13-08-2022_PTBC1.json';
import ptbc2 from './data/16-11-2021_12-11-2022_PTBC2.json';
import ptbc3 from './data/12-03-2022_18-02-2023_PTBC3.json';
import ptbc3New from './data/12-03-2022_18-02-2023_PTBC3 (v1.1).json';

import ScheduleContainer from './components/schedules/ScheduleContainer';

function App() {
  // put all batch data files in an array to be passed into separate components for /schedule and /admin
  const batchArray = [
    { name: 'ptbc1', content: ptbc1 },
    { name: 'ptbc2', content: ptbc2 },
    { name: 'ptbc3', content: ptbc3 },
    { name: 'ptbc3New', content: ptbc3New },
    { name: 'ftbc6', content: ftbc6 },
    { name: 'ftbc7', content: ftbc7 },
    { name: 'ftbc7New', content: ftbc7New }];

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
