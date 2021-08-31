import React, { useState } from "react";
import { Route, Switch, Link, useRouteMatch, Redirect } from "react-router-dom";

import Nav from "react-bootstrap/Nav";
import BatchSchedule from "./BatchSchedule";

function ScheduleContainer({ batchArray }) {
  const [key, setKey] = useState("");
  let { path, url } = useRouteMatch();
  console.log("batch array", batchArray);
  // pass individual batch json files into BatchSchedule to generate schedules
  return (
    <>
      <Nav
        variant="tabs"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        {/* a tab is generated for each element in batch array  */}
        {batchArray.map((batch) => {
          return (
            <Nav.Item>
              <Nav.Link eventKey={batch.name}>
                <Link to={`${url}/${batch.name}`}>{batch.name}</Link>
              </Nav.Link>
            </Nav.Item>
          );
        })}
      </Nav>
      {/* backup navbar  */}
      {/* <Navbar variant="dark" bg="secondary">
        <Container>
          <Navbar.Brand href="#home">
            <img src={logo} alt="company logo"></img>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link>
              <Link to={`${url}/ftbc3`}>FTBC 3</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to={`${url}/ftbc4`}>FTBC 4</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to={`${url}/ptbc1`}>PTBC 1</Link>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar> */}
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
