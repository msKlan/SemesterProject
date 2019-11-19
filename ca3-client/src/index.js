import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import apiFacade from "./apiFacade";
import { BrowserRouter as Router } from "react-router-dom";

const AppWithRouter = () => {
  return (
    <div style={{ marginLeft: "5%", marginRight: "5%" }}>
      <Router>
        <App apiFacade={apiFacade} />
      </Router>
    </div>
  );
};
ReactDOM.render(<AppWithRouter />, document.getElementById("root"));
