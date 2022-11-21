import React from "react";
import "./index.css";

export const Day = ({ day }) => {
  return (
    <div className="day_wrapper">
      <div className="day">{day.date}</div>
      <div className="day_col"></div>
    </div>
  );
};
