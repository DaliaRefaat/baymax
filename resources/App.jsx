import React, { Component } from "react";
import { default as Website } from "./js/Interfaces/website/App";
import { default as Patient } from "./js/Interfaces/patient/App";
import { default as Psychiatrist } from "./js/Interfaces/psychiatrist/App";
import { default as Dashboard } from "./js/Interfaces/dashboard/App";
// import "./css/libs/bootstrap/bootstrap-grid.css";
import "./css/main/colorsVars.css";
import "https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js";
class App extends Component {
  render() {
    return (
      <>
        <Website />
        <Patient />
        <Psychiatrist />
        <Dashboard />
      </>
    );
  }
}
export default App;
