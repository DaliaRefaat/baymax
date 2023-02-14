import React, { Component } from "react";
import css from "./components/main/sidebar/sidebar.module.css"
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import {
  Sidebar,
  Dashbord,
  Appointment,
  Articals,
  EditPatient,
  PsychiatristProfile,
  Patient,
  Question,
  SessionAll,
  Psychiatrist,
  ShowArtical,
  Notification,
} from "./index";
class App extends Component {
  render() {
    const mystyle = {
      width: "calc(100% - 300px)",
      float: "right",
      marginTop : '-60px',
      padding : '0 20px'
    };
    return (
      <Router basename="/dashboard">
        <header>
          <div
            className={
              css["Header"] +
              " bg-primary d-flex align-items-start justify-content-between "
            }
          >
            <div className="text-white ps-4 pt-3 h2">Mohamed</div>
          </div>
        </header>
        <div className="pages" style={mystyle}>
          <Routes>
            <Route exact path="/" element={<Dashbord />} />
            <Route exact path="/Appointment" element={<Appointment />} />
            <Route exact path="/artical" element={<Articals />} />
            <Route exact path="/EditPatient/:id" element={<EditPatient />} />
            <Route exact path="/show-artical/:id" element={<ShowArtical />} />
            <Route
              exact
              path="/PsychiatristProfile/:id"
              element={<PsychiatristProfile />}
            />
            <Route exact path="/Patient" element={<Patient />} />
            <Route exact path="/Question" element={<Question />} />
            <Route exact path="/Session" element={<SessionAll />} />
            <Route exact path="/psychiatrist" element={<Psychiatrist />} />
            <Route exact path="/Notification" element={<Notification />} />
          </Routes>
        </div>
        <Sidebar />
      </Router>
    );
  }
}
export default App;
