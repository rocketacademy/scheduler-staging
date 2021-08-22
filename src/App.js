import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TabsContainer from './components/Tabs';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import ScheduleContainer from './components/ScheduleContainer';

function App() {
  return (
    <div className="App">
      {/* <BatchSchedule /> */}
      <Router>
        <Switch>
          <Route path="/admin">
            <TabsContainer />
          </Route>
          <Route path="/schedules">
            <ScheduleContainer />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
