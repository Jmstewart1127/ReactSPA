import React, { Component } from 'react'
import { Button, Form, Segment} from 'semantic-ui-react';

class AddBusinessForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      businessName: '',
      submitted: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleSubmit = () => {
    if (this.state.submitted) {
      this.setState({submitted: false});
    } else {
      this.setState({submitted: true});
    }
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSubmit(event) {
    this.addNewBusiness();
    this.toggleSubmit();
    event.preventDefault();
  }

  addNewBusiness = () => {
    fetch('https://spring-clock.herokuapp.com/rest/business/add', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        adminId: localStorage.getItem('id'),
        bizName: this.state.businessName,
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
                <label>Business Name</label>
                <input
                  placeholder='Business Name'
                  value={this.state.businessName}
                  onChange={this.handleChange('businessName')}
                />
              </Form.Field>
              <Button type='submit' onClick={this.props.submit}>Submit</Button>
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

export default AddBusinessForm