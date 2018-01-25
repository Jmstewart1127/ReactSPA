import React, { Component } from 'react';
import FunList from './FunList'

export default class FunInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: '',
    }
  }

  handleInputChange = event => {
    this.setState({ inputValue: event.target.value });
  };

  render() {
    return(
      <div>
        <input type="text" value={ this.state.inputValue } onChange={ this.handleInputChange } />
        <FunList
          text = { this.state.inputValue }
        />
      </div>
    );
  }
}