import React from "react";

import Clock from "react-live-clock";
import { TIME } from "../constants/index";

export const AppHeader = () => (
  <header className="App-header">
    <div className="header-contents">
      <div className="time-data">
        <Clock className="time" ticking={true} format={"HH:mm:ss"} />
        <div className="date-text">
          {TIME()["day"]} the {TIME()["date"]} of {TIME()["month"]},{" "}
          {TIME()["year"]}
        </div>
      </div>
      <div className="myLounge-header-titling">
        <p className="myLounge-heading">myLounge</p>
        <p className="myLounge-subtitle">Listen. Watch. Relax.</p>
      </div>
    </div>
  </header>
);
