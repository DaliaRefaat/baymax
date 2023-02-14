import React, { useState, useEffect } from "react";
import axios from "axios";
import css from "./Questions.module.css";
function Questions() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchQuestions();
  }, []);
function getCookie(cookieName) {
  let cookie = {};
  document.cookie.split(";").forEach(function (el) {
    let [key, value] = el.split("=");
    cookie[key.trim()] = value;
  });
  return cookie[cookieName];
}
  const fetchQuestions = async () => {
    await axios
      .get(
        "http://127.0.0.1:8000/api/my-questions?token="+getCookie("token")
      )
      .then(({ data }) => {
        setQuestions(data);
      });
  };

  const askQuestion = async () => {
    const q = document.querySelector("input").value;
    document.querySelector("input").value = "";
    await axios.post(
      "http://127.0.0.1:8000/api/insert-question?title=" +
        q +
        "&token="+getCookie("token")
    ).then(()=>{
      fetchQuestions();
    });
  };

  return (
    <div className="container mb-5" style={{ marginTop: 8 + "%" }}>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Your Question..."
          aria-label="Recipient's username"
          aria-describedby="button-addon2"
        />
        <button
          className="btn btn-outline-primary px-5"
          type="button"
          onClick={askQuestion}
          id="button-addon2"
        >
          {" "}
          Ask{" "}
        </button>
      </div>
      <div className={css["cardEdit"] + " card"}>
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-12">
                <div className="accordion" id="accordionPanelsStayOpenExample">
                  {questions.length > 0 &&
                    questions.map((row) => (
                      <div className="accordion-item">
                        <h2
                          className="accordion-header"
                          id={"panelsStayOpen-heading-" + row.id}
                        >
                          <button
                            className="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={
                              "#panelsStayOpen-collapse-" + row.id
                            }
                            aria-expanded="true"
                            aria-controls={"panelsStayOpen-collapse-" + row.id}
                          >
                            {row.title}
                          </button>
                        </h2>
                        <div
                          id={"panelsStayOpen-collapse-" + row.id}
                          className="accordion-collapse collapse"
                          aria-labelledby={"panelsStayOpen-heading-" + row.id}
                        >
                          <div className="accordion-body">
                            <div
                              className="accordion"
                              id="accordionPanelsStayOpenExample"
                            >
                              {row.answers.length > 0 &&
                                row.answers.map((row) => (
                                  <div className="accordion-item">
                                    <h2
                                      className="accordion-header"
                                      id={
                                        "panelsStayOpen-heading" +
                                        row.psychiatrist_id
                                      }
                                    >
                                      <button
                                        className="accordion-button"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target={
                                          "#panelsStayOpen-collapse" +
                                          row.psychiatrist_id
                                        }
                                        aria-expanded="true"
                                        aria-controls={
                                          "panelsStayOpen-collapse" +
                                          row.psychiatrist_id
                                        }
                                      >
                                        <b>{row.psychiatrist_name}</b>
                                        <span className="ms-5">
                                          {new Date(
                                            row.date
                                          ).toLocaleString()}
                                        </span>
                                      </button>
                                    </h2>
                                    <div
                                      id={
                                        "panelsStayOpen-collapse" +
                                        row.psychiatrist_id
                                      }
                                      className="accordion-collapse collapse"
                                      aria-labelledby={
                                        "panelsStayOpen-heading" +
                                        row.psychiatrist_id
                                      }
                                    >
                                      <div className="accordion-body">
                                        {row.answer}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Questions;
