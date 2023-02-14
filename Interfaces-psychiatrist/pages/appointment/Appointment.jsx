import React, { useState, useEffect } from "react";
import axios from "axios";
function Appointment()  {
  const [appointment, setAppointment] = useState([]);
useEffect(() => {
  fetchAppointments();
}, []);
function getCookie(cookieName) {
  let cookie = {};
  document.cookie.split(";").forEach(function (el) {
    let [key, value] = el.split("=");
    cookie[key.trim()] = value;
  });
  return cookie[cookieName];
}
const fetchAppointments = async () => {
  await axios
    .get("http://127.0.0.1:8000/api/my-apointments?token=" + getCookie("token"))
    .then(({ data }) => {
      setAppointment(data)
      console.log(data);
    });
};
const pay = async (id) => {
  await axios
    .post(
      "http://127.0.0.1:8000/api/pay?id=" +
        id +
        "&token=" +
        getCookie("token")
    )
    .then(({data}) => {
      fetchAppointments();
    });
};
const deleteAppointment = async (id) => {
  await axios
    .delete("http://127.0.0.1:8000/api/deleteAppointment?id=" + id)
    .then(({ data }) => {
      fetchAppointments();
    });
};
    return (
      <div className="container card p-5">
        <div className="row">
          <table
            id="example"
            className="table table-striped table-bordered"
            style={{ width: 100 + "%" }}
          >
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Submition-date</th>
                <th>Start-date</th>
                <th>status</th>
                <th>Price</th>
                <th>Status Pay</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {appointment.length > 0 &&
                appointment.map((row) => (
                  <tr>
                    <td>{row.patient_name}</td>
                    <td>{row.date_created}</td>
                    <td>{row.date}</td>
                    <td>{row.status}</td>
                    <td>{row.price}</td>
                    <td>
                      <div class="form-check form-switch">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="flexSwitchCheckChecked"
                          checked={(row.payment_way===true)?'true':'false'}
                          onChange={() => pay(row.id)}
                        />
                        <label
                          class="form-check-label"
                          for="flexSwitchCheckChecked"
                        >
                          Pay
                        </label>
                      </div>
                    </td>
                    <td>
                      <i
                        className="fa-solid fa-trash text-danger ps-2 h5"
                        onClick={() => deleteAppointment(row.id)}
                      ></i>
                    </td>
                  </tr>
                ))}
            </tbody>
            <tfoot>
              <tr>
                <th>Patient Name</th>
                <th>Submition-date</th>
                <th>Start-date</th>
                <th>status</th>
                <th>Price</th>
                <th>Status Pay</th>
                <th>Action</th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    );
  }

export default Appointment;
