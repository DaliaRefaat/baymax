import React, { Component } from "react";
import logo from "../../../../../../img/logo.png";
import "./header.css";
import { Link } from 'react-router-dom';


class Header extends Component {
    render() {
        return (
          <nav
            className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top"
            id="mainNav"
          >
            <div className="container px-4">
              <a className="navbar-brand" href="#page-top">
                <img src={logo} alt="Logo" className="Logo-header" /> Baymax
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarResponsive"
                aria-controls="navbarResponsive"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav ms-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to="/">
                      <i className="fa-solid fa-house"></i> Home{" "}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/notification">
                      <i className="fa-regular fa-bell"></i> My Notifigation
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/profile">
                      <i className="fa-regular fa-user"></i> My Profile
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/MyAppointments">
                      <i className="fa-regular fa-calendar"></i> My Session
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/Artical">
                      <i className="fa-solid fa-file-invoice"></i> Artical
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/Questions">
                      <i className="fa-solid fa-clipboard-question"></i>{" "}
                      Question
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href={"http://" + window.location.host + "/web"}>
                      <i className="fa-solid fa-user"></i> logout
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        );
    }

}

export default Header;
