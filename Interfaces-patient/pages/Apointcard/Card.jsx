import React, { Component } from "react";
import "./Apoint.css"
import Apointcard from "../../../patient/pages/Apointcard/Apointcard";

class Card extends Component {
    render() {
        return (
<>
<Apointcard name=" Habiba Ehab" date="20 yrs female" num="+01022152600" con="contact" time="08:00 PM" po=" Fep 2022" co="consult" img={require('../../../../../img/bob.jpeg')} />

<Apointcard name="Omara Elsayed" date="20 yrs male" num="+01022152600" con="contact" time="06:00 PM" po="4 May 2022" co="consult" img={require('../../../../../img/bo.jpeg')}/>

<Apointcard name="CR7" date="37 yrs male" num="+01022152600" con="contact" time="12:00 PM" po="20 Jan 2022" co="consult" img={require('../../../../../img/bb.jpeg')}/>


</>
            );
        }
    }
    
    export default Card;