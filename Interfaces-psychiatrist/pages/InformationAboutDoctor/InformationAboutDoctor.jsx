import React, { useState, useEffect } from "react";
import axios from "axios";
import "./InformationAboutDoctor.css";

function InformationAboutDoctor() {
  const [myProfile, setMyProfile] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [birth, setBirth] = useState("");
  const [gender, setGender] = useState("");
  const [years_experience, setYears_experience] = useState("");
  const [details, setDetails] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [img, setImg] = useState("");
  useEffect(() => {
    fetchProfile();
  }, []);
  function getCookie(cookieName) {
    let cookie = {};
    document.cookie.split(";").forEach(function (el) {
      let [key, value] = el.split("=");
      cookie[key.trim()] = value;
    });
    return cookie[cookieName];
  }
  const fetchProfile = async () => {
    await axios
      .get(
        "http://127.0.0.1:8000/api/show-psychiatrist?token=" +
          getCookie("token")
      )
      .then(({ data }) => {
        setMyProfile(data.user);
        setName(data.user.name);
        setYears_experience(data.years_experience);
        setDetails(data.details);
        setSpecialization(data.specialization);
        setEmail(data.user.email);
        setBirth(data.user.birth_date);
        setPhone(data.user.phone);
        setGender(data.user.gender);
        setImg(data.user.img);
      });
  };
  const updateProfile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phone", phone);
    formData.append("birth_date", birth);
    formData.append("gender", gender);
    formData.append("years_experience", years_experience);
    formData.append("details", details);
    formData.append("specialization", specialization);
    formData.append("token", getCookie("token"));

    console.log(formData);
    await axios
      .post("http://127.0.0.1:8000/api/update-psychiatrist", formData)
      .then(({ data }) => {
        console.log(data);
        setMyProfile(data);
      });
  };

  const updateImage = async (e) => {
    const formData = new FormData();
    formData.append("img", e.target.files[0]);
    formData.append("token", getCookie("token"));
    await axios
      .post("http://127.0.0.1:8000/api/auth/updateImage", formData)
      .then(({ data }) => {
        setImg(data);
        console.log(data);
      });
  };
  const url = "http://127.0.0.1:8000/files/";
  return (
    <>
      <br />
      <br />
      <div className="card-body">
        <div className="container mt-3">
          <h3 className="text-primary">Edit profile </h3>
          <hr style={{ width: 100 + "%", color: "black" }} />
          <h5 size="50" className="text-primary">
            Basic details :
          </h5>
          <div className="d-flex">
            <div className="col">
              <div className="card h-100">
                <center>
                  <img src={url + img} width="200" alt="..." height="200" />
                  <label
                    className="btn btn-primary d-block "
                    htmlFor="imgProfile"
                    style={{ width: 150 + "px" }}
                  >
                    {" "}
                    Change Image{" "}
                  </label>
                  <input
                    type="file"
                    onChange={updateImage}
                    id="imgProfile"
                    hidden
                  />
                  <div className="card-body">
                    <h5 className="card-title">
                      <strong className="text-primary">
                        {" "}
                        {myProfile.name}
                      </strong>
                    </h5>
                    <p className="card-text">{myProfile.email}</p>
                  </div>
                </center>
              </div>
            </div>
            <table cellPadding="10">
              <tr>
                <td>
                  <strong> Name </strong> <br />
                  <input
                    type="text"
                    className="btn-outline"
                    placeholder="name"
                    style={{ width: 350 + "px", height: 40 + "px" }}
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </td>
                <td>
                  <strong>Email </strong> <br />
                  <input
                    type="text"
                    className="btn-outline"
                    placeholder="Doctor@gmail.com"
                    style={{ width: 350 + "px", height: 40 + "px" }}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Phone</strong> <br />
                  <input
                    type="text"
                    className="btn-outline"
                    placeholder="010"
                    style={{ width: 350 + "px", height: 40 + "px" }}
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                  />
                </td>
                <td>
                  <strong>BirthDate</strong> <br />
                  <input
                    type="date"
                    className="btn-outline"
                    placeholder="mm/dd/yyyy"
                    value={birth}
                    style={{ width: 350 + "px", height: 40 + "px" }}
                    onChange={(e) => {
                      setBirth(e.target.value);
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Password</strong> <br />
                  <input
                    type="password"
                    className="btn-outline"
                    placeholder="Change Your Password.."
                    style={{ width: 350 + "px", height: 40 + "px" }}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </td>
                <td>
                  <strong>Gender</strong> <br />
                  <select
                    className="btn-outline"
                    style={{ width: 350 + "px", height: 40 + "px" }}
                    value={gender}
                    onChange={(e) => {
                      setGender(e.target.value);
                    }}
                  >
                    <option value="m">Male</option>
                    <option value="f">Female</option>
                  </select>
                </td>
              </tr>
            </table>
          </div>
          <br />
          <hr style={{ width: 100 + "%", color: "black" }} />
          <div className=" d-inline-block">
            <strong> specialization</strong> <br />
            <input
              type="text"
              className="btn-outline"
              placeholder="specialization"
              value={specialization}
              onChange={(e) => {
                setSpecialization(e.target.value);
              }}
              style={{ width: 350 + "px", height: 40 + "px" }}
            />
          </div>
          <div className="ms-5 d-inline-block">
            <strong>Years of Experience : </strong> <br />
            <input
              type="number"
              className="btn-outline"
              style={{ width: 350 + "px", height: 40 + "px" }}
              value={years_experience}
              onChange={(e) => {
                setYears_experience(e.target.value);
              }}
            />
          </div>
          <br />

          <strong>More details : </strong>
          <textarea
            cols="150"
            rows="3"
            value={details}
            onChange={(e) => {
              setDetails(e.target.value);
            }}
          ></textarea>
          <div
            onClick={updateProfile}
            className="btn btn-outline-primary"
            style={{ width: 100 + "px" }}
          >
            SAVE
          </div>
        </div>
      </div>
    </>
  );
}


export default InformationAboutDoctor;
