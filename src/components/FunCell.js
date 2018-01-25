import React, { Component } from 'react';
import FunButton from './FunButton';

export default class FunCell extends Component {

  render() {
    const id = this.props;
    const user = this.props;
    const payRate = this.props;
    const weeklyPay = this.props;
    const isClocked = this.props;
    return(
      <tr>
        <td>{ this.props.id }</td>
        <td>{ this.props.user }</td>
        <td>{ this.props.payRate }</td>
        <td>{ this.props.weeklyPay }</td>
        <td>{ this.props.isClocked }</td>
        <FunButton
          employeeId = { this.props.id }
        />
      </tr>
    );
  }
}