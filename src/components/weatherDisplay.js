import React from 'react';
import WeatherCode from './weatherCode';

const formatWeatherCode = (code) => {
  return code.split('_').join(' ');
};

export default ({ weather }) => {
  let weatherCode = formatWeatherCode(weather.weather_code);

  return (
    <h3 id='weather-data'>
      <p>It's currently {weather.temp}º F</p>
      {weather.temp !== weather.feels_like ? (
        <p>but it feels more like {weather.feels_like}º F</p>
      ) : null}
      <span>
        {weather.temp > 95
          ? "(it's too hot!)"
          : weather.temp < 75
          ? "(it's too cold!)"
          : null}
      </span>
      <WeatherCode code={weatherCode} />
    </h3>
  );
};
