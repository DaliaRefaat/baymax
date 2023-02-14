import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Header,
  Footer,
  Home,
  Team,
  Login,
  Signup,
  Question,
  Artical,
  ReadMore,
  Appointment,
  PsychiatristProfile,
} from "./index";
import Test from "./pages/test"
class App extends Component {
  render() {
    return (
      <Router basename="/web">
        <Header />
        <Routes>
          <Route exact path="/test" element={<Test />} />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/Team" element={<Team />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/Question" element={<Question />} />
          <Route exact path="/appointment" element={<Appointment />} />
          <Route
            exact
            path="/PsychiatristProfile/:id"
            element={<PsychiatristProfile />}
          />
          <Route exact path="/artical" element={<Artical />} />
          <Route exact path="/readmore/:id" element={<ReadMore />} />
        </Routes>
        <Footer />
      </Router>
    );
  }
}
export default App;
