import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { usePosition } from 'use-position';


const App = () => {
 
 const [weather, setWeather] = useState("");
 const [temp, setTemp] = useState("");
 const { latitude, longitude } = usePosition();
 useEffect(() => {
   if (latitude && longitude) {
     axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
       
     ).then((response) => {
       setWeather(response.data.weather[0].description);
       setTemp(Math.round(response.data.main.temp));
     });
   }
 }, [latitude, longitude]);
  return (
    <>
      <h1>{temp}</h1>
      <h1>{weather}</h1>
    </>
  );
}

export default App