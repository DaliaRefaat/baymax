import React, { useState, useEffect } from "react";
import axios from "axios";
import "./notification.css";
function Notification() {
  const [notfication, setNotfication] = useState([]);

  useEffect(() => {
    fetchNotfication();
  }, []);
  function getCookie(cookieName) {
    let cookie = {};
    document.cookie.split(";").forEach(function (el) {
      let [key, value] = el.split("=");
      cookie[key.trim()] = value;
    });
    return cookie[cookieName];
  }
  const fetchNotfication = async () => {
    await axios
      .get(
        "http://127.0.0.1:8000/api/auth/myNotification?token=" +
          getCookie("token")
      )
      .then(({ data }) => {
        setNotfication(data);
      });
  };
  const read = async (id) => {
    await axios
      .delete(
        "http://127.0.0.1:8000/api/auth/readnotfication?token=" +
          getCookie("token") +
          "&id=" +
          id
      )
      .then(({ data }) => {
        setNotfication(data);
      });
  };

  return (
    <div className="container containerEdit">
      {notfication.length > 0 &&
        notfication.map((row) => (
          <div className="alert alert-info">
            <span
              data-dismiss="alert"
              aria-hidden="true"
              className="close"
              onClick={() => read(row.id)}
              style={{ cursor: "pointer" }}
            >
              ×
            </span>
            <div className="icon hidden-xs">
              <i className="fa fa-info-circle"></i>
            </div>
            <strong>
              {String(row.type)
                .replace("App\\Notifications\\", "")
                .toUpperCase()}
            </strong>
            <br /> {row.data.msg}
          </div>
        ))}
    </div>
  );
}

export default Notification;
