import  React,{ Component } from "react";
import css from"./CardAvailable.module.css";
import logo from "../../../../../img/logo.png";
import { Link } from "react-router-dom";
class CardAvailable extends Component {
    render() {
        return (
          <div className="">
            <div
              className={
                css["available-card"] + " " + css["available-card--first"]
              }
            >
              <div className={css["available-card__top"]}></div>
              <div className={css["available-card__body"]}>
                <div className="text-center">
                  <img
                    src={this.props.img}
                    className={css["circle-img"] + " mb-2"}
                    alt="User Img"
                  />
                  <h5 className="mb-0">{this.props.name}</h5>
                  <p className="text-muted mb-0">{this.props.specialty}</p>
                  <hr />
                  <div className="d-flex justify-content-center align-items-center">
                    <Link
                      to={"/psychiatristProfile/" + this.props.id}
                      className="btn btn-outline-primary btn-sm"
                    >
                      Book Appointment Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
}

export default CardAvailable;
