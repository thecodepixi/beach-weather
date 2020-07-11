import React from 'react';
import { Heading } from 'theme-ui';
import WeatherForm from '../components/form';
import Result from '../components/result';

const CLIMACELL_URL = `https://api.climacell.co/v3/weather/realtime?apikey=${process.env.REACT_APP_CLIMACELL}`;
const CLIMACELL_FIELDS =
  '&unit_system=us&fields=temp,weather_code,precipitation_type,feels_like';
const locIQ_URL = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCIQ}&limit=1`;

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
      () => this.getWeatherData(this.state.location)
    );
  };

  determineBeachWeather = (weather) => {
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

  getWeatherData = (location) => {
    //first get lat + lon from locIQ
    let locationQueryString = `${
      location.city !== '' ? '&city=' + location.city.split(' ').join('+') : ''
    }${
      location.state !== ''
        ? '&state=' + location.state.split(' ').join('+')
        : ''
    }${
      location.postal_code !== '' ? '&postalcode=' + location.postal_code : ''
    }`;
    fetch(`${locIQ_URL}${locationQueryString}&format=json`, {
      'Content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    })
      .then((resp) => resp.json())
      .then((data) => {
        // update state with latitude and longitude
        let cityName =
          this.state.location.city === ''
            ? data[0].display_name.split(',')[
                data[0].display_name.split(',').length - 5
              ]
            : this.state.location.city;
        this.setState((prevState) => ({
          ...prevState,
          location: {
            ...prevState.location,
            //if user provided a city name, leave it alone, if not replace with the city name from LocationIQ
            city: cityName,
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
      })
      .catch((err) => console.error(err));
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
