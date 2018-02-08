import React, { Component } from 'react'
import { Divider, Grid, Header, Loader, Icon,  Segment } from 'semantic-ui-react';
import EmployeeSegment from '../employee/EmployeeSegmentList';
import JobSegment from '../job/JobSegmentList';
import BusinessHeader from './BusinessHeader';
import EmployeesHeader from '../employee/EmployeeWidgetHeader';
import JobsHeader from '../job/JobWidgetHeader';

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
    this.setEmployeeData();
    this.setJobData();
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
          <Grid container divided columns='equal'>
            <Grid.Row stretched>
              <Grid.Column width={11}>
                <Segment.Group className='widget'>
                  <BusinessHeader
                    headerTitle={this.state.businessData.bizName}
                  />
                  <Segment>
                    Total Labor Cost: {this.state.businessData.ytdLaborCost}
                    <Divider hidden/>
                    Total Material Cost: {this.state.businessData.ytdMaterialCost}
                  </Segment>
                </Segment.Group>
              </Grid.Column>
              <Grid.Column floated='right' width={5}>
                <Segment.Group className='widget'>
                  <EmployeesHeader
                    headerTitle={"Employees"}
                  />
                  {this.state.employeeData.map((employee) => {
                    return (
                      <EmployeeSegment
                        id={employee.id}
                        employeeName={employee.user}
                      />
                    );
                  })}
                </Segment.Group>
                <Segment.Group className='widget'>
                  <JobsHeader
                    headerTitle={"Job Sites"}
                  />
                  {this.state.jobData.map((job) => {
                    return (
                      <JobSegment
                        id={job.id}
                        address={job.jobAddress}
                      />
                    );
                  })}
                </Segment.Group>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      );
    }
  }
}

export default BusinessById