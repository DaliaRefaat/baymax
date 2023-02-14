import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import css from "./Login.module.css";


function Login (){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const logIn = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    console.log(formData);
    await axios
      .post("http://127.0.0.1:8000/api/auth/login", formData)
      .then(({ data }) => {
        console.log(data);
        let date = new Date();
        date.setTime(date.getTime()+data.expires_in);
        document.cookie = `token= ${data.access_token};path=/`;
        const type = data.user.type;
        if(type==="patient"){
window.location.href = "http://" + window.location.host + "/patient";
        }
        else if(type==="psychiatrist"){
window.location.href = "http://" + window.location.host + "/psychiatrist";
        }
        else if(type==="admin"){
window.location.href = "http://" + window.location.host + "/dashboard";
        }
      })
      .catch(({ response }) => {
        console.log("====================================");
        console.log(response);
        console.log("====================================");
      });
  };
    return (
      <div className={css.center}>
        <h1>Sign in for free</h1>
        <form onSubmit={logIn}>
          <div className={css.txt_field}>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <span></span>
            <label>Your Email</label>
            <div className={css.txt_field}>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <span></span>
              <label>Password</label>
              <div>
                <button
                  className="w-100 py-2 mb-2 btn btn-outline-primary rounded-3"
                  type="submit"
                >
                  Sign in
                </button>
                <div className={css.signup_link}>
                  Not a member? <Link to="/signup">Signup</Link>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
}

export default Login;
