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
    fetch('https://spring-clock.herokuapp.com/rest/jobs/assigned/employees/' + id)
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
    if (this.state.isOnJob) {
      return(
        <div>
          <Checkbox
            label={this.props.employeeName}
            onClick={this.props.handleRemove}
            checked={true}
          />
        </div>
      );
    } else {
      return(
        <div>
          <Checkbox
            label={this.props.employeeName}
            onClick={this.props.handleAdd}
          />
        </div>
      );
    }
  }
}

export default AddEmployeeToJobCheckBox