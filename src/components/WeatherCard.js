import "./WeatherCard.css"; // Import your CSS file
import React, { useEffect, useState } from "react";
import axios from "axios";
import sunnyBackground from "../images/sunny.jpeg";
import rainyBackground from "../images/rainy.jpeg";
import snowyBackground from "../images/snowy.jpeg";

const WeatherCard = ({ country, city }) => {
  const [weatherData, setWeatherData] = useState(null);
  

  useEffect(() => {
    // Replace 'YOUR_API_KEY' with your actual API key from https://www.weatherapi.com/
    const API_KEY = "9d252a8a2fbc4dc78f671712232109";

    // Make an API request to get weather data for the given country and city
    axios
      .get(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city},${country}&days=5`
      )
      .then((response) => {
        setWeatherData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
      
  }, [country, city]);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  const { location, current, forecast } = weatherData;
  const willItRainToday = forecast.forecastday[0].day.daily_will_it_rain;
  const willItSnowToday = forecast.forecastday[0].day.daily_will_it_snow;
  
  let backgroundImage;
  if (willItRainToday) {
    backgroundImage = rainyBackground;
  } else if (willItSnowToday) {
    backgroundImage = snowyBackground;
  } else {
    backgroundImage = sunnyBackground;
  }

  // Dynamically set the body background image and adjust its properties
document.body.style.backgroundImage = `url(${backgroundImage})`;
document.body.style.backgroundSize = 'cover';
document.body.style.backgroundRepeat = 'no-repeat';

  return (
    <div
      className="weather-card"
    >
      <h2>
        Current Weather in {location.name}, {location.country}
      </h2>
      <img src={current.condition.icon} alt={current.condition.text} />
      <p>
        <strong>Current Temperature:</strong> {current.temp_c}°C
      </p>
      <p>
        <strong>Wind:</strong> {current.wind_kph} km/h
      </p>
      <p>
        <strong>Precipitation:</strong> {current.precip_mm} mm
      </p>
      <p>
        <strong>Pressure:</strong> {current.pressure_mb} mb
      </p>

      {/* <p>
        <strong>Will it Rain today:</strong> {willItRainToday ? "Yes" : "No"}
      </p>
      <p>
        <strong>Will it Snow today:</strong> {willItSnowToday ? "Yes" : "No"}
      </p> */}

      <h3>3-Day Temperature Forecast:</h3>
      <div className="forecast">
        {forecast.forecastday.map((day) => (
          <div key={day.date} className="forecast-day">
            <p>
              <strong>{day.date}</strong>
            </p>
            <p>Max Temp: {day.day.maxtemp_c}°C</p>
            <p>Min Temp: {day.day.mintemp_c}°C</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherCard;
