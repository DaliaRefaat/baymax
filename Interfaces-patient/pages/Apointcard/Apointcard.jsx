import React, { Component } from "react";
import "./Apoint.css"

class Apointcard extends Component {
    render() {
        return (

            <section id="testimonials">

            <div className="testimonial-box-container box1">
                <div className="testimonial-box">
                    <div className="box-top">
                        <div className="profile">
                            <div className="profile-img">
                                <img src={this.props.img} alt=""/>
                            </div>
                            <div className="name-user">
                                <strong>{this.props.name}</strong>
                                <p>
                                    {this.props.date}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="client-details">
                        <p>{this.props.num}</p>
                        <a href="">{this.props.con}</a>
                    </div>
                    <div className="time">
                        <p className="hh">{this.props.time}
                            <h6> {this.props.po}</h6>
                            <a href="">
                                <h5>{this.props.co} </h5>
                            </a>
                        </p>
                    </div>
                </div>

            </div>
            </section>

            );
        }
    }

    export default Apointcard;
