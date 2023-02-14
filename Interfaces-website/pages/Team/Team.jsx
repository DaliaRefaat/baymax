import React, { Component } from "react";

import CardTeam from "../../components/cardTeam/cardTeam";
class Team extends Component {
  render() {
    return (
      <>
        <div className="container py-5" style={{ marginTop: 5 + "%" }}>
          <div className="row text-center text-white">
            <div className="col-lg-8 mx-auto">
              <h1 className="display-4 text-primary">Team Page</h1>
            </div>
          </div>
        </div>
        <div className="d-flex flex-wrap justify-content-evenly">
          <CardTeam name="Mohamed Said" po="Laravel Dev (Team Leader)" />
          <CardTeam name="Youssef Mahmoud" po="Laravel Dev" />
          <CardTeam name="Elmo3tasim bellah" po="Laravel Dev" />
          <CardTeam name="Belal Mahmoud" po="React Dev (Tecnical Front)" />
          <CardTeam name="Emara" po="React Dev" />
          <CardTeam name="Habiba" po="React Dev" />
          <CardTeam name="Maria" po="React Dev" />
          <CardTeam name="Omnia" po="React Dev" />
          <CardTeam name="Nada" po="Flutter Dev (Tecnical Flutter)" />
          <CardTeam name="Amar" po="Flutter Dev" />
          <CardTeam name="Mohand" po="Flutter Dev" />
          <CardTeam name="Dalia" po="AI Dev" />
        </div>
      </>
    );
  }
}

export default Team;
