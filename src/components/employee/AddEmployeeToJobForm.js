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
              };
              const removeEmployee = () => {
                this.removeEmployeeFromJob(employee.id);
              };
              return (
                <AddToJobCheckBox
                  key={employee.id}
                  jobId={this.props.jobId}
                  employeeId={employee.id}
                  employeeName={employee.user}
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