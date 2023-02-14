import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
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
              <div className="h2 m-0 font-weight-bold">Appointmens</div>
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
            <Comment
              name={row.patient}
              img={url + row.img}
              comment={row.rate}
            />
          ))}
      </div>
    </>
  );
}

export default PsychiatristProfile;
