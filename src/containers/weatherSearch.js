import React from 'react';
import Typography from '@material-ui/core/Typography';
import WeatherForm from '../components/form';

const CLIMACELL_URL = `https://www.api.climacell.co/v3/weather/realtime/apikey=${process.env.REACT_APP_CLIMACELL}`;
const FIELDS = '&fields=temp,weather_code,precipitation_type';
const locIQ_URL = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCIQ}&limit=1&q=`;

export default class WeatherSearch extends React.Component {
  state = {
    location: {
      state: undefined,
      city: undefined,
      postal_code: undefined,
    },
    lat: undefined,
    lon: undefined,
    weather: {},
    beach_day: undefined,
  };

  submitLocation = (location) => {
    this.setState(
      {
        ...this.state,
        location: {
          state: location.state,
          city: location.city,
          postal_code: location.postal_code,
        },
      },
      () =>
        this.getWeatherData([
          this.state.location.city,
          this.state.location.state,
          this.state.location.postal_code,
        ])
    );
  };

  getWeatherData = (location) => {
    //first get lat + lon from locIQ
    let locationParams = location.filter((i) => i !== '').join('+');
    fetch(`${locIQ_URL}${locationParams}&format=json`, {
      'Content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    })
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({
          ...this.state,
          lat: data[0].lat,
          lon: data[0].lon,
        });
      })
      //get data from climcell. currently getting cors rejection
      .then(() => {
        fetch(
          `${CLIMACELL_URL}&lat=${this.state.lat}&lon=${this.state.lon}${FIELDS}`,
          {
            Accept: '*/*',
            'Access-Control-Allow-Origin': '*',
          }
        )
          .then((resp) => resp.json())
          .then((data) => {
            console.log(data);
          });
      })
      .catch((err) => console.error(err));
  };

  render() {
    return (
      <>
        <Typography variant='h1' component='h1'>
          Is today a good beach day?
        </Typography>
        <WeatherForm
          getWeatherData={this.getWeatherData}
          submitLocation={this.submitLocation}
        />
      </>
    );
  }
}
