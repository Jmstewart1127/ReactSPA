import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Grid, Header, Icon, Segment } from 'semantic-ui-react'

export default class NewUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      passwordReType: '',
      loggedIn: false,
    }
  }

  create = () => {
    if (this.state.password === this.state.passwordReType) {
      fetch('https://spring-clock.herokuapp.com/rest/user/create', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: this.state.username,
          password: this.state.password,
          role: "admin",
          enabled: true
        })
      })
    }
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSubmit = event => {
    this.create();
    event.preventDefault();
  };

  render() {
    return(
      <div className='loader'>
        <Grid container centered columns={3}>
          <Grid.Column>
            <Segment className='widget'>
              <Header as='h2' className='main-widget-header'>
                <Icon name='add user' size='small'/>
                <Header.Content>
                  {'Create Account'}
                </Header.Content>
              </Header>
              <Segment>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Field>
                    <label>Username</label>
                    <input
                      placeholder='username'
                      value={this.state.username}
                      onChange={this.handleChange('username')}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Password</label>
                    <input
                      type='password'
                      placeholder='password'
                      value={this.state.password}
                      onChange={this.handleChange('password')}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Re-Type Password</label>
                    <input
                      type='password'
                      placeholder='re-type password'
                      value={this.state.passwordReType}
                      onChange={this.handleChange('passwordReType')}
                    />
                  </Form.Field>
                  <Link to={'/'}>
                    <Button type='submit'>Submit</Button>
                  </Link>
                </Form>
              </Segment>
            </Segment>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
