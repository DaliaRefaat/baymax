import  React,{ Component } from "react";
import logo from "../../../../../img/logo.png";
class Comment extends Component {
    render() {
        return (
          <div className="card-body border my-2">
            <div className="d-flex flex-start">
              <img
                className="rounded-circle shadow-1-strong me-3"
                src={this.props.img}
                alt="avatar"
                width="40"
                height="40"
              />
              <div className="w-100">
                <div className="d-flex justify-content-between align-items-center mb-0 ">
                  <h6 className="text-primary fw-bold mb-0 w-75">
                    {this.props.name}<br/>
                    <span className="text-dark ms-2">{this.props.comment}</span>
                  </h6>
                  <p className="mb-0">{this.props.date}</p>
                </div>
                <div className="d-flex justify-content-between align-items-center"></div>
              </div>
            </div>
          </div>
        );
    }
}

export default Comment;
