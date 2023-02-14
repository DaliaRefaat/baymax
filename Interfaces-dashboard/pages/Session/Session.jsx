import React, { useState, useEffect } from "react";
import axios from "axios";
function SessionAll() {
  const [session,setSession ] = useState('');
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  useEffect(() => {
    fetchSessions();
  }, []);
  function getCookie(cookieName) {
    let cookie = {};
    document.cookie.split(";").forEach(function (el) {
      let [key, value] = el.split("=");
      cookie[key.trim()] = value;
    });
    return cookie[cookieName];
  }
  const fetchSessions = async () => {
    await axios
      .get("http://127.0.0.1:8000/api/allSession")
      .then(({ data }) => {
        setSession(data);
        console.log(data);
      });
  };
  const deleteSession = async (id) => {
    await axios
    .delete(
      "http://127.0.0.1:8000/api/delete-session?token=" + getCookie("token") + "&id="+id
      )
      .then(() => {
        fetchSessions();
      });
  };

  return (
    <>
      <div className="container card p-5">
        <div className="row">
          <table
            id="example"
            className="table table-striped table-bordered"
            style={{ width: 100 + "%" }}
          >
            <thead>
              <tr>
                <th>psychiatrist Name</th>
                <th>Day</th>
                <th>start-Time</th>
                <th>Duration</th>
                <th>price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {session.length > 0 &&
                session.map((row) => (
                  <tr>
                    <td>{row.psychiatristName}</td>
                    <td>{days[row.day]}</td>
                    <td>{row.time}</td>
                    <td>{row.duration}</td>
                    <td>{row.price}$</td>
                    <td>
                      <i
                        className="fa-solid fa-trash text-danger ps-3"
                        onClick={() => deleteSession(row.id)}
                      ></i>
                    </td>
                  </tr>
                ))}
            </tbody>
            <tfoot>
              <tr>
                <th>psychiatrist Name</th>
                <th>Day</th>
                <th>start-Time</th>
                <th>Duration</th>
                <th>price</th>
                <th>Action</th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </>
  );
}
export default SessionAll;
