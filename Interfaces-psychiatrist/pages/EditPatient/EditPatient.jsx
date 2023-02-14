import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function EditPatient() {
  const { id } = useParams();
  const [myProfile, setMyProfile] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birth, setBirth] = useState("");
  const [gender, setGender] = useState("");
  const [img, setImg] = useState("");
  const [myPrescription, setMyPrescription] = useState([]);
  const [myLabTest, setMyLabTest] = useState([]);
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
      .get("http://127.0.0.1:8000/api/show-patient?id=" + id)
      .then(({ data }) => {
        setMyProfile(data.user.user);
        setName(data.user.user.name);
        setEmail(data.user.user.email);
        setBirth(data.user.user.birth_date);
        setPhone(data.user.user.phone);
        (data.user.user.gender==='m')?setGender("Male"):setGender("Female");
        setImg(data.user.user.img);
        setMyPrescription(data.files.prescription);
        setMyLabTest(data.files.labTest);
        console.log(data);
      });
  };


  const [LabTest, setLabTest] = useState("");
  const changeHandler = (e) => {
    setLabTest(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const uploadLabTest = async (e) => {
    let file = document.querySelector(".uploadLabTest").value;
    if (file === "") {
      alert("Empty");
    } else {
      const formData = new FormData();
      formData.append("labTest", LabTest);
      formData.append("patient_id", id);
      formData.append("token", getCookie("token"));
      await axios
      .post("http://127.0.0.1:8000/api/patient-uploadLabTest", formData)
      .then(({ data }) => {
        setMyLabTest(data.labTest);
      });
    }
  };
  const [prescription, setPrescription] = useState("");
  const changeHandler2 = (e) => {
    setPrescription(e.target.files[0]);
  };
  const uploadPrescription = async (e) => {
    let file = document.querySelector(".uploadPrescription").value;
    if (file === "") {
      alert("Empty");
    } else {
      const formData = new FormData();
      formData.append("prescription", prescription);
      formData.append("patient_id", id);
      formData.append("token", getCookie("token"));
      await axios
      .post("http://127.0.0.1:8000/api/patient-uploadPrescription", formData)
      .then(({ data }) => {
          setMyPrescription(data.prescription);
          // alert(data);
        });
    }
  };
  const url = "http://127.0.0.1:8000/files/";
  return (
    <>
      <br />
      <br />
      <br />
      <h1>
        <strong className="text-primary">Profile Patient</strong>
      </h1>
      <div className="container rounded bg-white">
        <div className="row">
          <div className="col-md-4 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
              <img
                className="rounded-circle mt-5"
                src={url + img}
                width="100"
                height="100"
                alt="error"
              />
              <span className="font-weight-bold">{myProfile.name}</span>
              <span className="text-black-50">{myProfile.email}</span>
            </div>
          </div>
          <div className="col-md-8">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex flex-row align-items-center back"></div>
              </div>
              <div className="row mt-2">
                <div className="col-md-6">
                  <input
                    type="text"
                    value={name}
                    className="form-control"
                    readOnly
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="rext"
                    value={email}
                    className="form-control"
                    readOnly
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-6">
                  <input
                    type="text"
                    value={phone}
                    className="form-control"
                    readOnly
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    value={gender}
                    className="form-control"
                    readOnly
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    value={birth}
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr style={{ width: 100 + "%" }} color="black" heigth="100px" />
      <div className="container mt-3">
        <h3>
          <strong> Medical History:</strong>
        </h3>
      </div>
      <form className="d-flex ">
        <div className="container mt-3">
          <div className="card" style={{ width: 36 + "rem" }}>
            <div className="card-body">
              <div className="btn btn-primary">Patient Current Medications</div>
              <div
                className="list-group mt-3"
                style={{ maxHeight: 200 + "px", overflowY: "scroll" }}
              >
                {myPrescription.length > 0 &&
                  myPrescription.map((row) => (
                    <a
                      href={url + row.prescription_path}
                      download
                      className="list-group-item list-group-item-action "
                      aria-current="true"
                    >
                      {String(row.prescription_path).replace(
                        "prescriptionsPatient/",
                        ""
                      )}
                    </a>
                  ))}
              </div>
              <div className="input-group mt-3 mb-3">
                <div className="input-group-prepend"></div>
                <br />
                <strong> Upload your prescription :</strong>
                <br />
                <div className="input-group mt-2">
                  <input
                    type="file"
                    className="form-control uploadPrescription"
                    id="inputGroupFile04"
                    aria-describedby="inputGroupFileAddon04"
                    aria-label="Upload"
                    onChange={changeHandler2}
                  />
                  <button
                    className="btn btn-outline-primary"
                    type="button"
                    id="inputGroupFileAddon04"
                    onClick={uploadPrescription}
                  >
                    upload
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container mt-3">
          <div className="card" style={{ width: 36 + "rem" }}>
            <div className="card-body ">
              <div className="btn btn-primary">Latest Lab test</div>
              <div
                className="list-group mt-3"
                style={{ maxHeight: 200 + "px", overflowY: "scroll" }}
              >
                {myLabTest.length > 0 &&
                  myLabTest.map((row) => (
                    <a
                      href={url + row.test_path}
                      download
                      className="list-group-item list-group-item-action "
                      aria-current="true"
                    >
                      {String(row.test_path).replace("labTestsPatient/", "")}
                    </a>
                  ))}
              </div>
              <div className="input-group mt-3 mb-3">
                <div className="input-group-prepend"></div>
                <br />
                <strong> Upload your lab test :</strong>
                <br />
                <div className="input-group mt-2">
                  <input
                    type="file"
                    className="form-control uploadLabTest"
                    id="inputGroupFile04"
                    aria-describedby="inputGroupFileAddon04"
                    aria-label="Upload"
                    onChange={changeHandler}
                  />
                  <button
                    className="btn btn-outline-primary"
                    type="button"
                    id="inputGroupFileAddon04"
                    onClick={uploadLabTest}
                  >
                    upload
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default EditPatient;
