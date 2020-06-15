import React from 'react';
import { FormControl, TextField, Button } from '@material-ui/core';

export default class WeatherForm extends React.Component {
  state = {
    city: '',
    state: '',
    postal_code: '',
  };

  handleChange = (e) => {
    this.setState(
      {
        [e.target.name]: e.target.value,
      },
      () => console.log(this.state)
    );
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.submitLocation(this.state);
  };

  render() {
    return (
      <form id='search-form' onSubmit={this.handleSubmit}>
        <input
          type='text'
          id='city'
          name='city'
          value={this.state.city}
          label='City'
          onChange={this.handleChange}
        />
        {this.state.city}
        <input
          type='text'
          id='state'
          name='state'
          value={this.state.state}
          label='State'
          onChange={this.handleChange}
        />
        {this.state.state}
        <input
          type='text'
          id='postal_code'
          name='postal_code'
          value={this.state.postal_code}
          label='Postal Code'
          onChange={this.handleChange}
        />
        {this.state.postal_code}
        <button type='submit'>Submit</button>
      </form>
    );
  }
}
