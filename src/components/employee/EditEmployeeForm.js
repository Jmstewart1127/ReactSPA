import React, { Component } from 'react'
import { Button, Form, Segment} from 'semantic-ui-react';

class EditEmployeeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      businessName: '',
      employeeName: '',
      payRate: '',
      submitted: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleSubmit = () => {
    if (this.state.submitted) {
      this.setState({
        submitted: false,
        businessName: '',
      });
    } else {
      this.setState({
        submitted: true,
        businessName: '',
      });
    }
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSubmit(event) {
    this.editEmployee();
    this.toggleSubmit();
    event.preventDefault();
  }

  editEmployee = () => {
    fetch('https://spring-clock.herokuapp.com/rest/employee/add', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: this.props.id,
        bizId: this.props.bizId,
        user: this.state.employeeName,
        payRate: this.state.payRate,
        totalPay: this.props.totalPay,
        clocked: this.props.clockStatus,
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
                  placeholder='Employee Name'
                  value={this.state.employeeName}
                  onChange={this.handleChange('employeeName')}
                />
              </Form.Field>
              <Form.Field>
                <label>Pay Rate</label>
                <input
                  placeholder='Pay Rate'
                  value={this.state.payRate}
                  onChange={this.handleChange('payRate')}
                />
              </Form.Field>
              <Button type='submit' onClick={this.props.reload}>Make Changes</Button>
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

export default EditEmployeeForm