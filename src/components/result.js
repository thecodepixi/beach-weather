import React from 'react';

const GoodWeather = (props) => {
  return (
    <div className='weather-result' id='good-weather'>
      <h1>It's perfect beach weather in {props.location.city}!</h1>
    </div>
  );
};

const BadWeather = (props) => {
  return (
    <div className='weather-result' id='bad-weather'>
      <h1>Today isn't the best beach day in {props.location.city}.</h1>
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
