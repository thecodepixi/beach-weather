import React from 'react';

// const CLIMACELL_URL = `https://www.api.climacell.co/v3/weather/realtime/apikey=${process.env.REACT_APP_CLIMACELL}`;
// const FIELDS = '&fields=temp,weather_code,precipitation_type';
const locIQ_URL = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCIQ}&limit=1&q=`;

const getWeatherData = (location) => {
  let locationParams = location.split(' ').join('+');
  fetch(`${locIQ_URL}${locationParams}&format=json`, {
    'Content-type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  })
    .then((resp) => resp.json())
    .then((data) => console.log(data))
    .catch((err) => console.error(err));
};

export default class WeatherSearch extends React.Component {
  componentDidMount() {
    getWeatherData('navesink new jersey');
  }

  render() {
    return <h1>This is a container</h1>;
  }
}
