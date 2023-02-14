import React, { Component } from "react";
import css from "./CardAppointment.module.css";
import logo from "../../../../../img/logo.png";
import { Link } from "react-router-dom";
class CardAppointment extends Component {
  render() {
    return (
      <div className={css["w-45"]}>
        <br />
        <div className="appoint-card bg-white rounded-lg shadow overflow-hidden d-block d-lg-flex">
          <div
            className={
              css["appoint-card_images"] +
              " d-flex justify-content-center align-items-center"
            }
          >
            <img src={this.props.img} className="d-block" alt="appoint" width={150} height={150} />
          </div>
          <div className={css["appoint-card_info"] + " p-4"}>
            <div className="d-flex align-items-center justify-content-start  mb-2">
              <h5 className="mb-0 mr-2">{this.props.name}</h5>
            </div>
            <div className="d-flex justify-content-between align-items-end">
              <div className="appoint-card_details">
                <div className="text-muted mb-2">{this.props.specialty}</div>
                <ul className="appoint-checklist pl-0 mb-0">
                  <li>{this.props.ex} Years Experiance</li>
                  <li>{this.props.appoint} Appointment</li>
                  <li>{this.props.patient} Patient</li>
                </ul>
              </div>
              <div className="appoint-card_pricing text-center">
                <Link to={"/psychiatristProfile/"+this.props.id} className="btn btn-primary ">
                  View Scdule
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CardAppointment;
