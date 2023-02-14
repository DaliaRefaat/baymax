import React, { Component } from "react";
import css from "../Chat/chat.module.css"
class Message extends Component {
  render() {
    return (
      <div className={`${css["chat-message-" + this.props.dir]} pb-4`}>
        <div>
          <img
            src={this.props.img}
            className="rounded-circle me-1"
            alt=""
            width="40"
            height="40"
          />
          <div className="text-muted small text-nowrap mt-2">
            {this.props.time}
          </div>
        </div>
        <div className="flex-shrink-1 bg-light rounded py-2 px-3 ms-3">
          <div className="font-weight-bold mb-1">{this.props.name}</div>
          {this.props.msg}
        </div>
      </div>
    );
  }
}

export default Message;
