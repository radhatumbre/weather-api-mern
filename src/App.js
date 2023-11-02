import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import WeatherInputForm from "./components/WeatherInputForm";
import WeatherCard from "./components/WeatherCard";

function App() {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const handleFormSubmit = (country, city) => {
    setSelectedCountry(country);
    setSelectedCity(city);
  };

  return (
    <div className="App">
      <Navbar />
      <WeatherInputForm onFormSubmit={handleFormSubmit} />
      {selectedCountry && selectedCity && (
        <WeatherCard country={selectedCountry} city={selectedCity} />
      )}
    </div>
  );
}

export default App;
