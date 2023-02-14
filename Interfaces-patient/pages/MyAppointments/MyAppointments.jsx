import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "../../../../../img/logo.png";
import css from "./MyAppoint.module.css";
function MyAppointments(){
const [myAppoint, setMyAppoint] = useState([]);
useEffect(() => {
  fetchAppoint();
}, []);
function getCookie(cookieName) {
  let cookie = {};
  document.cookie.split(";").forEach(function (el) {
    let [key, value] = el.split("=");
    cookie[key.trim()] = value;
  });
  return cookie[cookieName];
}
const fetchAppoint = async () => {
  await axios
    .get(
      "http://127.0.0.1:8000/api/my-apointments?token="+getCookie("token")
    )
    .then(({ data }) => {
      setMyAppoint(data);
      console.log(data);
    });
};
const deleteAppointment = async (id) => {
  await axios
    .delete("http://127.0.0.1:8000/api/deleteAppointment?id=" + id)
    .then(({ data }) => {
      fetchAppoint();
    });
};
const url = "http://127.0.0.1:8000/files/";
    return (
      <div className="container " style={{ marginTop: 6 + "%" }}>
        <div className="row">
          {myAppoint.length > 0 &&
            myAppoint.map((row) => (
              <div className="col-sm-6 col-md-6 col-lg-4">
                <div className="card bg-white p-3 mb-4 shadow">
                  <div className="d-flex justify-content-between mb-4">
                    <div className={css["user-info"]}>
                      <div className={css["user-info__img"]}>
                        <img
                          src={url + row.img_psychiatrist}
                          alt="User Img"
                          width="100"
                        />
                      </div>
                      <div className="user-info__basic">
                        <h5 className="mb-0">{row.psychiatrist}</h5>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between mt-4">
                    <div>
                      <h5 className="mb-0">{row.date}</h5>
                    </div>
                    <span
                      className="font-weight-bold btn btn-danger"
                      onClick={()=>deleteAppointment(row.id)}
                    >
                      cancle
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
}

export default MyAppointments;
