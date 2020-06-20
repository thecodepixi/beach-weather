import React from 'react';

const formatWeatherCode = (code) => {
  return code.split('_').join(' ');
};

const GoodWeather = (props) => {
  // Photo by Sean O. on Unsplash
  return (
    <div className='result-text'>
      <h2>
        It's perfect beach weather in{' '}
        <span id='city'>{props.location.city}</span>!
      </h2>
      <h3>Here's the current weather: </h3>
      <h4>Temperature: {props.weather.temp} F</h4>
      <h4>
        Weather Conditions: {formatWeatherCode(props.weather.weather_code)}
      </h4>
    </div>
  );
};

const BadWeather = (props) => {
  // Photo by Samuel Ferrara on Unsplash
  return (
    <div className='result-text'>
      <h1>
        Today isn't the best beach day in{' '}
        <span id='city'>{props.location.city}</span> because {props.reason}
      </h1>
      <h2>Here's the current weather: </h2>
      <h3>Temperature: {props.weather.temp} F</h3>
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
    return (
      <BadWeather
        location={props.location}
        weather={props.weather}
        reason={props.reason}
      />
    );
  } else {
    return null;
  }
};

export default Result;
