import React,{ Component } from "react";
import { Link } from "react-router-dom";
import logo from "../../../../../../img/logo.png";
import header from  "./header.module.css";
class Header extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id={header.mainNav}>
                <div className="container px-4">
                    <a className="navbar-brand" href="#page-top"><img src={logo} alt="Logo" className={header["Logo-header"]} /> Baymax</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ms-auto">
                            <li className={header["nav-item"]}><Link className="nav-link" to="/"><i className="fa-solid fa-house"></i> Home </Link></li>
                            <li className={header["nav-item"]}><Link className="nav-link" to="/appointment"><i className="fa-regular fa-bell"></i> Apointments </Link></li>
                            <li className={header["nav-item"]}><Link className="nav-link" to="/Artical"><i className="fa-solid fa-file-invoice"></i> Artical</Link></li>
                            <li className={header["nav-item"]}><Link className="nav-link" to="/about"><i className="fa-regular fa-user"></i> About</Link></li>
                            <li className={header["nav-item"]}><Link className="nav-link" to="/team"><i className="fa-regular fa-calendar"></i> Team</Link></li>
                            <li className={header["nav-item"]}><Link className="nav-link" to="/question"><i className="fa-regular fa-calendar"></i> Question</Link></li>
                            <li className={header["nav-item"]}><Link className="nav-link" to="/signup"><i className="fa-solid fa-clipboard-question"></i> Signin</Link></li>
                            <li className={header["nav-item"]}><Link className="nav-link" to="/login"><i className="fa-solid fa-user"></i> Login</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Header;
