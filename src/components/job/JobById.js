import React, { Component } from 'react'
import { Button, Divider, Grid, Header, Loader, Icon, Segment } from 'semantic-ui-react';
import AddEmployeeToJob from '../employee/AddEmployeeToJobForm';
import EmployeeHeader from '../employee/EmployeeWidgetHeader';
import EmployeeSegment from '../employee/EmployeeSegmentList';
import BusinessSegment from '../business/BusinessSegmentList';

class JobById extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobId: props.match.params.id,
      businessData: [],
      employeeData: [],
      jobData: [],
      addEmployeeVisibility: false,
      isLoading: true,
    }
  }

  toggleEmployeeVisibility = () => {
    if (this.state.addEmployeeVisibility) {
      this.setState({addEmployeeVisibility: false});
    } else {
      this.setState({addEmployeeVisibility: true});
    }
  };

  setBusinessData = () => {
    let id = this.state.jobData.bizId;
    fetch('https://spring-clock.herokuapp.com/rest/business/' + id)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          businessData: responseJson,
          isLoading: false,
        });
        console.log(this.state.businessData);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  setEmployeeData = () => {
    let id = this.state.jobId;
    fetch('https://spring-clock.herokuapp.com/rest/jobs/assigned/employees/' + id)
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
    let id = this.state.jobId;
    fetch('https://spring-clock.herokuapp.com/rest/get/job/' + id)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          jobData: responseJson,
          isLoading: false,
        });
        console.log(this.state.jobData);
      })
      .then(() => this.setBusinessData())
      .catch((error) => {
        console.error(error);
      });
  };

  componentDidMount() {
    this.setJobData();
    this.setEmployeeData();
  }

  render() {
    const toggleEmployeeVisibility = () => { this.toggleEmployeeVisibility(); };
    if (this.state.isLoading) {
      return (
        <div className='loader'>
          <Loader active size='massive' inline='centered'/>
        </div>
      );
    } else {
      return (
        <div>
          <Grid container divided columns='equal'>
            <Grid.Row stretched>
              <Grid.Column width={11}>
                <Segment.Group className='widget'>
                  <Header as='h2' className='main-widget-header'>
                    <Icon name='cubes' size='small'/>
                    <Header.Content>
                      {this.state.jobData.jobAddress}
                    </Header.Content>
                  </Header>
                  <Segment>
                    Total Labor Cost: {this.state.employeeData.payRate}
                    <Divider hidden/>
                    Total Material Cost: {this.state.employeeData.weeklyPay}
                  </Segment>
                </Segment.Group>
              </Grid.Column>
              <Grid.Column floated='right' width={5}>
                <Segment.Group className='widget'>
                  <Button icon='add' floated='right' onClick={toggleEmployeeVisibility} size='large'/>
                  <EmployeeHeader
                    headerTitle={"Employees"}
                  />
                  <AddEmployeeToJob
                    visible={this.state.addEmployeeVisibility}
                    bizId={this.state.jobData.bizId}
                    jobId={this.state.jobId}
                    employeesOnJob={this.state.employeeData}
                  />
                  {this.state.employeeData.map((employee) => {
                    return (
                      <EmployeeSegment
                        key={employee.id}
                        id={employee.id}
                        employeeName={employee.user}
                      />
                    );
                  })}
                </Segment.Group>
                <Segment.Group className='widget'>
                  <Header as='h2' className='widget-header'>
                    <Icon name='university' size='small'/>
                    <Header.Content>
                      Business
                    </Header.Content>
                  </Header>
                  <BusinessSegment
                    id={this.state.businessData.id}
                    bizName={this.state.businessData.bizName}
                  />
                </Segment.Group>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      );
    }
  }
}

export default JobById