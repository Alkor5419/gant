import React from "react";
import { Day } from "../Day";
import "./index.css";

export const Week = ({ week }) => {
  const getMonth = (month) => {
    return new Date(`${month + 1}`).toLocaleString("en", {
      month: "short",
    });
  };

  return (
    <div className="week">
      <div className="week_wrap">
        {week[0].date + " " + getMonth(week[0].month)} -{" "}
        {week[week.length - 1].date +
          " " +
          getMonth(week[week.length - 1].month)}
      </div>

      <div className="day_wrap">
        {week.map((day) => (
          <Day day={day} key={day.date} />
        ))}
      </div>
    </div>
  );
};
