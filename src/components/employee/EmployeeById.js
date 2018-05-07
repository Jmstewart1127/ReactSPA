import React, { Component } from 'react'
import { Button, Divider, Grid, Header, Loader, Icon,  Segment } from 'semantic-ui-react';
import { EditEmployeeForm } from '../employee';
import { BusinessSegmentList } from '../business';
import DeleteUser from '../misc/DeleteUser';
import JobSegment from '../job/JobSegmentList';

class BusinessById extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employeeId: props.match.params.id,
      businessData: [],
      employeeData: [],
      jobData: [],
      editEmployeeVisible: false,
      isLoading: true,
    }
  }

  toggleEditEmployeeVisibility = () => {
    if (this.state.editEmployeeVisible) {
      this.setState({editEmployeeVisible: false});
    } else {
      this.setState({editEmployeeVisible: true});
    }
  };

  setBusinessData = () => {
    let id = this.state.employeeData.bizId;
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
    let id = this.state.employeeId;
    fetch('https://spring-clock.herokuapp.com/rest/employee/' + id, {
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
      .then(() => this.setJobData())
      .then(() => this.setBusinessData())
      .catch((error) => {
        console.error(error);
      });
  };

  setJobData = () => {
    let id = this.state.employeeId;
    fetch('https://spring-clock.herokuapp.com/rest/jobs/assigned/employee/' + id, {
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

  reloadEmployeeData = () => {
    setTimeout(() => {this.setEmployeeData()}, 500);
  };

  componentDidMount() {
    this.setEmployeeData();
  }

  render() {
    const totalPay = Math.round(this.state.employeeData.totalPay * 100) / 100;
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
                  <Button.Group floated='right'>
                    <DeleteUser
                      id={this.state.employeeData.id}
                      bizId={this.state.employeeData.bizId}
                      employeeName={this.state.employeeData.user}
                    />
                    <Button
                      className='single-button'
                      icon='configure'
                      floated='right'
                      size='large'
                      onClick={this.toggleEditEmployeeVisibility}
                    />
                  </Button.Group>
                  <Header as='h2' className='main-widget-header-with-button'>
                    <Icon name='user' size='small'/>
                    <Header.Content>
                      {this.state.employeeData.user}
                    </Header.Content>
                  </Header>
                  <Segment>
                    Pay Rate: ${this.state.employeeData.payRate}
                    <Divider hidden/>
                    Pay For This Period: ${totalPay}
                  </Segment>
                  <EditEmployeeForm
                    id={this.state.employeeData.id}
                    bizId={this.state.employeeData.bizId}
                    totalPay={totalPay}
                    clockStatus={this.state.employeeData.clocked}
                    reload={this.reloadEmployeeData}
                    visible={this.state.editEmployeeVisible}
                  />
                </Segment.Group>
              </Grid.Column>
              <Grid.Column floated='right' width={5}>
                <Segment.Group className='widget'>
                  <Header as='h2' className='widget-header'>
                    <Icon name='university' size='small'/>
                    <Header.Content>
                      Employed At
                    </Header.Content>
                  </Header>
                  <BusinessSegmentList
                    id={this.state.businessData.id}
                    bizName={this.state.businessData.bizName}
                  />
                </Segment.Group>
                <Segment.Group className='widget'>
                  <Header as='h2' className='widget-header'>
                    <Icon name='cubes' size='small'/>
                    <Header.Content>
                      Job Sites
                    </Header.Content>
                  </Header>
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