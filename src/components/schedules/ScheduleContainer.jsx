import React from "react";
import { Route, Switch, Link, useRouteMatch, Redirect } from "react-router-dom";
import logo from "../../assets/4-MILK.png";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import BatchSchedule from "./BatchSchedule";

function ScheduleContainer({ batchArray }) {
  let { path, url } = useRouteMatch();
  console.log("batch array", batchArray);
  // pass individual batch json files into BatchSchedule to generate schedules
  return (
    <>
      {/* backup navbar  */}
      <Navbar variant="dark" bg="secondary">
        <Navbar.Brand href="#home">
          <img src={logo} alt="company logo"></img>
        </Navbar.Brand>
        <Nav className="me-auto">
          {batchArray.map((batch) => {
            return (
              <Nav.Link as={Link} to={`${url}/${batch.name}`}>
                {batch.name.toUpperCase()}
              </Nav.Link>
            );
          })}
        </Nav>
      </Navbar>
      <Switch>
        <Route exact path={path}>
          <Redirect to={`${path}/${batchArray[0].name}`} />
        </Route>
        {batchArray.map((batch) => {
          return (
            <Route path={`${path}/${batch.name}`}>
              <BatchSchedule
                data={batch.content}
                title={batch.name.toUpperCase()}
              />
            </Route>
          );
        })}
      </Switch>
    </>
  );
}

export default ScheduleContainer;
