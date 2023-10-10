import React, { useState, useEffect } from "react";
import axios from "axios";
import "./WeatherInputForm.css"; // Import your CSS file

const WeatherInputForm = ({ onFormSubmit }) => {
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("IN");
  const [selectedCity, setSelectedCity] = useState("Mumbai");

  const fetchCountries = async () => {
    try {
      const response = await axios.get("https://restcountries.com/v2/all");
      const countries = response.data.map((country) => ({
        code: country.alpha2Code,
        name: country.name,
      }));
      return countries;
    } catch (error) {
      console.error("Error fetching countries:", error);
      return [];
    }
  };

  const fetchCitySuggestions = async (countryCode, cityName) => {
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/search.json?key=YOUR_API_KEY&q=${cityName}`
      );
      const cities = response.data.map((city) => ({
        name: city.name,
      }));
      return cities;
    } catch (error) {
      console.error("Error fetching city suggestions:", error);
      return [];
    }
  };

  useEffect(() => {
    // Fetch the list of countries when the component mounts
    fetchCountries().then((data) => {
      setCountries(data);
    });
  }, []);

  const handleCountryChange = (event) => {
    const country = event.target.value;
    setSelectedCountry(country);

    // Clear city selection when the country changes
    setSelectedCity("");
  };

  const handleCityChange = (event) => {
    const city = event.target.value;
    setSelectedCity(city);
  };

  const handleCitySuggestions = async (inputValue) => {
    if (selectedCountry) {
      const citySuggestions = await fetchCitySuggestions(
        selectedCountry,
        inputValue
      );
      setCities(citySuggestions);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFormSubmit(selectedCountry, selectedCity);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="weather-input">
      <h1>Weather App</h1>

        <div>
          <label>Select Country: </label>
          <select onChange={handleCountryChange} value={selectedCountry}>
            <option value="">Select a country</option>
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Select City: </label>
          <input
            type="text"
            placeholder="Type a city name"
            value={selectedCity}
            onChange={(e) => {
              setSelectedCity(e.target.value);
              handleCitySuggestions(e.target.value);
            }}
          />
          <ul>
            {cities.map((city) => (
              <li key={city.name} onClick={() => setSelectedCity(city.name)}>
                {city.name}
              </li>
            ))}
          </ul>
        </div>
        <button type="submit">Get Weather</button>
      </div>
    </form>
  );
};

export default WeatherInputForm;
