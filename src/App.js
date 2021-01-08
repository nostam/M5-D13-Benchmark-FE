import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home";
import Exam from "./pages/Exam";
import Result from "./pages/Result";
function App() {
  return (
    <Router className="App">
      <div>
        <Route exact path="/exam" render={(props) => <Exam {...props} />} />
        <Route
          path="/result/:id"
          render={(props) => <Result {...props} />}
        />{" "}
        <Route exact path="/" render={(props) => <Home {...props} />} />
      </div>
    </Router>
  );
}

export default App;
