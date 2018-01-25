import React, { Component } from 'react';

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

  logout = () => {
    localStorage.setItem('id', 'undefined');
    this.setState({ loggedIn: false });
  };

  render() {
    if (localStorage.getItem('id') === 'undefined') {
      return(
        <div className="login-form">
          <form onSubmit={this.handleSubmit}>
            Username:
            <input type="text" value={this.state.username} onChange={this.handleUserNameChange} /><br></br>
            Password:
            <input type="password" value={this.state.password} onChange={this.handlePassWordChange} /><br></br>
            <input type="submit" value="submit" />
          </form>
        </div>
      );
    } else {
      return(
        <div className="login-form">
          <button onClick={this.logout}>Logout</button>
        </div>
      );
    }
  }
}