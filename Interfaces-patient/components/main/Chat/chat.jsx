import React, { useState, useEffect } from "react";
import axios from "axios";
import css from "./chat.module.css";
import Baymax from "../../../../../../img/dddddddddddddd.jpg";
import Message from "./Message";
function Chat()  {
    const [myChats, setMyChats] = useState([]);
    const [psychiatrist_id,setPsychiatrist_id] = useState('');
    const [img,setImg] = useState('');
    const [psychiatrist_name, setPsychiatrist_name] = useState("");
    const [myMsgs, setMyMsgs] = useState([]);

useEffect(() => {
  fetchProfile();
}, []);
function getCookie(cookieName) {
  let cookie = {};
  document.cookie.split(';').forEach(function(el) {
    let [key,value] = el.split('=');
    cookie[key.trim()] = value;
  })
  return cookie[cookieName];
}
const fetchProfile = async () => {
  await axios
    .get(
      "http://127.0.0.1:8000/api/patient-chat?token="+getCookie("token")
    )
    .then(({ data }) => {
      console.log(data);
      setMyChats(data);
    });
  };

  const getChat = async (id,name,img) => {
  setPsychiatrist_id(id);
  setPsychiatrist_name(name);
  setImg(img);
  sessionStorage.setItem("id_psy", id);
    let chatCard = document.querySelector(".messages");
    getMessages(sessionStorage.getItem("id_psy"));
    chatCard.scrollTo(0, chatCard.scrollHeight);
    setInterval(() => {
      getMessages(sessionStorage.getItem("id_psy"));
      chatCard.scrollTo(0, chatCard.scrollHeight);
    }, 1000);
  };
  const getMessages = async (id) => {
  await axios
    .get(
      `http://127.0.0.1:8000/api/Patient-getMsg?psychiatrist_id=${id}&token=${getCookie("token")}`
    )
    .then(({ data }) => {
      setMyMsgs(data);
    });
  };


const sendMsg = async () => {
  const msg = document.querySelector(".input-text").value;
  document.querySelector(".input-text").value="";
  await axios.post(
    `http://127.0.0.1:8000/api/patient-sendMsg?msg=${msg}&psychiatrist_id=${sessionStorage.getItem(
      "id_psy"
    )}&token=${getCookie("token")}`
  );
};
let url = "http://127.0.0.1:8000/files/";
    return (
      <div className="card" style={{ marginTop: 8 + "%" }}>
        <div className="row g-0">
          <div className="col-12 col-lg-5 col-xl-3 border-end list-group">
            <div className="px-4 d-none d-md-block">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <h3 className="my-3 text-primary">
                    Chats
                  </h3>
                </div>
              </div>
            </div>
            {myChats.length > 0 &&
              myChats.map((row) => (
                <div
                  onClick={() => getChat(row.id, row.name ,row.img )}
                  className="list-group-item list-group-item-action border-0"
                >
                  <div className="d-flex align-items-start">
                    <img
                      src={url+row.img}
                      className="rounded-circle me-1"
                      alt="Mohamed Said"
                      width="40"
                      height="40"
                    />
                    <div className="flex-grow-1 ms-3">{row.name}</div>
                  </div>
                </div>
              ))}
            <hr className="d-block d-lg-none mt-1 mb-0" />
          </div>
          <div className="col-12 col-lg-7 col-xl-9">
            <div className="py-2 px-4 border-bottom d-none d-lg-block">
              <div className="d-flex align-items-center py-1">
                <div className="position-relative">
                  <img
                    src={url+img}
                    className="rounded-circle me-1"
                    alt="Mohamed Said"
                    width="40"
                    height="40"
                  />
                </div>
                <div className="flex-grow-1 ps-3">
                  <strong>{psychiatrist_name}</strong>
                  <div className="text-muted small"></div>
                </div>
              </div>
            </div>

            <div className="position-relative">
              <div className={css["chat-messages"] + " p-4 messages"}>
                {myMsgs.length > 0 &&
                  myMsgs.map(
                    (row) =>(
                      <Message
                      dir={row.sender === "patient" ? "right" : "left"}
                      time={new Date(row.date).toLocaleString("en-US", {hour: "numeric",minute: "numeric",hour12: true,})}
                      img={url+row.img}
                      msg={row.msg}
                      name={row.sender === "patient" ? row.patient_name : row.psychiatrist_name}
                      />
                    )
                  )
                  }
              </div>
            </div>

            <div className="flex-grow-0 py-3 px-4 border-top">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control input-text"
                  placeholder="Type your message"
                />
                <button className="btn btn-primary" onClick={sendMsg}>
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }


export default Chat;
