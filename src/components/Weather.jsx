import React, { useEffect } from "react";
import { useState } from "react";

function Weather({ error, data }) {
  return (
    <div className="weather">
      <div className="error">
        <p>{error}</p>
      </div>
      <div className="winfo">
        <div className="wheader">
          <img src={data.image} alt="" className="icon" />

          <h1>{Math.round(data.celcius)}°C</h1>
          <h2>{data.name}</h2>
        </div>
        <div className="details">
          <div className="col">
            <img src="/Images/humidity.png" alt="" />
            <div className="humidity">
              <p>{Math.round(data.humidity)}%</p>
              <p>Humidity</p>
            </div>
          </div>
          <div className="col">
            <img src="/Images/wind.png" alt="" />
            <div className="wind">
              <p>{Math.round(data.speed)} km/h</p>
              <p>wind</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Weather;
