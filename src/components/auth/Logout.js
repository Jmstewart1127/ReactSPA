import React, { Component } from 'react';
import { Icon, MenuItem } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

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