import React from 'react';

const formatWeatherCode = (code) => {
  return code.split('_').join(' ');
};

const GoodWeather = (props) => {
  // Photo by Sean O. on Unsplash
  return (
    <div id='result-text'>
      <h2>
        It's perfect beach weather in{' '}
        <span id='city'>{props.location.city}</span>!
      </h2>
      <h3>
        <p>
          Right now it's {props.weather.temp}F
          {props.weather.temp !== props.weather.feels_like ? (
            <span>
              <br />( but it feels more like {props.weather.feels_like}F )
            </span>
          ) : null}{' '}
        </p>
        <p>and the sky is {formatWeatherCode(props.weather.weather_code)}.</p>
      </h3>
    </div>
  );
};

const BadWeather = (props) => {
  // Photo by Samuel Ferrara on Unsplash
  return (
    <div id='result-text'>
      <h2>
        Today isn't the best beach day in{' '}
        <span id='city'>{props.location.city}</span>.
      </h2>
      <h3>
        <p>
          Right now it's {props.weather.temp}F
          {props.weather.temp !== props.weather.feels_like ? (
            <span>
              <br />( but it feels more like {props.weather.feels_like}F )
            </span>
          ) : null}{' '}
        </p>
        <p>and the sky is {formatWeatherCode(props.weather.weather_code)}.</p>
      </h3>
    </div>
  );
};

const Result = (props) => {
  if (props.beach_day === undefined) {
    return null;
  } else {
    return props.beach_day ? (
      <GoodWeather location={props.location} weather={props.weather} />
    ) : (
      <BadWeather location={props.location} weather={props.weather} />
    );
  }
};

export default Result;
