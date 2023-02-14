import React, { useState, useEffect } from "react";
import axios from "axios";
import CardDashboard from "../../components/cardsDashboard/cardsDashboard";
import css from "./MyAppoint.module.css";
function Dashbord()  {
const [appointments, setAppointments] = useState([]);
const [appointCount, setAppointCount] = useState("0");
const [patientCount, setPatientCount] = useState("0");
const [todayCount, setTodayCount] = useState("0");
const [articals, setArticals] = useState("0");
useEffect(() => {
  fetchHome();
}, []);
function getCookie(cookieName) {
  let cookie = {};
  document.cookie.split(";").forEach(function (el) {
    let [key, value] = el.split("=");
    cookie[key.trim()] = value;
  });
  return cookie[cookieName];
}
const fetchHome = async () => {
  await axios
    .get(
      "http://127.0.0.1:8000/api/psychiatrist-home?token=" + getCookie("token")
    )
    .then(({ data }) => {
      console.log(data);
      setAppointCount(data.appointment);
      setArticals(data.articals);
      setPatientCount(data.patient);
      setTodayCount(data.todayAppointment);
      setAppointments(data.todayAppointmentCards);
    });
};
const deleteAppointment = async (id) => {
  await axios
    .delete("http://127.0.0.1:8000/api/deleteAppointment?id=" + id)
    .then(({ data }) => {
      fetchHome();
    });
};
const url = "http://127.0.0.1:8000/files/";
    return (
      <>
        <div className="row">
          <CardDashboard
            title="Appointments"
            nums={appointCount}
            icon="fas fa-calendar-check"
          />
          <CardDashboard
            title="today appointment"
            nums={todayCount}
            icon="fas fa-calendar-check"
          />
          <CardDashboard
            title="patient"
            nums={patientCount}
            icon="fas fa-user-injured"
          />
          <CardDashboard
            title="Artical"
            nums={articals}
            icon="fa-solid fa-file-lines"
          />
        </div>

        <h2 className="text-primary">Today Appointments</h2>
        <div className="row">
          {appointments.length > 0 &&
            appointments.map((row) => (
              <div className="col-sm-6 col-md-6 col-lg-4">
                <div className="card bg-white p-3 mb-4 shadow">
                  <div className="d-flex justify-content-between mb-4">
                    <div className={css["user-info"]}>
                      <div className={css["user-info__img"]}>
                        <img
                          src={url + row.patient_img}
                          alt="User Img"
                          width="100"
                        />
                      </div>
                      <div className="user-info__basic">
                        <h5 className="mb-0">{row.patient_name}</h5>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between mt-4">
                    <div>{row.date}</div>
                    <span className="font-weight-bold btn btn-danger" onClick={()=>deleteAppointment(row.id)}>
                      cancle
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </>
    );

}
export default Dashbord;
