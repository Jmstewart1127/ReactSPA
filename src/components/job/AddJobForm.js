import React, { Component } from 'react'
import { Button, Form, Segment} from 'semantic-ui-react';

class AddJobForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobAddress: '',
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
    this.addNewJob();
    this.toggleSubmit();
    event.preventDefault();
  }

  addNewJob = () => {
    fetch('https://spring-clock.herokuapp.com/rest/job/add', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bizId: this.props.bizId,
        jobAddress: this.state.jobAddress,
        customerName: this.state.customerName,
        amountCharged: this.state.amountCharged,
      })
    })
  };

  render() {
    if (this.props.visible) {
      return(
        <div className='loader'>
          <Segment>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field>
                <label>Employee Name</label>
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
              <Button type='submit' onClick={this.props.reloadData}>Submit</Button>
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