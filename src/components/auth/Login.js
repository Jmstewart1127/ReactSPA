import React, { Component } from 'react';
import { Grid, Button, Checkbox, Form } from 'semantic-ui-react'

export default class FunLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: '',
      username: '',
      password: '',
      loggedIn: false,
    }
  }

  getUserId = (username, password) => {
    fetch('https://spring-clock.herokuapp.com/rest/login/' + username + '/' + password)
      .then((response) => response.json())
      .then((responseJson) => {
        localStorage.setItem('id', responseJson.id);
        this.setState({ loggedIn: true });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  handleUserNameChange = event => {
    this.setState({username: event.target.value});
  };

  handlePassWordChange = event => {
    this.setState({password: event.target.value});
  };

  handleSubmit = event => {
    this.getUserId(this.state.username, this.state.password);
    event.preventDefault();
    localStorage.setItem('id', this.state.userId);
    this.setState({
      loggedIn: true,
    })
  };

  render() {
    if (localStorage.getItem('id') === 'undefined') {
      return(
        <div>
          <Grid container centered columns={3}>
            <Grid.Column>
              <Form className='login-form' onSubmit={this.handleSubmit}>
                <Form.Field>
                  <label>Username</label>
                  <input
                    placeholder='Username'
                    value={this.state.username}
                    onChange={this.handleUserNameChange}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Password</label>
                  <input
                    placeholder='Password'
                    type="password"
                    value={this.state.password}
                    onChange={this.handlePassWordChange}
                  />
                </Form.Field>
                <Button className='login-submit-button' type='submit'>Submit</Button>
              </Form>
            </Grid.Column>
          </Grid>
        </div>
      );
    } else {
      return(
        <div className="login-form">
          <Grid centered columns={2}>
            <Grid.Column>
              <h3>Welcome!</h3>
            </Grid.Column>
          </Grid>
        </div>
      );
    }
  }
}