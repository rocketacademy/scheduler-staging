import React, { useState, useEffect } from "react";
import { NavLink, Route, Switch, Link, useRouteMatch, Redirect } from "react-router-dom";
import TabsContainer from './Tabs';
import logo from "../../assets/4-MILK.png";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import DataShift from "./data-shift/DataShift";
import GenerateDataShiftContent from "./GenerateDataShiftContent";

/*
 * This component wraps generate data shift
 * (generateDataShift) component
 * it is for the base schedule
 */
const BaseContainer = ({ batchArray }) => {
  const [key, setKey] = useState("datePicker");

  // remains empty until user picks/ generates schedule to edit. this is the days section of the batch data file
  const [batchDays, setBatchDays] = useState({});
  // this is the whole data file
  const [batchFile, setBatchFile] = useState({});

  // this is the main bootcamp data json file that has not been mapped onto any dates
  const [mainFile, setMainFile] = useState();
  // this is the course days section of the bootcamp data json file
  const [mainDays, setMainDays] = useState();
  // helper function for setting state (mainFile)
  const setDaysInMainFile = (mainDays) => {
    setMainFile({ ...mainFile, days: mainDays });
  };

  // helper function for setting state (batchFile)
  const setDaysInBatchFile = (batchDays) => {
    setBatchFile({ ...batchFile, days: batchDays });
  };

  return (
          <GenerateDataShiftContent
            bootcampData={mainDays}
            setBootcampData={setMainDays}
            mainFile={mainFile}
            setMainFile={setMainFile}
            mainDays={mainDays}
            setMainDays={setMainDays}
            setDaysInBatchFile={setDaysInBatchFile}
            setDaysInMainFile={setDaysInMainFile}
            batchArray={batchArray}
          />
  );
};

function Admin({batchArray}) {

  let { path, url } = useRouteMatch();

  return (
    <>
      <Navbar variant="dark" bg="info">
        <Navbar.Brand href="#home">
          <img src={logo} alt="company logo"></img>
        </Navbar.Brand>
        <Nav className="me-auto">
              <Nav.Link
                as={NavLink}
                to={`/admin/base`}
              >
                base
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to={`/admin/batch`}
              >
                batch
              </Nav.Link>
        </Nav>

        <Nav className="">
          <Nav.Link as={Link} to="/">
            schedules
          </Nav.Link>
        </Nav>
      </Navbar>
      <Switch>

        <Route path={`${path}/batch`}>
          <DataShift batchArray={batchArray} />
        </Route>
        <Route path={`${path}/base`}>
          <BaseContainer batchArray={batchArray} />
        </Route>
      </Switch>

    </>
  );
}

export default Admin;
