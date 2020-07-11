import React from 'react';
import { Box, Label, Input, Button, Alert } from 'theme-ui';

export default class WeatherForm extends React.Component {
  state = {
    city: '',
    state: '',
    postal_code: '',
    submitted: false,
    invalid_submission: false,
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (
      this.state.city === '' &&
      this.state.state === '' &&
      this.state.postal_code === ''
    ) {
      this.setState((prevState) => ({
        ...prevState,
        invalid_submission: true,
      }));
      return;
    } else if (
      (this.state.state === '' && this.state.postal_code === '') ||
      (this.state.city === '' && this.state.state === '')
    ) {
      this.setState((prevState) => ({
        ...prevState,
        invalid_submission: true,
      }));
      return;
    } else {
      this.props.submitLocation(this.state);
      this.setState((prevState) => ({
        ...prevState,
        submitted: true,
        invalid_submission: false,
      }));
    }
  };

  resetSubmission = (e) => {
    e.preventDefault();
    this.setState((prevState) => ({
      ...prevState,
      submitted: false,
      city: '',
      state: '',
      postal_code: '',
    }));
    this.props.clearState();
  };

  render() {
    return (
      <>
        {this.state.invalid_submission ? (
          <Alert backgroundColor='accent'>
            Please fill out the form with at least City and State, or State and
            Postal Code information.
          </Alert>
        ) : null}
        <Box as='form' id='search-form' onSubmit={this.handleSubmit}>
          <Label htmlFor='city'>City: </Label>
          <Input
            type='text'
            id='city'
            name='city'
            value={this.state.city}
            label='City'
            onChange={this.handleChange}
          />
          <Label htmlFor='state'>State: </Label>
          <Input
            type='text'
            id='state'
            name='state'
            value={this.state.state}
            label='State'
            onChange={this.handleChange}
          />
          <Label htmlFor='postal_code'>Postal Code: </Label>
          <Input
            type='text'
            id='postal_code'
            name='postal_code'
            value={this.state.postal_code}
            label='Postal Code'
            onChange={this.handleChange}
          />
          <div id='form-buttons'>
            <Button id='submit' type='submit' backgroundColor='secondary'>
              Submit
            </Button>
            <Button
              id='reset'
              onClick={this.resetSubmission}
              backgroundColor='accent'
            >
              Reset Search
            </Button>
          </div>
        </Box>
      </>
    );
  }
}
