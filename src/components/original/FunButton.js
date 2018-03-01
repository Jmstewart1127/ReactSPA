import React, { Component } from 'react';

export default class FunButton extends Component {

  clockEmployeeInOrOut = employeeId => {
    fetch('https://spring-clock.herokuapp.com/rest/web/clock/in/out/' + employeeId, {
      headers: {'Authorization': sessionStorage.getItem('jwt')}
    })
      .then((responseJson) => {
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    const employeeId = this.props;
    const handleClockInOut = () => {
      this.clockEmployeeInOrOut(this.props.employeeId)
    };
    return (
      <button className="clock-in-out-button" onClick={handleClockInOut}>Clock In/Out</button>
    );
  }
}

