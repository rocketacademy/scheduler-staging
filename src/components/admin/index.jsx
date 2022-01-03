import React from 'react';
import { Route, Switch, Link, useRouteMatch, Redirect } from "react-router-dom";
import TabsContainer from './Tabs';
import logo from "../../assets/4-MILK.png";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function Admin({batchArray}) {

  let { path, url } = useRouteMatch();

  return (
    <>
      <Navbar variant="dark" bg="info">
        <Navbar.Brand href="#home">
          <img src={logo} alt="company logo"></img>
        </Navbar.Brand>
        <Nav className="me-auto">
              <Nav.Link as={Link} to={`${url}/base`}>
                base
              </Nav.Link>
              <Nav.Link as={Link} to={`${url}/batch`}>
                batch
              </Nav.Link>
        </Nav>
      </Navbar>
      <Switch>
        <Route path="/base">
        </Route>
        <Route path="/batch">
        </Route>
      </Switch>

      <TabsContainer batchArray={batchArray} />
    </>
  );
}

export default Admin;
