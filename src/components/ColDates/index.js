import React from "react";
import { Week } from "../Week";
import "./index.css";

export const ColDates = ({ data }) => {
  const date = new Date(
    `${data.period.slice(3, 5)}.01.2022`
  );

  const getAllTime = (thisDate) => {
    const allTime = [];
    for (let i = 0; i < 24; i++) {
      let week = [];
      for (let z = 0; z < 7; z++) {
        week[z] = {
          date: thisDate.getDate(),
          month: thisDate.getMonth(),
        };
        date.setDate(week[z].date + 1);
      }
      allTime[i] = week;
    }
    return allTime;
  };
  const allTime = getAllTime(date);

  return (
    <div className="col_date">
      {console.log(allTime)}
      {allTime.map((week, index) => (
        <Week week={week} key={index} />
      ))}
    </div>
  );
};
