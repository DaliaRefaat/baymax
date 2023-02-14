import React, { Component } from "react";
import { Link } from "react-router-dom";


class ChatCard extends Component {
  render() {
    return (
      <>
        <Link onClick={this.props.fun} className="list-group-item list-group-item-action border-0">
          <div className="d-flex align-items-start">
            <img
              src={this.props.img}
              className="rounded-circle me-1"
              alt="Christina Mason"
              width="40"
              height="40"
            />
            <div className="flex-grow-1 ms-3">
              {this.props.name}
            </div>
          </div>
        </Link>
      </>
    );
  }
}

export default ChatCard;
