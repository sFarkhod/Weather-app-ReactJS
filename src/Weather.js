import React, {useState, useEffect} from "react";
import backPicNormal from "./pics/normal.jpg";
import backPicSun from "./pics/sun.jpg";
import backPicSnow from "./pics/snow.jpg"
import backPicWind from "./pics/wind.jpg"
import searchIc from "./pics/SeekPng.com_magnifying-glass-png-no_659285.png";
import { WeatherAPI } from "./api/WeatherAPI";


export default function Weather() {

  // For local time and date 

  const [date, setDate] = useState(new Date());

  function refreshClock() {
    setDate(new Date());
  }

  const timerId = setInterval(refreshClock, 1000);

  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000);
    return function cleanup() {
      clearInterval(timerId);
    };
  }, []);

  // For local time and date



  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = async (e) => {
    if(e.key === 'Enter') {
      const data = await WeatherAPI(query);
      setWeather(data);
      setQuery();
      console.log(data);
    }
  }

  const searchWithButton = async (e) => {
    const data = await WeatherAPI(query);
    setWeather(data);
    setQuery();
    console.log(data);
  }

  // For searching default positions

  const searchDefaultManchester = async (e) => {
    const data = await WeatherAPI('Manchester');
    setWeather(data);
    setQuery();
    console.log(data);
  }

  const searchDefaultDubai = async (e) => {
    const data = await WeatherAPI('Dubai');
    setWeather(data);
    setQuery();
    console.log(data);
  }

  const searchDefaultTashkent = async (e) => {
    const data = await WeatherAPI('Tashkent');
    setWeather(data);
    setQuery();
    console.log(data);
  }

  const searchDefaultCalifornia = async (e) => {
    const data = await WeatherAPI('California');
    setWeather(data);
    setQuery();
    console.log(data);
  }

  // For searching default positions


  return (
    <div className="container">
      <div className="card">

        {/* This is simple ternary operation to change background image */}
        {weather.main && (
          <img src={weather.main.temp >= 35 ? backPicSun : weather.main.temp >= 5 ? backPicWind : backPicSnow} alt="Background-image" className="back_img" />
        )}
        

        <img src={backPicNormal} alt="Background" className="back_img" />


        <div className="myCard">
          <div className="imgDiv">
            <img src={searchIc} alt="search-icon" className="searchIMG" onClick={searchWithButton} />

            <input
              type="text"
              placeholder="  Search Location"
              className="searchInput"
              value={query}
              onChange={ (e) => setQuery(e.target.value) }
              onKeyPress={search} 
            />
          </div>

          <div className="textClass">
            <h2>Default Location</h2>
            <hr />
            <h3 onClick={searchDefaultDubai}>Dubai</h3>
            <h3 onClick={searchDefaultManchester}>Manchester</h3>
            <h3 onClick={searchDefaultTashkent}>Tashkent</h3>
            <h3 onClick={searchDefaultCalifornia}>California</h3>

            <hr />
            <h2>Weather Details</h2>
            <h3>Cloudy</h3>
            {weather.main &&(
              <h3 className="weatherInfoText">{weather.clouds.all}%</h3>
            )}
            <h3>Humidity</h3>
            {weather.main && (
              <h3 className="weatherInfoText">{weather.main.humidity}%</h3>
            )}
            <h3>Wind</h3>
            {weather.main && (
              <h3 className="weatherInfoText">{weather.wind.speed}km/h</h3>
            )}

            <hr/>
          </div>

          <div className="AboutMe">
            <h2><a href="https://github.com/sFarkhod">About Author &#128519;</a></h2>
            {/* <h3>Farkhod Sokhibov</h3> */}
          </div>
        </div>
      </div>

      <div className="myLogo">
        <h1>S.FARKHOD</h1>
      </div>


    {weather.main && (
      <div className="weatherInfo">
        <h1 className="weatherDegree">{Math.round(weather.main.temp)}<sup>&deg;</sup></h1>
        <h1 className="weatherTown">{weather.name}</h1>
        <h3 className="time">{date.toLocaleString()}</h3>
        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} className="weatherIMG" alt="weather-icon"/>
        <h3 className="weatherRight">{weather.weather[0].description}</h3>
    </div>
    )}
    </div>
  );
}
