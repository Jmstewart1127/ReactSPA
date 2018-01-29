import React, { Component } from 'react';
import { Grid, Icon, MenuItem, Button, Checkbox, Form } from 'semantic-ui-react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Login from "./FunLogin";

export default class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    }
  }

  render() {
    const logoutFunction = this.props;
    const loginFunction = this.props;
    if (localStorage.getItem('id') !== 'undefined') {
      return(
        <MenuItem position="right" onClick={this.props.logoutFunction}>
          <Icon name='sign out' />Logout
        </MenuItem>
      );
    } else {
      return(
        <Router>
          <MenuItem position="right">
            <Link to="/">
              <Icon name='sign in' />Login
            </Link>
          </MenuItem>
        </Router>
      );
    }
  }
}