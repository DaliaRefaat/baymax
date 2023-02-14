import React, { Component } from "react";
import css from "./appintDetail.module.css";
class AppintDetail extends Component {
  render() {
    return (
      <>
        <tr className={css["bg-blue"]} key={this.props.key}>
          <td className="p-2">{this.props.day}</td>
          <td className="p-2 mt-1">{this.props.time}</td>
          <td className="p-2">{this.props.price} $</td>
          <td className="p-2">{this.props.durasion} min</td>
        </tr>
        <tr className={css["spacing-row"]}>
          <td></td>
        </tr>
      </>
    );
  }
}

export default AppintDetail;
