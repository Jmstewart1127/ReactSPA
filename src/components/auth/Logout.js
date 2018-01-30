import React, { Component } from 'react';
import { Grid, Icon, MenuItem, Button, Checkbox, Form } from 'semantic-ui-react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Login from "./Login";
import Routing from "../nav/Router";

export default class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: null,
    }
  }

  componentWillReceiveProps(newProps) {
    if (this.props.loggedIn !== newProps.loggedIn) {
      this.setState({ loggedIn: true });
    }
  }

  render() {
    const logoutFunction = this.props;
    const loginFunction = this.props;
    const loggedIn = this.props;
    if (localStorage.getItem('id') !== 'undefined') {
      return(
        <MenuItem position="right" onClick={this.props.logoutFunction}>
          <Link to="/">
            <Icon name='sign out' />Logout
          </Link>
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