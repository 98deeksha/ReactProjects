import axios from "axios";
import React, { useEffect, useState } from "react";
import { usePosition } from "use-position";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { TailSpin } from "react-loader-spinner";
import './Weather.css'

const Weather = () => {
  const [weather, setWeather] = useState("");
  const [temp, setTemp] = useState("");
  const [location, setLocation] = useState("");
  const [icon, setIcon] = useState("");
  const { latitude, longitude } = usePosition();

  useEffect(() => {
    if (latitude && longitude) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
        )
        .then((response) => {
          setWeather(response.data.weather[0].description);
          setTemp(Math.round(response.data.main.temp));
          setLocation(response.data.name);
          setIcon(response.data.weather[0].icon);
        });
    }
  }, [latitude, longitude]);
  return (
    <div className="mains">
      {latitude && longitude ? (
        <>
          <h1>{location}</h1>
          <h1>{weather}</h1>
          <img
            src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
            alt="icon"
            width="80px"
            height="80px"
          ></img>
          <h1>{temp}°C</h1>
        </>
      ) : (
        <TailSpin color="#00BFFF" height={80} width={80} />
      )}
    </div>
  );
};

export default Weather;
