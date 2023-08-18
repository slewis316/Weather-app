import React, { useState } from 'react';
import Thunderstorm from './assets/Thunderstorm.png';
import Drizzle from './assets/Drizzle.png';
import Rain from './assets/Rain.png';
import Snow from './assets/Snow.png';
import Clear from './assets/Clear.png';
import Clouds from './assets/Clouds.png';
const api = {
  key: "ee966cac8fd33770e07dd07a0c1e76c3",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then (result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }


const icons = [Thunderstorm, Drizzle, Rain, Snow, Clear, Clouds];
  
const getIcon = (weather) => {
  switch(weather) {
    case "Thunderstorm":
      return icons[0]
      break;
    case "Drizzle":
      return icons[1]
      break;
    case "Rain":
      return icons[2]
      break;
    case "Snow":
      return icons[3]
      break;
    case "Clear":
      return icons[4]
      break;
    case "Clouds":
      return icons[5]
      break;
    default:
      return icons[5]   
  }
}

  return (
    <div className={ (typeof weather.main != "undefined") ? (((((weather.main.temp)*1.8) + 32) > 75) ? 
      "app-bghot" : "app-bgcold") : "app-bgcold"}>
      <div>
          <h1 className="title">WEATHER FORECAST</h1>
      </div>
      <div className="location-box">
        <div className="date">{dateBuilder(new Date())}</div>
      </div>
      <main> 
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Enter location..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
          
        <div>
          <div className="location-box">
            <div className="location">{weather.name}</div>
            
          </div>
            <div className="weather-box">

              <div className="temp">
                {Math.round(
                  ((weather.main.temp)*1.8) + 32
                  )}°
              </div>
                
              <div className="weather">{weather.weather[0].main}</div>
              <div className="Weather-icons">
                  <img className="icons" src={getIcon(weather.weather[0].main)}></img>
              </div>
            </div>
            
          </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
