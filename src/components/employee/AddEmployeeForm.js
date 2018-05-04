import React, { Component } from 'react'
import { Button, Form, Segment} from 'semantic-ui-react';

class AddEmployeeForm extends Component {
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
    this.addNewEmployee();
    this.toggleSubmit();
    event.preventDefault();
  }

  addNewEmployee = () => {
    fetch('https://spring-clock.herokuapp.com/rest/employee/add', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('jwt')
      },
      body: JSON.stringify({
        bizId: this.props.bizId,
        user: this.state.employeeName,
        payRate: this.state.payRate,
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

export default AddEmployeeForm