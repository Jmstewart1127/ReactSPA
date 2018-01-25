import React, { Component } from 'react';

export default class FunList extends Component {
  render() {
    const text = this.props;
    return(
      <p className="fun-list">{ this.props.text }</p>
    );
  }
}