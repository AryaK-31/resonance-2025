import React from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import { eventCSS } from "../styles";

const Events = () => {
  return (
    <>
      <Navbar />
      <div className="container d-flex justify-content-center">
        <h1 className="event-heading">EVENTS</h1>
      </div>
      <Card />
    </>
  );
};

export default Events;
