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

  getEmployeesAssignedToJob = () => {
    let id = this.props.jobId;
    fetch('https://spring-clock.herokuapp.com/rest/jobs/assigned/employees/' + id)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({
          employeesOnJob: responseJson,
          isLoading: false,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  setEmployeeData = () => {
    let id = this.props.bizId;
    fetch('https://spring-clock.herokuapp.com/rest/employees/' + id)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          employeeData: responseJson,
          isLoading: false,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  removeEmployeeFromJob = employeeId => {
    fetch('https://spring-clock.herokuapp.com/rest/schedule/delete', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bizId: this.props.bizId,
        clockId: employeeId,
        jobId: this.props.jobId,
      })
    })
  };

  addEmployeeToJob = employeeId => {
    fetch('https://spring-clock.herokuapp.com/rest/jobs/assign/single/employee', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bizId: this.props.bizId,
        clockId: employeeId,
        jobId: this.props.jobId,
      })
    })
  };

  findEmployeesAlreadyOnJob = employeeId => {
    for (let i = 0; i < this.props.employeesOnJob.length; i++) {
      if (this.props.employeesOnJob[i].id === employeeId) {
        return true;
      } else {
        return false;
      }
    }
  };

  componentDidMount() {
    this.setEmployeeData();
    this.findEmployeesAlreadyOnJob(2);
    console.log(this.props.bizId);
  }

  render() {
    if (this.props.visible) {
      return(
        <div className='loader'>
          <Segment>
            {this.state.employeeData.map((employee) => {
              const addEmployee = () => {
                this.addEmployeeToJob(employee.id);
              };
              const removeEmployee = () => {
                this.removeEmployeeFromJob(employee.id);
              };
              const isOnJob = () => {
                this.findEmployeesAlreadyOnJob(employee.id);
              };
              return (
                <AddToJobCheckBox
                  employeeName={employee.user}
                  isOnJob={isOnJob}
                  handleAdd={addEmployee}
                  handleRemove={removeEmployee}
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