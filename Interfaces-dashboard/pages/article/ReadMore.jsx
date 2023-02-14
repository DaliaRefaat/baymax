import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Comment from "./../../../patient/components/comment/comment";

function ReadMore(){
  const { id } = useParams();
  const [artical, setArtical] = useState([]);
  const [comments, setComments] = useState([]);

 useEffect(() => {
   fetchArtical(id);
 }, [id]);

 const fetchArtical = async (id) => {
   await axios
     .get("http://127.0.0.1:8000/api/artical?id=" + id)
     .then(({ data }) => {
       setArtical(data);
       setComments(data.comments);
     });
 };

    return (
      <div className="container my-0">
        <br />
        <br />
        <br />
        <br />
        <h1 className="mb-4 headline"> {artical.title}</h1>
        <main className="row w-100">
          <img
            src={"http://127.0.0.1:8000/files/" + artical.img}
            className="mb-3"
            alt=""
          />
          <span>
            Published by: {artical.psychiatrist_name}
            <span>
              <br />
              <i className="fa fa-clock-o"></i>{" "}
              {new Date(artical.date).toLocaleString()}
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
              date={new Date(row.date).toLocaleString()}
              comment={row.comment}
            />
          ))}
        <hr />
      </div>
    );
}

export default ReadMore;
