import React, { useState, useEffect } from "react";
import axios from "axios";
function Session() {
  const [session,setSession ] = useState('');
  const [day,setDay ] = useState('');
  const [time,setTime ] = useState('');
  const [duration, setDuration] = useState('');
  const [price,setPrice ] = useState('');
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
      .get(
        "http://127.0.0.1:8000/api/psychiatrist-session?token=" +
          getCookie("token")
      )
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

  const creatSession = async () => {
    const formData = new FormData();
    formData.append("day", day);
    formData.append("time", time);
    formData.append("duration", duration);
    formData.append("price", price);
    formData.append("token", getCookie("token"));
    await axios
      .post(
        "http://127.0.0.1:8000/api/insert-session",formData
      )
      .then(() => {
        fetchSessions();
      });
  };
  return (
    <>
      <div className="container card p-5">
        <button
          type="button"
          className="btn btn-primary w-25 mb-4"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
        >
          Create Session
        </button>
        <div className="row">
          <table
            id="example"
            className="table table-striped table-bordered"
            style={{ width: 100 + "%" }}
          >
            <thead>
              <tr>
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
                    <td>{days[row.day]}</td>
                    <td>{row.time}</td>
                    <td>{row.duration}</td>
                    <td>{row.price}$</td>
                    <td>
                      <i className="fa-solid fa-trash text-danger ps-3" onClick={()=>deleteSession(row.id)}></i>
                    </td>
                  </tr>
                ))}
            </tbody>
            <tfoot>
              <tr>
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
                  Enter Details for Your Session
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <label htmlFor="exampleDataList" className="form-label">
                  Enter Day
                </label>
                <select
                  className="form-control"
                  onChange={(e) => {
                    setDay(e.target.value);
                  }}
                >
                  <option value="0">sun</option>
                  <option value="1">mon</option>
                  <option value="2">thu</option>
                  <option value="3">wen</option>
                  <option value="4">ser</option>
                  <option value="5">fri</option>
                  <option value="6">sat</option>
                </select>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    start Time
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    id="exampleFormControlInput1"
                    onChange={(e) => {
                      setTime(e.target.value);

                    }}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Duration
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="exampleFormControlInput1"
                    onChange={(e) => {
                      setDuration(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Price ($)
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="exampleFormControlInput1"
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                  />
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

                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={creatSession}>
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Session;
