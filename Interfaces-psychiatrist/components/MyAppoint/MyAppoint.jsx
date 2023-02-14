import React, { Component } from "react";
import logo from "../../../../../img/logo.png";
import css from "./MyAppoint.module.css"
class MyAppoint extends Component {
  render() {
    return (
      <div className="col-sm-6 col-md-6 col-lg-4">
        <div className="card bg-white p-3 mb-4 shadow">
          <div className="d-flex justify-content-between mb-4">
            <div className={css["user-info"]}>
              <div className={css["user-info__img"]}>
                <img src={logo} alt="User Img" width="100" />
              </div>
              <div className="user-info__basic">
                <h5 className="mb-0">{this.props.patient}</h5>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between mt-4">
            <div>
              {this.props.date}
            </div>
            <span className="font-weight-bold btn btn-danger">cancle</span>
          </div>
        </div>
      </div>
    );
  }
}

export default MyAppoint;
