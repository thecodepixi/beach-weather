import React from 'react';
import BeachWeatherDisplay from './weatherDisplay';
import VampireWeatherDisplay from './vampireWeatherDisplay';

const GoodWeather = ({ location }) => {
  // Photo by Sean O. on Unsplash
  return (
    <h2>
      It's perfect beach weather in <span id='city'>{location.city}</span>!
    </h2>
  );
};

const BadWeather = ({ location }) => {
  // Photo by Samuel Ferrara on Unsplash
  return (
    <h2>
      Today isn't the best beach day in <span id='city'>{location.city}</span>.
    </h2>
  );
};

const VampireWeather = ({ location }) => {
  return (
    <h2>
      It's a great day to be a Vampire in <span id='city'>{location.city}</span>
      .
    </h2>
  );
};

const BadVampireWeather = ({ location }) => {
  return (
    <h2>
      It's a bad day to be a Vampire in <span id='city'>{location.city}</span>.
    </h2>
  );
};

const Result = (props) => {
  if (props.beach_day !== undefined) {
    return (
      <div id='result-text'>
        {props.beach_day ? (
          <GoodWeather location={props.location} />
        ) : (
          <BadWeather location={props.location} />
        )}
        <BeachWeatherDisplay weather={props.weather} />
      </div>
    );
  } else if (props.vampire_weather !== undefined) {
    return (
      <div id='result-text'>
        {props.vampire_weather ? (
          <VampireWeather location={props.location} />
        ) : (
          <BadVampireWeather location={props.location} />
        )}
        <VampireWeatherDisplay weather={props.weather} />
      </div>
    );
  } else {
    return null;
  }
};

export default Result;
