import React, { useState } from "react";
import { CardCss } from "../styles";
import Data from "../API/card-data";
import { NavLink } from "react-router-dom";

const Card = () => {
  const [data, setData] = useState(Data);

  return (
    <>
      <div className="bg-1-gradient"></div>
      <div className="card-main-container row">
        <div className="bg-2-gradient">.</div>
        {data.map((elem) => (
          <div key={elem.event_name} className="card col-lg-4">
            <img src={elem.image} alt="image" style={{ width: "100%" }} />
            <div className="data">
              <h1 className="card-title">{elem.event_name}</h1>
              <p className="card-subtitle">{elem.date}</p>
              <p className="card-info">{elem.short_description}</p>
              <div className="btn">
                <NavLink to={elem.path} className="nav-link">
                  <button className="raise">Register</button>
                </NavLink>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Card;
