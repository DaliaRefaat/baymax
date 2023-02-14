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
    .get("http://127.0.0.1:8000/api/myPatient?token=" + getCookie("token"))
    .then(({ data }) => {
      setMyPateint(data);
      console.log(data);
    });
};
const allowChat = async (id) => {
  await axios
    .post(
      "http://127.0.0.1:8000/api/allowChat?id="+id+"&token=" +
        getCookie("token")
    ).then(()=>{
      fetchPatient();
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
                <th>#</th>
                <th>Patient Name</th>
                <th>Submition-date</th>
                <th>allowChat</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {myPateint.length > 0 &&
                myPateint.map((row) => (
                  <tr>
                    <td>{i++}</td>
                    <td>{row.name}</td>
                    <td>{row.date}</td>
                    <td>
                      <div class="form-check form-switch">
  <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked={row.allow_chat}onChange={() => allowChat(row.id)}/>
  <label class="form-check-label" for="flexSwitchCheckChecked">Allow</label>
</div>

                    </td>
                    <td>
                      <Link to={"/EditPatient/"+row.id}>
                        <i className="fa-solid fa-eye text-success  h5"></i>
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
            <tfoot>
              <tr>
                <th>#</th>
                <th>Patient Name</th>
                <th>Submition-date</th>
                <th>allowChat</th>
                <th>Action</th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    );

}
export default Patient;
