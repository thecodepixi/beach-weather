import React from 'react';
import WeatherCode from './weatherCode';

const formatWeatherCode = (code) => {
  return code.split('_').join(' ');
};

export default ({ weather }) => {
  let weatherCode = formatWeatherCode(weather.weather_code);
  let tooSunny = ['clear', 'mostly_clear', 'partly_cloudy'];

  return (
    <h3 id='weather-data'>
      <p>It's currently {weather.temp}º F</p>
      {weather.temp !== weather.feels_like ? (
        <p>but it feels more like {weather.feels_like}º F</p>
      ) : null}
      <WeatherCode code={weatherCode} />
      <p>
        {'('}
        {weather.temp > 60
          ? "it's too hot! "
          : weather.temp < 45
          ? "it's too cold! "
          : null}
        {tooSunny.includes(weatherCode) ? 'and way too bright!' : null}
        {')'}
      </p>
    </h3>
  );
};
