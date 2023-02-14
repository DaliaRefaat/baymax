import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Articles from "./Articles";
import css from "./Articles.module.css";
import Comment from "../../components/comment/comment";
import img from "../../../../../img/wallpaperflare.com_wallpaper (2).jpg";


function ReadMore(){
  const { id } = useParams();
  const [artical, setArtical] = useState([]);
  const [comments, setComments] = useState([]);
  const [sameArticals, setSameArticals] = useState([]);
 useEffect(() => {
   fetchArtical(id);
 }, [id]);

 const fetchArtical = async (id) => {
   await axios
     .get("http://127.0.0.1:8000/api/artical?id=" + id)
     .then(({ data }) => {
       setArtical(data);
       setComments(data.comments);
       setSameArticals(data.same);
     });
 };
 function getCookie(cookieName) {
   let cookie = {};
   document.cookie.split(";").forEach(function (el) {
     let [key, value] = el.split("=");
     cookie[key.trim()] = value;
   });
   return cookie[cookieName];
 }
 const addComment = async () => {
const comment =document.querySelector("input").value;
document.querySelector("input").value="";
  if(comment!==""){
   await axios.post(`http://127.0.0.1:8000/api/insert-artical-comment?token=${getCookie("token")}&artical_id=${artical.id}&comment=${comment}`);
}
 };
const url = "http://127.0.0.1:8000/files/";
    return (
      <div className="container my-0">
        <br />
        <br />
        <br />
        <br />
        <h1 className="mb-4 headline"> {artical.title}</h1>
        <main className="row w-100">
          <img
            src={url+artical.img}
            className="mb-3"
            alt=""
          />
          <span>
            Published by: {artical.psychiatrist_name}
            <span>
              <br />
              <i className="fa fa-clock-o"></i> {artical.date}
              <br />
              <br />
            </span>
          </span>
          <h4>{artical.body}</h4>
        </main>
        <hr />
        <h2>Comments</h2>
        {comments.length > 0 &&
          comments.map((row) => (
            <Comment
              name={row.patient_name}
              date={row.date}
              comment={row.comment}
              img={url+row.img}
            />
          ))}

        <h5>add comment</h5>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Your Comment..."
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
          />
          <button
            className="btn btn-outline-primary"
            type="button"
            id="button-addon2"
            onClick={addComment}
          >
            Comment
          </button>
        </div>
        <hr />
        <h2>Artical Same : </h2>
        <div className={css["posts"]}>
          {sameArticals.length > 0 &&
            sameArticals.map((row) => (
              <Articles
                name={row.type}
                po={row.title}
                max={row.psychiatrist_name}
                add={String(row.body).substring(0, 100) + "....."}
                dat={row.date}
                img={url+row.img}
                Link={row.id}
              />
            ))}
        </div>
      </div>
    );
}

export default ReadMore;
