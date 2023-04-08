import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import React, { useState, useEffect } from "react";

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [city, setCity] = useState("");

  useEffect(() => {
    const fetchWeatherData = async () => {
      const apiKey = "f2c66cfd12c4750e037be67850f32edf";
      const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setWeatherData(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    if (city) {
      fetchWeatherData();
    } else {
      setWeatherData([]);
    }
  }, [city]);

  return (
    <div className='bg-primary'>
      <div className='p-5'>
      <h1 className='mb-5 text-white'>Previsioni del tempo</h1>
      <form className='d-flex'>
        <input
          className='form-control w-10rem'
          type="text"
          value={city}
          placeholder="Inserisci una città"
          onChange={(e) => setCity(e.target.value)}
        />
        <button className='btn btn-outline-light ms-3' type="submit">Cerca</button>
      </form>
      {isLoading && <p className='text-white'>Caricamento...</p>}
      {weatherData.length > 0 &&
        weatherData.list.map((forecast) => (
          <div key={forecast.dt}>
            <h2>{forecast.dt_txt}</h2>
            <p>Temperatura: {forecast.main.temp}°C</p>
            <p>Min: {forecast.main.temp_min}°C</p>
            <p>Max: {forecast.main.temp_max}°C</p>
            <p>Umidità: {forecast.main.humidity}%</p>
            <p>Pressione: {forecast.main.pressure}hPa</p>
            <p>Descrizione: {forecast.weather[0].description}</p>
          </div>
        ))}
        </div>
    </div>
  );
};

export default WeatherApp;