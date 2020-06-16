import React from 'react';

const formatWeatherCode = (code) => {
  return code.split('_').join(' ');
};

const GoodWeather = (props) => {
  return (
    <div className='weather-result' id='good-weather'>
      <h1>It's perfect beach weather in {props.location.city}!</h1>
      <h2>Here's the current weather: </h2>
      <h3>Temperature: {props.weather.temp}</h3>
      <h3>
        Weather Conditions: {formatWeatherCode(props.weather.weather_code)}
      </h3>
    </div>
  );
};

const BadWeather = (props) => {
  return (
    <div className='weather-result' id='bad-weather'>
      <h1>Today isn't the best beach day in {props.location.city}.</h1>
      <h2>Here's the current weather: </h2>
      <h3>Temperature: {props.weather.temp}</h3>
      <h3>
        Weather Conditions: {formatWeatherCode(props.weather.weather_code)}
      </h3>
      {props.weather.precipitation_type !== 'none' ? (
        <h3>Precipitation: {props.weather.precipitation_type}</h3>
      ) : null}
    </div>
  );
};

const Result = (props) => {
  if (props.beach_day === true) {
    return <GoodWeather location={props.location} weather={props.weather} />;
  } else if (props.beach_day === false) {
    return <BadWeather location={props.location} weather={props.weather} />;
  } else {
    return null;
  }
};

export default Result;
