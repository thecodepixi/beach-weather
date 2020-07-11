import React from 'react';
import CurrentWeather from './weatherDisplay';

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

const Result = (props) => {
  if (props.beach_day === undefined) {
    return null;
  } else {
    return (
      <div id='result-text'>
        {props.beach_day ? (
          <GoodWeather location={props.location} />
        ) : (
          <BadWeather location={props.location} />
        )}
        <CurrentWeather weather={props.weather} />
      </div>
    );
  }
};

export default Result;
