import React, { Component } from 'react';
import { Checkbox } from 'semantic-ui-react';

class AddEmployeeToJobCheckBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employeeIdsOnJob: [],
      isOnJob: false,
    }
  }

  getEmployeesAssignedToJob = () => {
    let id = this.props.jobId;
    const ids = [];
    fetch('https://spring-clock.herokuapp.com/rest/jobs/assigned/employees/' + id, {
      headers: {'Authorization': sessionStorage.getItem('jwt')}
    })
      .then((response) => response.json())
      .then((responseJson) => {
        for (let i = 0; i < responseJson.length; i++) {
          ids.push(responseJson[i].id);
        }
        this.setState({
          employeeIdsOnJob: ids,
        });
      })
      .then(() => this.checkIfOnJob())
      .catch((error) => {
        console.error(error);
      });
  };

  addEmployeeToJob = () => {
    fetch('https://spring-clock.herokuapp.com/rest/jobs/assign/single/employee', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('jwt'),
      },
      body: JSON.stringify({
        bizId: this.props.bizId,
        clockId: this.props.employeeId,
        jobId: this.props.jobId,
      })
    })
      .then(() => {
        this.setState({ isOnJob: true });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  removeEmployeeFromJob = () => {
    let clockId = this.props.employeeId;
    let jobId = this.props.jobId;
    console.log(clockId + " " + jobId);
    fetch('https://spring-clock.herokuapp.com/rest/schedule/delete/' + clockId + '/' + jobId, {
      headers: {'Authorization': sessionStorage.getItem('jwt')}
    })
      .then(() => {
        this.setState({isOnJob: false});
      })
      .then(() => {
        this.getEmployeesAssignedToJob();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  checkIfOnJob = () => {
    for (let i = 0; i < this.state.employeeIdsOnJob.length; i++) {
      if (this.state.employeeIdsOnJob[i] === this.props.employeeId) {
        this.setState({ isOnJob: true });
      }
    }
  };

  componentDidMount() {
    this.getEmployeesAssignedToJob();
  }

  render() {
    const addEmployeeToJob = () => {
      this.addEmployeeToJob();
    };
    const removeEmployeeFromJob = () => {
      this.removeEmployeeFromJob();
    };
    if (this.state.isOnJob) {
      return(
        <div>
          <Checkbox
            label={this.props.employeeName}
            onClick={removeEmployeeFromJob}
            checked={true}
          />
        </div>
      );
    } else {
      return(
        <div>
          <Checkbox
            label={this.props.employeeName}
            onClick={addEmployeeToJob}
          />
        </div>
      );
    }
  }
}

export default AddEmployeeToJobCheckBox