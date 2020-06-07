import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";

import Todo from "./components/pages/Todo";
import Home from "./components/pages/Home";
import NavBar from "./components/composites/NavBar";

const Wrapper = styled.div`
  margin: auto;
  text-align: center;
  max-width: 600px;
  display: flex;
  justify-content: center;
  padding: 30px 2%;
  width: 96%;
`;

function App() {
  return (
    <Router>
      <Fragment>
        <NavBar />
        <Wrapper>
          <Switch>
            <Route path="/">
              <Todo />
            </Route>
            <Route path="/auth">
              <Home />
            </Route>
          </Switch>
        </Wrapper>
      </Fragment>
    </Router>
  );
}

export default App;
