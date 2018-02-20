import React, { Component } from 'react'
import { Button, Divider, Grid, Header, Loader, Icon,  Segment } from 'semantic-ui-react';
import BusinessSegment from '../business/BusinessSegmentList';
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
      isLoading: true,
    }
  }

  setBusinessData = () => {
    let id = this.state.employeeData.bizId;
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
    let id = this.state.employeeId;
    fetch('https://spring-clock.herokuapp.com/rest/employee/' + id)
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
    fetch('https://spring-clock.herokuapp.com/rest/jobs/assigned/employee/' + id)
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
                      employeeName={this.state.employeeData.user}
                    />
                    <Button className='single-button' icon='configure' floated='right' size='large'/>
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
                  <BusinessSegment
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