import React, { Component } from "react";
import cardteam from "./cardTeam.module.css"
import logo from "../../../../../img/logo.png"
class CardTeam extends Component {
    render() {
        return (
          <div className="col-xl-3 col-sm-6 m-2" >
      <div className="bg-white rounded shadow-sm border py-5 px-4"><img
          src={logo} alt="" width="100"
          className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"/>
        <h5 className="mb-0">{this.props.name}</h5><span className="small text-uppercase text-muted">{this.props.po}</span>
        <ul className="social mb-0 c mt-3">
          <li className="list-inline-item"><a href="#" className={cardteam["social-link"]}><i className="fa fa-facebook-f"></i></a></li>
          <li className="list-inline-item"><a href="#" className={cardteam["social-link"]}><i className="fa fa-twitter"></i></a></li>
          <li className="list-inline-item"><a href="#" className={cardteam["social-link"]}><i className="fa fa-instagram"></i></a></li>
          <li className="list-inline-item"><a href="#" className={cardteam["social-link"]}><i className="fa fa-linkedin"></i></a></li>
        </ul>
      </div>
    </div>
        );
    }
}

export default CardTeam;