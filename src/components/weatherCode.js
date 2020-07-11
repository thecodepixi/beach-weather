import React from 'react';

export default ({ code }) => {
  const handleWeatherCode = (code) => {
    switch (code) {
      case 'clear':
      case 'partly cloudy':
      case 'cloudy':
      case 'mostly clear':
      case 'mostly cloudy':
        return <p>and the sky is {code}</p>;
      default:
        return (
          <p>
            and there's some inclement weather!
            <p>
              Weather Type: <span id='weather-type'>{code}</span>{' '}
            </p>
          </p>
        );
    }
  };

  return handleWeatherCode(code);
};
