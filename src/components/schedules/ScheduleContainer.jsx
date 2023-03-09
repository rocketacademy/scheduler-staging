import React, { useState } from "react";
import { Route, Switch, Link, Redirect } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../../assets/4-MILK.png";
import BatchSchedule from "./BatchSchedule";

import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

function ScheduleContainer({ batchArray }) {
  // pass individual batch json files into BatchSchedule to generate schedules
  console.log("batch array", batchArray);
  console.log("current path", window.location.href);

  const [navBarBatch, setNavBarBatch] = useState("Choose your batch");

  return (
    <>
      <Navbar variant="dark" bg="secondary">
        <Navbar.Brand href="#home">
          <img src={logo} alt="company logo" />
        </Navbar.Brand>
        <Nav className="me-auto">
          {/* added dropdown button and drop down item.  */}
          <DropdownButton menuVariant="dark" title={navBarBatch}>
            {batchArray.map((batch) => (
              <Dropdown.Item key={`batch`}>
                <Nav.Link
                  as={Link}
                  to={`/${batch.name}`}
                  onClick={() => setNavBarBatch(batch.name.toUpperCase())}
                >
                  {batch.name.toUpperCase()}
                </Nav.Link>
              </Dropdown.Item>
            ))}
          </DropdownButton>
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
