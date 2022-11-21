import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { Axios } from "./utils/axios";
import { ReactComponent as Arrow } from "./icons/arrow.svg";
import { ReactComponent as ArrowDown } from "./icons/arrow-down.svg";
import { ReactComponent as Lvl0 } from "./icons/lvl0.svg";
import { ReactComponent as Lvl1 } from "./icons/lvl1.svg";
import { ReactComponent as Lvl2 } from "./icons/lvl2.svg";
import { ReactComponent as Lvl3 } from "./icons/lvl3.svg";
import { ReactComponent as Lvl4 } from "./icons/lvl4.svg";
import { ColDates } from "./components/ColDates";

function App() {
  const [data, setData] = useState(null);
  const [isOpen, setIsOpen] = useState(4);
  useEffect(() => {
    Axios.get("/test.php")
      .then((resp) => {
        setData(resp.data);
        console.log(resp.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  const getImg = (lvl) => {
    switch (lvl) {
      case 0:
        return <Lvl0 />;
      case 1:
        return <Lvl1 />;
      case 2:
        return <Lvl2 />;
      case 3:
        return <Lvl3 />;
      case 4:
        return <Lvl4 />;
      default:
        break;
    }
  };
  const getColor = (lvl) => {
    switch (lvl) {
      case 0:
        return "lvl0block";
      case 1:
        return "lvl1block";
      case 2:
        return "lvl2block";
      case 3:
        return "lvl3block";
      case 4:
        return "lvl4block";
      default:
        break;
    }
  };
  const handleClick = (lvl) => {
    isOpen === lvl ? setIsOpen(4) : setIsOpen(lvl);
  };
  const renderItems = (chart, lvl = 0) => {
    return (
      <>
        {isOpen >= lvl && (
          <div
            className="fillCol"
            style={{
              paddingLeft: `calc(22px + (9px * ${lvl})`,
            }}
            onClick={() => handleClick(lvl)}
          >
            {chart?.sub?.length > 0 && (
              <ArrowDown
                style={{
                  marginRight: "6px",
                  transform: `${
                    isOpen === lvl
                      ? "rotate(180deg)"
                      : "none"
                  }`,
                }}
              />
            )}
            {getImg(lvl)}
            <span>{chart.sub ? chart.sub.length : 0} </span>
            {chart.title}
            <div
              style={{
                position: "absolute",
                left: 0,
                transform: `translateX(calc(390px + 21.14px * ${
                  chart.period_start.substr(-2) - 1
                })`,
                display: "flex",
                alignItems: "center",
                cursor: "text",
              }}
            >
              <div
                className={getColor(lvl)}
                style={{
                  width: `calc(21.14px * ${
                    chart.period_end.slice(8, 10) -
                    chart.period_start.slice(8, 10) +
                    1
                  })`,
                  height: "24px",
                }}
              ></div>
              <p className="chart_title">{chart.title}</p>
            </div>
          </div>
        )}

        {chart.sub &&
          chart.sub.map((newChart) =>
            renderItems(newChart, lvl + 1)
          )}
      </>
    );
  };
  return (
    <div className="app">
      <div className="header_row">
        <p>DMS 2.0 / 02.09.2022-31.12.2022</p>
        <button>
          <Arrow
            width="12px"
            height="16"
            alt="arrow"
            style={{ marginRight: "12px" }}
          />
          Export
        </button>
      </div>
      <div className="gant">
        <div className="gant_chart">
          <div className="col">
            <div className="col_title">Work item</div>
            <div className="no_fill_col"></div>
            {data && renderItems(data.chart)}
          </div>

          <ColDates data={data} />
        </div>
        <div className="dark"></div>
      </div>
    </div>
  );
}

export default App;
