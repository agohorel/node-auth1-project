import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Form } from "./components/Form";
import { TopSecret } from "./components/TopSecret";

function App() {
  return (
    <>
      <Router>
        <Route path="/login">
          <Form type="login"></Form>
        </Route>
        <Route path="/register">
          <Form type="register"></Form>
        </Route>
        <Route path="/top-secret">
          <TopSecret></TopSecret>
        </Route>
      </Router>
    </>
  );
}

export default App;
