import React, { Component } from "react";
import { Link } from "react-router-dom";
import css from "./Articles.module.css";

class Articles extends Component {
  render() {
    return (
      <main className="row">
        <div className="normal">
          <div className={css["module"]}>
            <div className={css["thumbnail"]}>
              <img src={this.props.img} alt="" />
            </div>
            <div className={css["content"]}>
              <div className={css["category"]}>{this.props.name}</div>
              <h1 className={css["title"]}>{this.props.po}</h1>
              <span className={css["Published"]}>
                Published by: <span>{this.props.max}</span>
              </span>
              <div className={css["description"]}>
                <span>{this.props.add} </span>
                <span className={css["comments"]}>
                  <Link to={"/readmore/"+this.props.Link}>show More</Link>{" "}
                </span>
              </div>
              <div className="icons d-flex justify-content-between align-items-end">
                <div className="meta">
                  <span className="timestamp pe-3">
                    <i className="fa fa-clock-o"></i>
                    {this.props.dat}{" "}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default Articles;
