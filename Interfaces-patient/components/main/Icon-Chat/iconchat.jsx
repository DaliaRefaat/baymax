import React, { Component } from "react";
import { Link } from "react-router-dom";
import './iconchat.css';
import "../Chat/chat"
class IconChat extends Component {
    render() {
        return (<>
            <Link to="/chat">  <div><i className="fa-brands fa-whatsapp"></i></div></Link></>
        );
    }
}

export default IconChat;
