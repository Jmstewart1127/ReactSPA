import React, { Component } from 'react'
import { Button, Divider, Grid, Header, Loader, Icon,  Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import AddEmployeeForm from '../employee/AddEmployeeForm';
import EmployeeSegment from '../employee/EmployeeSegmentList';
import JobSegment from '../job/JobSegmentList';
import BusinessHeader from './BusinessHeader';
import EmployeesHeader from '../employee/EmployeeWidgetHeader';
import JobsHeader from '../job/JobWidgetHeader';
import AddJobForm from "../job/AddJobForm";

class BusinessById extends Component {
  constructor(props) {
    super(props);
    this.state = {
      businessId: props.match.params.id,
      businessData: [],
      employeeData: [],
      jobData: [],
      isLoading: true,
      employeeFormVisible: false,
      jobFormVisible: false,
    }
  }

  toggleEmployeeVisibility = () => {
    if (this.state.employeeFormVisible) {
      this.setState({employeeFormVisible: false});
    } else {
      this.setState({employeeFormVisible: true});
    }
  };

  toggleJobVisibility = () => {
    if (this.state.jobFormVisible) {
      this.setState({jobFormVisible: false});
    } else {
      this.setState({jobFormVisible: true});
    }
  };

  setBusinessData = () => {
    let id = this.state.businessId;
    fetch('https://spring-clock.herokuapp.com/rest/business/' + id, {
      headers: {'Authorization': sessionStorage.getItem('jwt')}
    })
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
    fetch('https://spring-clock.herokuapp.com/rest/employees/' + id, {
      headers: {'Authorization': sessionStorage.getItem('jwt')}
    })
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
    fetch('https://spring-clock.herokuapp.com/rest/jobs/all/' + id, {
      headers: {'Authorization': sessionStorage.getItem('jwt')}
    })
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
    const reloadEmployees = () => { setTimeout(() => { this.setEmployeeData(); }, 400); };
    const reloadJobs = () => { setTimeout(() => { this.setJobData(); }, 400); };
    const toggleEmployeeVisibility = () => { this.toggleEmployeeVisibility() };
    const toggleJobVisibility = () => { this.toggleJobVisibility() };
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
                  <Button.Group floated='right'>
                    <Link to={`/View/Employees/${this.state.businessId}`}>
                      <Button className='inner-button' icon='magnify' floated='right' size='large'/>
                    </Link>
                    <Button className='outside-button' icon='add user' floated='right' onClick={toggleEmployeeVisibility} size='large'/>
                  </Button.Group>
                  <EmployeesHeader
                    headerTitle={"Employees"}
                  />
                  <AddEmployeeForm
                    bizId={this.state.businessId}
                    visible={this.state.employeeFormVisible}
                    reloadData={reloadEmployees}
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
                  <Button className='single-button' icon='add cubes' floated='right' onClick={toggleJobVisibility} size='large'/>
                  <JobsHeader
                    headerTitle={"Job Sites"}
                  />
                  <AddJobForm
                    bizId={this.state.businessId}
                    visible={this.state.jobFormVisible}
                    reloadData={reloadJobs}
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