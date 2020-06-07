import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Events from "./components/pages/Events";
import Form from "./components/pages/Form";
import { Provider } from "react-redux";
import store from "./store";
import Confirm from "./components/pages/Confirm";
import NavBar from "./components/NavBar";
import styled from "styled-components";

const Wrapper = styled.div`
  margin: auto;
  text-align: left;
  max-width: 600px;
  display: flex;
  justify-content: center;
  padding: 30px 2%;
  width: 96%;
`;

function App() {
  return (
    <Provider store={store}>
      <Router>
        <NavBar />
        <Wrapper>
          <Switch>
            <Route path="/event/:id/confirm">
              <Confirm />
            </Route>
            <Route path="/event/:id">
              <Form />
            </Route>
            <Route path="/">
              <Events />
            </Route>
          </Switch>
        </Wrapper>
      </Router>
    </Provider>
  );
}

export default App;
