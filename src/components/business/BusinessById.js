import React, { Component } from 'react'
import { Grid, Button, Loader, Icon, Table } from 'semantic-ui-react';
import MyList from '../list/ListComponent';

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

  loadAllData = () => {
    this.setBusinessData();
    this.setEmployeeData();
    this.setJobData();
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
        <Grid container columns={3}>
          <Grid.Column>
            {this.state.employeeData.map((business) => {
              return (
                <MyList
                  key={business}
                  businessId={business.id}
                  labor={business.user}
                />
              );
            })}
          </Grid.Column>
          <Grid.Column>

          </Grid.Column>
          <Grid.Column>
            {this.state.employeeData.map((employee) => {
              return (
                <MyList
                  key={employee}
                  businessName={employee.id}
                  labor={employee.user}
                />
              );
            })}
          </Grid.Column>
        </Grid>
      );
    }
  }
}

export default BusinessById