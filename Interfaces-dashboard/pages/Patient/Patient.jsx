import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function Patient()  {
  let i = 1;
const [myPateint, setMyPateint] = useState([]);
useEffect(() => {
  fetchPatient();
}, []);
function getCookie(cookieName) {
  let cookie = {};
  document.cookie.split(";").forEach(function (el) {
    let [key, value] = el.split("=");
    cookie[key.trim()] = value;
  });
  return cookie[cookieName];
}
const fetchPatient = async () => {
  await axios
    .get("http://127.0.0.1:8000/api/patientAll?token=" + getCookie("token"))
    .then(({ data }) => {
      setMyPateint(data);
      console.log(data);
    });
};
 const [name, setName] = useState("");
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [phone, setPhone] = useState("");
 const [birthDate, setBirthDate] = useState("");
 const [gender, setGender] = useState("");
 const AddUser = async (e) => {
   e.preventDefault();
   const formData = new FormData();
   formData.append("name", name);
   formData.append("email", email);
   formData.append("password", password);
   formData.append("phone", phone);
   formData.append("birth_date", birthDate);
   formData.append("gender", gender);
   formData.append("type", "patient");
   console.log(formData);
   await axios
     .post("http://127.0.0.1:8000/api/auth/register", formData)
     .then(({ data }) => {
       fetchPatient();
       alert("Done");
     })
     .catch(({ response }) => {
       console.log("====================================");
       console.log(response);
       console.log("====================================");
     });
 };



    return (
      <div className="container card p-5">
        <button
          type="button"
          className="btn btn-primary w-25 mb-4"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
        >
          Add Patient
        </button>
        <div className="row">
          <table
            id="example"
            className="table table-striped table-bordered"
            style={{ width: 100 + "%" }}
          >
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Submition-date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {myPateint.length > 0 &&
                myPateint.map((row) => (
                  <tr>
                    <td>{i++}</td>
                    <td>{row.user.name}</td>
                    <td>{row.user.email}</td>
                    <td>{row.user.phone}</td>
                    <td>
                      {new Date(row.user.created_at).toLocaleString()}
                    </td>
                    <td>
                      <Link to={"/EditPatient/" + row.id}>
                        <i className="fa-solid fa-eye text-success  h5"></i>
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
            <tfoot>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Submition-date</th>
                <th>Action</th>
              </tr>
            </tfoot>
          </table>
        </div>
        <div className="container">
          <div
            className="modal fade  "
            id="staticBackdrop"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="staticBackdropLabel">
                    Enter Details for New Patient
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput1"
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleFormControlInput1"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="exampleFormControlInput1"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      Phone
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput1"
                      onChange={(e) => {
                        setPhone(e.target.value);
                      }}
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      BirthDate
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="exampleFormControlInput1"
                      onChange={(e) => {
                        setBirthDate(e.target.value);
                      }}
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      Gender
                    </label>
                    <select
                      className="form-control"
                      id="exampleFormControlInput1"
                      onChange={(e) => {
                        setGender(e.target.value);
                      }}
                    >
                      <option></option>
                      <option value="m">Male</option>
                      <option value="f">Female</option>
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-dismiss="modal"
                    onClick={AddUser}
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

}
export default Patient;
