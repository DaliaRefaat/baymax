import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Header,
  Footer,
  IconChat,
  Apointment,
  PsychiatristProfile,
  Artical,
  Artical2,
  Profile,
  MyAppointments,
  Notification,
  Questions,
  Chat,
} from "./index";

class App extends Component {
  render() {
    // setInterval(()=>{
    //   console.log('====================================');
    //   console.log(123);
    //   console.log('====================================');
    // },1000)
    return (
      <Router basename="/patient">
        <Header />
        <IconChat />
        <Routes>
          <Route exact path="/" element={<Apointment />} />
          <Route exact path="/Artical" element={<Artical />} />
          <Route exact path="/readmore/:id" element={<Artical2 />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/Notification" element={<Notification />} />
          <Route exact path="/Questions" element={<Questions />} />
          <Route exact path="/chat" element={<Chat />} />
          <Route
            exact
            path="/psychiatristProfile/:id"
            element={<PsychiatristProfile />}
          />
          <Route exact path="/MyAppointments" element={<MyAppointments />} />
        </Routes>
        <Footer />
      </Router>
    );
  }
}
export default App;
