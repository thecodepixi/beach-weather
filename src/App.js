import React from 'react';
import './App.css';
import { ThemeProvider } from 'theme-ui';
import theme from './theme';
import WeatherSearch from './containers/weatherSearch';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <WeatherSearch />
    </ThemeProvider>
  );
}

export default App;
