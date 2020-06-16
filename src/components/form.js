import React from 'react';
import { FormControl, TextField, Button } from '@material-ui/core';

export default class WeatherForm extends React.Component {
  state = {
    city: '',
    state: '',
    postal_code: '',
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      city: '',
      state: '',
      postal_code: '',
    });
    this.props.submitLocation(this.state);
  };

  render() {
    return (
      <form id='search-form' onSubmit={this.handleSubmit}>
        <TextField
          type='text'
          id='city'
          name='city'
          value={this.state.city}
          label='City'
          onChange={this.handleChange}
        />
        {this.state.city}
        <TextField
          type='text'
          id='state'
          name='state'
          value={this.state.state}
          label='State'
          onChange={this.handleChange}
        />
        {this.state.state}
        <TextField
          type='text'
          id='postal_code'
          name='postal_code'
          value={this.state.postal_code}
          label='Postal Code'
          onChange={this.handleChange}
        />
        {this.state.postal_code}
        <FormControl>
          <Button type='submit'>Submit</Button>
        </FormControl>
      </form>
    );
  }
}
