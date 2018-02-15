import React, { Component } from 'react'
import { Button, Form, Segment} from 'semantic-ui-react';
import AddToJobCheckBox from '../misc/AddEmployeeToJobCheckBox';

class AddEmployeeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      businessName: '',
      employeeName: '',
      employeesOnJob: [],
      employeeIds: [],
      employeeIdsOnJob: [],
      scheduleData: [],
      isOnJob: false,
      submitted: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleSubmit = () => {
    if (this.state.submitted) {
      this.setState({
        submitted: false,
        businessName: '',
      });
    } else {
      this.setState({
        submitted: true,
        businessName: '',
      });
    }
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSubmit(event) {
    this.addNewEmployee();
    this.toggleSubmit();
    event.preventDefault();
  }

  setEmployeeData = () => {
    let id = this.props.bizId;
    const employeeData = [];
    const ids = [];
    fetch('https://spring-clock.herokuapp.com/rest/employees/' + id)
      .then((response) => response.json())
      .then((responseJson) => {
        for (let i = 0; i < responseJson.length; i++) {
          ids.push(responseJson[i].id);
        }

        this.setState({
          employeeIds: ids,
          employeeData: responseJson,
          isLoading: false,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  componentDidMount() {
    this.setEmployeeData();
  }

  render() {
    if (this.props.visible) {
      return(
        <div className='loader'>
          <Segment>
            {this.state.employeeData.map((employee) => {
              const addEmployee = () => {
                this.addEmployeeToJob(employee.id);
                this.setEmployeeData();
              };
              const removeEmployee = () => {
                this.removeEmployeeFromJob(employee.id);
                this.setEmployeeData();
              };
              return (
                <AddToJobCheckBox
                  key={employee.id}
                  jobId={this.props.jobId}
                  employeeId={employee.id}
                  employeeName={employee.user}
                />
              );
            })}
          </Segment>
        </div>
      );
    } else {
      return(
        <div></div>
      );
    }
  }
}

export default AddEmployeeForm