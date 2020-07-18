import React from 'react';
import { Heading } from 'theme-ui';
import WeatherForm from '../components/form';
import Result from '../components/result';

const CLIMACELL_URL = `https://api.climacell.co/v3/weather/realtime?apikey=${process.env.REACT_APP_CLIMACELL}`;
const CLIMACELL_FIELDS =
  '&unit_system=us&fields=temp,weather_code,precipitation_type,feels_like';
const GEOCODE_IO_URL = `https://api.geocod.io/v1.6/geocode?q=`;

export default class WeatherSearch extends React.Component {
  state = {
    location: {
      state: '',
      city: '',
      postal_code: '',
    },
    lat: '',
    lon: '',
    weather: {
      temp: '',
      precipitation_type: '',
      weather_code: '',
    },
    beach_day: undefined,
    vampire: false,
    vampire_weather: undefined,
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
      // use setState callback to get latitude and longitude
      () => this.getLatAndLon(this.state.location)
    );
  };

  getLatAndLon = () => {
    //format query string with location info
    let locationQueryString = '';

    locationQueryString +=
      this.state.location.city !== '' ? this.state.location.city + '+' : '';
    locationQueryString +=
      this.state.location.state !== '' ? this.state.location.state + '+' : '';
    locationQueryString +=
      this.state.location.postal_code !== ''
        ? this.state.location.postal_code
        : '';

    //get lat, lng, and city from geocodeio
    fetch(
      `${GEOCODE_IO_URL}${locationQueryString}&api_key=${process.env.REACT_APP_GEOCODEIO}`,
      {
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    )
      .then((resp) => resp.json())
      .then((data) => {
        // get the city name from the data object if city was not specified (only state and zip)
        let foundLocation = data.results[0];
        let cityName =
          this.state.location.city === ''
            ? foundLocation.address_components.city
            : this.state.location.city;
        // update state with cityName and lat/lon
        this.setState(
          (prevState) => ({
            ...prevState,
            location: {
              ...prevState.location,
              city: cityName,
            },
            lat: foundLocation.location.lat,
            lon: foundLocation.location.lng,
          }),
          // use setState callback to get weather data
          () => this.getWeatherData()
        );
      })
      .catch((err) => console.error(err));
  };

  getWeatherData = () => {
    //get weather data from climcell
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
              temp: Math.ceil(Math.round(data.temp.value)),
              feels_like: Math.ceil(Math.round(data.feels_like.value)),
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
  };

  determineBeachWeather = (weather) => {
    // if not vampire, check for beach weather
    if (!this.state.vampire) {
      let acceptableWeatherCodes = ['clear', 'mostly_clear', 'partly_cloudy'];
      if (
        weather.temp >= 75 &&
        weather.temp <= 95 &&
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
      // otherwise check for vampire weather
    } else {
      let acceptableWeatherCodes = [
        'cloudy',
        'mostly_cloudy',
        'drizzle',
        'rain',
        'rain_light',
        'fog',
        'fog_light',
      ];
      if (
        weather.temp <= 60 &&
        weather.temp >= 45 &&
        acceptableWeatherCodes.includes(weather.weather_code)
      ) {
        this.setState((prevState) => ({
          ...prevState,
          vampire_weather: true,
        }));
      } else {
        this.setState((prevState) => ({
          ...prevState,
          vampire_weather: false,
        }));
      }
    }
  };

  toggleVampireStatus = () => {
    if (!this.state.vampire) {
      this.setState((prevState) => ({
        ...prevState,
        vampire: true,
      }));
    } else {
      this.setState((prevState) => ({
        ...prevState,
        vampire: false,
      }));
    }
  };

  clearState = () => {
    this.setState({
      location: {
        state: '',
        city: '',
        postal_code: '',
      },
      lat: '',
      lon: '',
      weather: {
        temp: '',
        precipitation_type: '',
        weather_code: '',
      },
      beach_day: undefined,
      vampire: false,
      vampire_weather: undefined,
    });
  };

  render() {
    return (
      <div id='container'>
        <div id='search'>
          <Heading as='h1' id='header'>
            Is today a good beach day?
          </Heading>
          <WeatherForm
            getWeatherData={this.getWeatherData}
            submitLocation={this.submitLocation}
            clearState={this.clearState}
            vampire={this.state.vampire}
            toggleVampireStatus={this.toggleVampireStatus}
          />
        </div>

        <div
          id='result'
          className={
            (this.state.vampire && this.state.vampire_weather === undefined) ||
            this.state.vampire_weather
              ? 'vampire'
              : (this.state.vampire && !this.state.vampire_weather) ||
                this.state.beach_day === undefined ||
                this.state.beach_day
              ? 'good'
              : 'bad'
          }
        >
          <Result
            location={this.state.location}
            beach_day={this.state.beach_day}
            weather={this.state.weather}
            vampire_weather={this.state.vampire_weather}
          />
        </div>
      </div>
    );
  }
}
