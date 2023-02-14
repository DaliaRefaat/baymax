import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./CardZoomSettings.module.css";
function Settings() {
  const [API_secret, setAPI_secret] = useState("");
  const [API_Key, setAPI_Key] = useState("");
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
        console.log(data);
        setAPI_Key(data.API_Key);
        setAPI_secret(data.API_secret);
      });
  };
  const updateZoom = async () => {
     const formData = new FormData();
     formData.append("API_secret", API_secret);
     formData.append("API_Key", API_Key);
     formData.append("token", getCookie("token"));
    await axios
      .post("http://127.0.0.1:8000/api/zoomSettings" , formData);
  };

  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <div className={styles.div}>zoom</div>
      <p className={styles.p}>Apl key</p>
      <input
        className={styles.input}
        type="text"
        value={API_Key}
        onChange={(e) => {
          setAPI_Key(e.target.value);
        }}
      />
      <p className={styles.p}>Apl secret</p>
      <input
        className={styles.input}
        type="text"
        value={API_secret}
        onChange={(e) => {
          setAPI_secret(e.target.value);
        }}
      />
      <br />
      <br />
      <br />
      <br />
      <h3 className={styles.h3}>zoom configuration guide</h3>
      <div className={styles.one}>
        {" "}
        step 1:sign up or sign in here: <a href="/">zoom market place portal</a>
      </div>
      <div className={styles.two}>
        {" "}
        step 2:click/hover on develop button at the right in navigation bar and
        click on build app<a href="/">creat app</a>
      </div>
      <div className={styles.three}> step 3:select jwt and click create</div>
      <div className={styles.four}>
        {" "}
        step 4:fill the mandatory information and in the app credentials tag you
        can see apl key and apl secret
      </div>
      <div className={styles.five}>
        {" "}
        step 5:copy and paste apl key and apl secret here and click on save
        button and you are ready to go
      </div>
      <button className="btn btn-primary" onClick={updateZoom}>
        save configuration
      </button>
    </>
  );
}
export default Settings;
