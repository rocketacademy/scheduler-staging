import React from 'react';
import {
  Route, Switch, Link, useRouteMatch, Redirect,
} from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../assets/4-MILK.png';
import BatchSchedule from './BatchSchedule';

function ScheduleContainer({ batchArray }) {
  const { url } = useRouteMatch();

  // pass individual batch json files into BatchSchedule to generate schedules
  return (
    <>
      <Navbar variant="dark" bg="secondary">
        <Navbar.Brand href="#home">
          <img src={logo} alt="company logo" />
        </Navbar.Brand>
        <Nav className="me-auto">
          {batchArray.map((batch) => (
            <Nav.Link as={Link} to={`${url}/${batch.name}`}>
              {batch.name.toUpperCase()}
            </Nav.Link>
          ))}
        </Nav>
      </Navbar>
      <Switch>
        <Route exact path="/">
          <Redirect to={`/${batchArray[0].name}`} />
        </Route>
        {batchArray.map((batch) => (

          <Route path={`/${batch.name}`}>
            <BatchSchedule
              data={batch.content}
              title={batch.name.toUpperCase()}
            />
          </Route>
        ))}
      </Switch>
    </>
  );
}

export default ScheduleContainer;
