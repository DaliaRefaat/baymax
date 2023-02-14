import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function Articals() {
  const [articals, setArticals] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [body, setBody] = useState("");
  const [img, setImg] = useState("");
  useEffect(() => {
    fetchArticals();
  }, []);
  function getCookie(cookieName) {
    let cookie = {};
    document.cookie.split(";").forEach(function (el) {
      let [key, value] = el.split("=");
      cookie[key.trim()] = value;
    });
    return cookie[cookieName];
  }
  const fetchArticals = async () => {
    await axios
      .get("http://127.0.0.1:8000/api/articals")
      .then(({ data }) => {
        setArticals(data);
        console.log(data);
      });
  };
  const deleteArtical = async (id) => {
    await axios
      .delete(
        "http://127.0.0.1:8000/api/delete-artical?token=" +
          getCookie("token") +
          "&id=" +
          id
      )
      .then(() => {
        fetchArticals();
      });
  };

  const createArtical = async (e) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("type", type);
    formData.append("body", body);
    formData.append("img", img);
    formData.append("token", getCookie("token"));
    await axios
      .post("http://127.0.0.1:8000/api/insert-artical", formData)
      .then(({data}) => {
        fetchArticals();
      });
  };
  return (
    <>
      <div className="container card p-5">
        <button
          type="button"
          className="btn btn-primary w-25 mb-4"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
        >
          Create Artical
        </button>
        <div className="row">
          <table
            id="example"
            className="table table-striped table-bordered"
            style={{ width: 100 + "%" }}
          >
            <thead>
              <tr>
                <th>Title</th>
                <th>type</th>
                <th>Created By</th>
                <th>Submition-date</th>
                <th>img</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {articals.length > 0 &&
                articals.map((row) => (
                  <tr>
                    <td>{row.title}</td>
                    <td>{row.type}</td>
                    <td>{row.psychiatrist_name}</td>
                    <td>{new Date(row.date).toLocaleString()}</td>
                    <td>
                      <img
                        src={"http://127.0.0.1:8000/files/" + row.img}
                        alt=""
                        width="50"
                        height="50"
                      />
                    </td>
                    <td>
                      <i
                        className="fa-solid fa-trash text-danger ps-2"
                        onClick={() => deleteArtical(row.id)}
                      ></i>
                      <Link
                        to={"/show-artical/" + row.id}
                        className="fa-solid fa-eye text-success ps-2"
                      ></Link>
                    </td>
                  </tr>
                ))}
            </tbody>
            <tfoot>
              <tr>
                <th>Title</th>
                <th>type</th>
                <th>Creaded By</th>
                <th>Submition-date</th>
                <th>img</th>
                <th>Action</th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <div className="container">
        <div
          className="modal fade  "
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">
                  Enter Details for Your Artical
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                Upload Image
                <div className="input-group mb-3">
                  <input
                    type="file"
                    className="form-control"
                    id="inputGroupFile02"
                    onChange={(e) => {
                      setImg(e.target.files[0]);
                    }}
                  />
                  <label
                    className="input-group-text btn-primary"
                    htmlFor="inputGroupFile02"
                  >
                    Upload img
                  </label>
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Type
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    onChange={(e) => {
                      setType(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlTextarea1"
                    className="form-label"
                  >
                    Enter Your Contant
                  </label>
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    onChange={(e) => {
                      setBody(e.target.value);
                    }}
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={createArtical}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Articals;
