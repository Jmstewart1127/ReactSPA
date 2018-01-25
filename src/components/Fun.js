import React, { Component } from 'react';
import FunCell from './FunCell';
import FunButton from './FunButton';

export default class Fun extends Component {
  constructor(props) {
    super(props);

    this.state = {
      arrayOfNumbers: [],
      arrayOfObjects: [],
      aString: '',
      aBoolean: false,
      clockStatus: '',
    }
  }

  setArrayOfObjects = () => {
    const employeeData = [];
    fetch('https://spring-clock.herokuapp.com/rest/get/all/employees/2')
      .then((response) => response.json())
      .then((responseJson) => {
        for (let i = 0; i < responseJson.length; i++) {
          employeeData.push(responseJson[i]);
          this.setState({
            arrayOfObjects: employeeData
          })
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  clockEmployeeInOrOut = employeeId => {
    fetch('https://spring-clock.herokuapp.com/rest/web/clock/in/out/' + employeeId)
      .then((responseJson) => {
        this.setState({ clockStatus: responseJson.id });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  setArrayOfNumbers = () => {
    const arr = [1, 2, 3, 4, 5];
    this.setState({arrayOfNumbers: arr});
  };

  componentDidMount() {
    this.setArrayOfObjects();
    this.setArrayOfNumbers();
  }

  render() {
    return(
      <div className="employee-table">
        <table>
          <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Pay Rate</th>
            <th>Period Pay</th>
            <th>Clocked In</th>
          </tr>
          </thead>
          <tbody>
            { this.state.arrayOfObjects.map((employee) => {
              const clockInOrOut = () => {
                this.clockEmployeeInOrOut(employee.id);
              };
              return(
                <FunCell
                  id = { employee.id }
                  user = { employee.user }
                  payRate = { employee.payRate }
                  weeklyPay = { employee.weeklyPay }
                  isClocked = { employee.clocked.toString() }
                />
              );
            })}
          </tbody>
        </table>
      </div>
    );

  }
}
