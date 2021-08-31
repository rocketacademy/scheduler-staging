import React, { useState } from "react";
import logo from "../assets/4-MILK.png";
import { Route, Switch, Link, useRouteMatch, Redirect } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Tab from "react-bootstrap/Tab";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import BatchSchedule from "./BatchSchedule";
import ptbc1 from "../data/16-08-2021_10-10-2022_BATCH1.json";
import ftbc3 from "../data/12-04-2021_23-09-2021_BATCH3.json";
import ftbc4 from "../data/12-07-2021_22-12-2021_BATCH4.json";

function ScheduleContainer() {
  const [key, setKey] = useState("PTBC1");
  let { path, url } = useRouteMatch();

  // pass individual batch json files into BatchSchedule to generate schedules
  return (
    <>
      <Nav
        variant="tabs"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Nav.Item>
          <Nav.Link eventKey="FTBC3">
            <Link to={`${url}/ftbc3`}>FTBC 3</Link>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="FTBC4">
            <Link to={`${url}/ftbc4`}>FTBC 4</Link>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="PTBC1">
            <Link to={`${url}/ptbc1`}>PTBC 1</Link>
          </Nav.Link>
        </Nav.Item>
      </Nav>
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
          <Redirect to={`${path}/ftbc3`} />
        </Route>
        <Route path={`${path}/ftbc3`}>
          <BatchSchedule data={ftbc3} title="FTBC 3" />
        </Route>
        <Route path={`${path}/ptbc1`}>
          <BatchSchedule data={ptbc1} title="PTBC 1" />
        </Route>
        <Route path={`${path}/ftbc4`}>
          <BatchSchedule data={ftbc4} title="FTBC 4" />
        </Route>
      </Switch>
    </>
  );
}

export default ScheduleContainer;
