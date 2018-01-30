import React, { Component } from 'react';
import { Grid, Icon, MenuItem, Button, Checkbox, Form } from 'semantic-ui-react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Login from "./Login";
import Routing from "../nav/Router";

export default class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    }
  }

  logout = () => {
    localStorage.setItem('id', 'undefined');
    this.setState({ loggedIn: false });
  };

  render() {
    const logoutFunction = () => {
      this.logout();
    };
    const loginFunction = this.props;
    if (localStorage.getItem('id') !== 'undefined' && !this.state.loggedIn) {
      return(
        <MenuItem position="right" onClick={logoutFunction}>
          <Icon name='sign out' />Logout
        </MenuItem>
      );
    } else {
      return(
        <MenuItem position="right" onClick={this.props.loginFunction}>
          <Link to="/">
            <Icon name='sign in' />Login
          </Link>
        </MenuItem>
      );
    }
  }
}