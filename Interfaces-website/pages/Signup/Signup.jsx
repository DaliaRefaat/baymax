import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import css from "./Signup.module.css";


function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const register = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phone", phone);
    formData.append("birth_date", birthDate);
    formData.append("gender", gender);
    formData.append("type", "patient");
    console.log(formData);
    await axios
      .post("http://127.0.0.1:8000/api/auth/register", formData)
      .then(({ data }) => {
        console.log(data.message);
        navigate("/login");
      })
      .catch(({ response }) => {
        console.log('====================================');
        console.log(response);
        console.log('====================================');
      });
  };
    return (
      <div className={css.center}>
        <img src="../login/12.png" className={css.line} alt="" />
        <h1 className="p-0 m-0">Sign up</h1>
        <form onSubmit={register}>
          <div className={css.txt_field}>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <span></span>
            <label>Name</label>
          </div>
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
            <label>Email Address</label>
          </div>

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
          </div>

          <div className={css.txt_field}>
            <input
              type="text"
              required
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
            <span></span>
            <label>Phone</label>
          </div>

          <div className={css.txt_field}>
            <input
              type="date"
              required
              value={birthDate}
              onChange={(e) => {
                setBirthDate(e.target.value);
              }}
            />
            <span></span>
            <label>Birth date</label>
          </div>

          <div className={css.txt_field}>
            <select
              required
              className="w-100"
              style={{height:40+'px',border:'none'}}
              value={gender}
              onChange={(e) => {
                setGender(e.target.value);
              }}
            >
              <option value="m">Male</option>
              <option value="f">Female</option>
            </select>
            <span></span>
          </div>

          <input type="submit" value="submit" />

          <div className={css.signup_link}>
            Already have account <Link to="/login">login</Link>
          </div>
        </form>
      </div>
    );

    }

    export default Signup;
