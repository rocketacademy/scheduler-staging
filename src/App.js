import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TabsContainer from './components/Tabs';
import BatchSchedule from './components/BatchSchedule';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

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
            <BatchSchedule />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
