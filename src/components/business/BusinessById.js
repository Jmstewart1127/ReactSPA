import React, { Component } from 'react'
import { Grid, Header, Button, Loader, Icon,  Segment, Table } from 'semantic-ui-react';
import EmployeeList from '../employee/EmoployeeList';
import EmployeeSegment from '../employee/EmployeeSegmentList';

class BusinessById extends Component {
  constructor(props) {
    super(props);
    this.state = {
      businessId: props.match.params.id,
      businessData: [],
      employeeData: [],
      jobData: [],
      isLoading: true,
    }
  }

  setBusinessData = () => {
    let id = this.state.businessId;
    fetch('https://spring-clock.herokuapp.com/rest/business/' + id)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          businessData: responseJson,
          isLoading: false,
        });
        console.log(this.state.businessData);
      })
      .then(() => {this.setJobData()})
      .then(() => {this.setEmployeeData()})
      .catch((error) => {
        console.error(error);
      });
  };

  setEmployeeData = () => {
    let id = this.state.businessId;
    fetch('https://spring-clock.herokuapp.com/rest/employees/' + id)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          employeeData: responseJson,
          isLoading: false,
        });
        console.log(this.state.employeeData);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  setJobData = () => {
    let id = this.state.businessId;
    fetch('https://spring-clock.herokuapp.com/rest/jobs/all/' + id)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          jobData: responseJson,
          isLoading: false,
        });
        console.log(this.state.jobData);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  componentDidMount() {
    this.setBusinessData();
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div className='loader'>
          <Loader active size='massive' inline='centered'/>
        </div>
      );
    } else {
      return (
        <div>
          <Grid container divided columns={3}>
            <Grid.Row verticalAlign='top'>
              <Grid.Column floated='right'>
                <Header as='h2' className='top-row-header'>
                  <Icon name='users' size='small'/>
                  <Header.Content>
                    Employees
                  </Header.Content>
                </Header>
                {this.state.employeeData.map((employee) => {
                  return (
                    <EmployeeSegment
                      employeeName={employee.user}
                    />
                  );
                })}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row verticalAlign='middle'>
              <Grid.Column floated='right'>
                <Header as='h2'>
                  <Icon name='cubes' size='small'/>
                  <Header.Content>
                    Job Sites
                  </Header.Content>
                </Header>
                {this.state.jobData.map((job) => {
                  return (
                    <EmployeeSegment
                      employeeName={job.jobAddress}
                    />
                  );
                })}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      );
    }
  }
}

export default BusinessById