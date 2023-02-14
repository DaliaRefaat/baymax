import React, { useState, useEffect } from "react";
import axios from "axios";
import css from "./Questions.module.css";
function Question() {
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
    await axios.get("http://127.0.0.1:8000/api/questions").then(({ data }) => {
      setQuestions(data);
    });
  };

  const answerQuestion = async () => {
    const formData = new FormData();
    formData.append("question_id",sessionStorage.getItem("q_id"));
    formData.append("answer",document.querySelector(".answer").value);
    formData.append("token", getCookie("token"));
    await axios
      .post("http://127.0.0.1:8000/api/insert-question-answer",formData)
      .then(({ data }) => {
        fetchQuestions();
      });
  };

  return (
    <div className="container mb-5" style={{ marginTop: 8 + "%" }}>
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
                            className="accordion-button d-flex"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={
                              "#panelsStayOpen-collapse-" + row.id
                            }
                            aria-expanded="true"
                            aria-controls={"panelsStayOpen-collapse-" + row.id}
                          >
                              {row.title}
                            <span className="ms-5">
                              {new Date(row.created_at).toLocaleString()}
                            </span>
                            <button
                              className="btn btn-primary"
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModal"
                              data-bs-whatever={row.title}
                              style={{
                                paddingLeft: 30 + "px",
                                paddingRight: 30 + "px",
                                fontWeight: "bold",
                                marginLeft: 60 + "%",
                              }}
                              onClick={() => {
                                sessionStorage.setItem("q_id", row.id);
                              }}
                            >
                              Replay
                            </button>
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
                                          {new Date(row.date).toLocaleString()}
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
                  <div
                    class="modal fade"
                    id="exampleModal"
                    tabindex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalLabel">
                            Answer For Question
                          </h5>
                          <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div class="modal-body">
                          <form>
                            <div class="mb-3">
                              <label for="message-text" class="col-form-label">
                                Answer:
                              </label>
                              <textarea
                                class="form-control answer"
                                id="message-text"
                              ></textarea>
                            </div>
                          </form>
                        </div>
                        <div class="modal-footer">
                          <button
                            type="button"
                            class="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                          <button
                            type="button"
                            class="btn btn-primary"
                            data-bs-dismiss="modal"
                            onClick={answerQuestion}
                          >
                            Send Your Answer
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Question;
