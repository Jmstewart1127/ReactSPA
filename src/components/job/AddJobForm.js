import React, { Component } from 'react'
import { Button, Form, Segment} from 'semantic-ui-react';

class AddJobForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobAddress: '',
      latitude: '',
      longitude: '',
      customerName: '',
      amountCharged: '',
      submitted: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleSubmit = () => {
    if (this.state.submitted) {
      this.setState({
        submitted: false,
        jobAddress: '',
        customerName: '',
        amountCharged: '',
      });
    } else {
      this.setState({
        submitted: true,
        jobAddress: '',
        customerName: '',
        amountCharged: '',
      });
    }
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSubmit(event) {
    this.getLatitudeAndLongitude();
    event.preventDefault();
  }

  getLatitudeAndLongitude = () => {
    fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + this.state.jobAddress.split(" ")
      + '&key=AIzaSyDlXAOpZfmgDvrk4G7MkD6NXxPf9yJeJo8')
      .then((response) => response.json())
      .then((responseJson) => {
        let lat = responseJson.results["0"].geometry.location.lat;
        let lng = responseJson.results["0"].geometry.location.lng;
        this.setState({
          latitude: lat,
          longitude: lng
        });
      })
      .then(() => console.log('1'))
      .then(() => this.addNewJob())
      .then(() => this.toggleSubmit())
      .catch((error) => {
        console.error(error);
      });
  }

  addNewJob = () => {
    fetch('https://spring-clock.herokuapp.com/rest/job/add', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('jwt')
      },
      body: JSON.stringify({
        bizId: this.props.bizId,
        jobAddress: this.state.jobAddress,
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        customerName: this.state.customerName,
        amountCharged: this.state.amountCharged,
      })
    })
      .then(() => console.log(this.state.jobAddress))
      .then(() => console.log('2'))
  };

  render() {
    if (this.props.visible) {
      return(
        <div className='loader'>
          <Segment>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field>
                <label>Job Address</label>
                <input
                  placeholder='Job Address'
                  value={this.state.jobAddress}
                  onChange={this.handleChange('jobAddress')}
                />
              </Form.Field>
              <Form.Field>
                <label>Customer Name</label>
                <input
                  placeholder='Customer Name'
                  value={this.state.customerName}
                  onChange={this.handleChange('customerName')}
                />
              </Form.Field>
              <Form.Field>
                <label>Amount Charged</label>
                <input
                  placeholder='Amount Charged'
                  value={this.state.amountCharged}
                  onChange={this.handleChange('amountCharged')}
                />
              </Form.Field>
              <Button type='submit' onClick={this.props.reloadData}>Add</Button>
            </Form>
          </Segment>
        </div>
      );
    } else {
      return(
        <div></div>
      );
    }
  }
}

export default AddJobForm