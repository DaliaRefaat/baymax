import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "@progress/kendo-theme-default/dist/all.css";
import css from "./psychiatristProfile.module.css";
import Comment from "./../../components/comment/comment";
import AppintDetail from "../../components/appintDetail/appintDetail";
import logo from "../../../../../img/logo.png";
function PsychiatristProfile() {
  const { id } = useParams();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [profile, setProfile] = useState([]);
  const [user, setUser] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [review, setReview] = useState([]);
    const [day, setDay] = useState("");
    const [time, setTime] = useState("");
    const [duration, setDuration] = useState("");
    const [price, setPrice] = useState("");

  useEffect(() => {
    fetchProfile(id);
  }, [id]);

  const fetchProfile = async (id) => {
    await axios
      .get("http://127.0.0.1:8000/api/show-psychiatrist?id=" + id)
      .then(({ data }) => {
        setProfile(data);
        setUser(data.user);
        setSessions(data.sessions);
        setReview(data.review);
      });
  };
  const creatSession = async () => {
    const formData = new FormData();
    formData.append("day", day);
    formData.append("time", time);
    formData.append("duration", duration);
    formData.append("price", price);
    formData.append("psychiatrist_id", id);
    await axios
      .post("http://127.0.0.1:8000/api/insert-session", formData)
      .then(() => {
        fetchProfile(id);
      });
  };
  const url = "http://127.0.0.1:8000/files/";
  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <div className="jumbotron jumbotron-fluid">
        <div className="container" style={{ width: 110 + "rem" }}>
          <div className="media border p-2 d-flex">
            <div className="info w-50">
              <img
                src={logo}
                className="rounded-circle"
                alt="Cinque trere"
                width="203"
                height="174"
              />
              <div className="media-body">
                <h4>
                  <u>
                    <b> {user.name}</b>
                  </u>
                </h4>
                <p>
                  <b> {profile.specialization}</b>
                </p>
              </div>
            </div>
            <div className="container rounded w-50">
              <div className="h2 m-2 font-weight-bold">
                Sessions
                <button
                  type="button"
                  className="btn btn-primary  ms-4"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                >
                  Create Session
                </button>
              </div>

              <div className="table-responsive">
                <table className={css["table"] + " w-100"}>
                  <thead>
                    <tr>
                      <th scope="col">Day</th>
                      <th scope="col">Time</th>
                      <th scope="col">Price</th>
                      <th scope="col">durasion</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sessions.length > 0 &&
                      sessions.map((row) => (
                        <AppintDetail
                          key={row.id}
                          day={days[row.day]}
                          time={row.time}
                          price={row.price}
                          durasion={row.duration}
                        />
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <div className="container">
        <h3 className="d-inline-block">About the expert</h3>
        <p>{profile.details}</p>
        <br />
      </div>
      <div className="container mt-3">
        <h3>Reviews</h3>
        {review.length > 0 &&
          review.map((row) => (
            <Comment name={row.patient} img={url+row.img} comment={row.rate} />
          ))}
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

                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={creatSession}
                >
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

export default PsychiatristProfile;
