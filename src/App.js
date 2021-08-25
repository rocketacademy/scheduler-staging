import React from 'react';
// import './sass/App.scss';
// import 'bootstrap/dist/css/bootstrap.min.css';
import TabsContainer from './components/Tabs';
import {
  BrowserRouter as Router,
  HashRouter,
  Switch,
  Route,
} from "react-router-dom";
import ScheduleContainer from './components/ScheduleContainer';

function App() {
  return (
    <div className="App">
      {/* <BatchSchedule /> */}
      <HashRouter>
        <Switch>
          <Route path="/admin">
            <TabsContainer />
          </Route>
          <Route path="/schedules">
            <ScheduleContainer />
          </Route>
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
