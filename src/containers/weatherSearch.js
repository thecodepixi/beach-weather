import React from 'react';
import Typography from '@material-ui/core/Typography';
import WeatherForm from '../components/form';
import Result from '../components/result';

const CLIMACELL_URL = `https://api.climacell.co/v3/weather/realtime?apikey=${process.env.REACT_APP_CLIMACELL}`;
const CLIMACELL_FIELDS =
  '&unit_system=us&fields=temp,weather_code,precipitation_type';
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
    weather: {
      temp: undefined,
      precipitation_type: undefined,
      weather_code: undefined,
    },
    beach_day: undefined,
  };

  submitLocation = (location) => {
    this.setState(
      (prevState) => ({
        ...prevState,
        location: {
          state: location.state,
          city: location.city,
          postal_code: location.postal_code,
        },
      }),
      () =>
        this.getWeatherData([
          this.state.location.city,
          this.state.location.state,
          this.state.location.postal_code,
        ])
    );
  };

  determineBeachWeather = (weather) => {
    let acceptableWeatherCodes = ['clear', 'mostly_clear', 'partly_cloudy'];
    if (
      weather.temp > 75 &&
      weather.temp < 95 &&
      weather.precipitation_type === 'none' &&
      acceptableWeatherCodes.includes(weather.weather_code)
    ) {
      this.setState((prevState) => ({
        ...prevState,
        beach_day: true,
      }));
    } else {
      this.setState((prevState) => ({
        ...prevState,
        beach_day: false,
      }));
    }
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
        // update state with latitude and longitude
        this.setState((prevState) => ({
          ...prevState,
          location: {
            ...prevState.location,
            //if user provided a city name, leave it alone, if not replace with the city name from LocationIQ
            city:
              prevState.location.city === ''
                ? data[0].display_name.split(',')[0]
                : prevState.location.city,
          },
          lat: data[0].lat,
          lon: data[0].lon,
        }));
      })
      //get weather data from climcell
      .then(() => {
        fetch(
          CLIMACELL_URL +
            `&lat=${this.state.lat}&lon=${this.state.lon}` +
            CLIMACELL_FIELDS
        )
          .then((resp) => resp.json())
          .then((data) => {
            // update state with weather info
            this.setState(
              (prevState) => ({
                ...prevState,
                weather: {
                  temp: data.temp.value,
                  precipitation_type: data.precipitation_type.value,
                  weather_code: data.weather_code.value,
                },
              }),
              // use setState callback to determine beach weather
              () => {
                this.determineBeachWeather(this.state.weather);
              }
            );
          })
          .catch((err) => console.error(err));
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
        <Result
          location={this.state.location}
          beach_day={this.state.beach_day}
          weather={this.props.weather}
        />
      </>
    );
  }
}
