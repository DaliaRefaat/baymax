import React, { useState, useEffect } from "react";
import axios from "axios";
import CardDashboard from "../../components/cardsDashboard/cardsDashboard";


function Dashbord()  {

const [appointCount, setAppointCount] = useState("0");
const [patientCount, setPatientCount] = useState("0");
const [todayCount, setTodayCount] = useState("0");
const [articals, setArticals] = useState("0");
const [psychiatrist, setPsychiatrist] = useState("0");
const [question, setquestion] = useState("0");
useEffect(() => {
  fetchHome();
}, []);

const fetchHome = async () => {
  await axios.get("http://127.0.0.1:8000/api/adminHome").then(({ data }) => {
    console.log(data);
    setAppointCount(data.appointment);
    setArticals(data.artical);
    setPatientCount(data.patient);
    setTodayCount(data.appointmentToDay);
    setquestion(data.question);
    setPsychiatrist(data.psychiatrist);
  });
};
    return (
      <>
        <div className="row">
          <CardDashboard
            title="Appointments"
            nums={appointCount}
            icon="fas fa-calendar-check"
          />
          <CardDashboard
            title="today appointment"
            nums={todayCount}
            icon="fas fa-calendar-check"
          />
          <CardDashboard
            title="Artical"
            nums={articals}
            icon="fa-solid fa-file-lines"
          />
          <CardDashboard
            title="patient"
            nums={patientCount}
            icon="fas fa-user-injured"
          />
          <CardDashboard
            title="psychiatrist"
            nums={psychiatrist}
            icon="fa-solid fa-stethoscope"
          />
          <CardDashboard
            title="question"
            nums={question}
            icon="fa-solid fa-question"
          />
        </div>
      </>
    );

}
export default Dashbord;
