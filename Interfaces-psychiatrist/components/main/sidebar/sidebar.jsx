import React, { Component } from "react";
import css from "./sidebar.module.css"
import Baymax from "../../../../../../img/logo.png";
import { Link } from "react-router-dom";

class Sidebar extends Component {
  render() {
    return (
      <>
        <nav className={css["sidebar"] + " mb-0"}>
          <div className="img bg-wrap text-center py-4">
            <div className="user-logo">
              <div>
                <img src={Baymax} alt="" className={css["img-logo"]} />
              </div>
              <h3>Baymax</h3>
            </div>
          </div>
          <ul className="list-unstyled components mb-0">
            <li>
              <Link to="/">
                {" "}
                <span className="fa-solid fa-gauge"></span> Dashboard{" "}
              </Link>
            </li>
            <li>
              <Link to="/appointment">
                <i className="fa-regular fa-calendar-check"></i> Apointments
              </Link>
            </li>
            <li>
              <Link to="/Patient">
                <i className="fa-solid fa-hospital-user"></i> Patient{" "}
              </Link>
            </li>
            <li>
              <Link to="/session">
                <i className="fa-regular fa-calendar"></i> Session
              </Link>
            </li>
            <li>
              <Link to="/artical">
                <i className="fa-solid fa-newspaper"></i> Article
              </Link>
            </li>
            <li>
              <Link to="/notification">
                <i className="fa-solid fa-bell"></i> notification
              </Link>
            </li>
            <li>
              <Link to="/chat">
                <i className="fa-sharp fa-solid fa-comment"></i> chat
              </Link>
            </li>
            <li>
              <Link to="/question">
                <i className="fa-solid fa-clipboard-question"></i> Questions
              </Link>
            </li>
            <li>
              <Link to="/settings">
                <i className="fa-solid fa-gear"></i> Settings
              </Link>
            </li>
            <li>
              <a href={"http://" + window.location.host + "/web"}>
                <span className="fa fa-sign-out mr-3"></span> Log Out
              </a>
            </li>
          </ul>
        </nav>
      </>
    );
  }
}

export default Sidebar;







