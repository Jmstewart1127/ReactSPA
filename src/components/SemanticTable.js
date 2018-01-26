import React, { Component } from 'react'
import { Grid, Button, Loader, Checkbox, Icon, Table } from 'semantic-ui-react';
import TimeClockSlider from './TimeClockSlider';

class SemanticTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employeeData: [],
      clockStatus: false,
      isLoading: true,
    }
  }

  setEmployeeData = () => {
    fetch('https://spring-clock.herokuapp.com/rest/get/all/employees/2')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          employeeData: responseJson,
          isLoading: false,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  clockEmployeeInOrOut = employeeId => {
    fetch('https://spring-clock.herokuapp.com/rest/web/clock/in/out/' + employeeId)
      .then(() => {
        this.setEmployeeData();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  componentDidMount() {
    this.setEmployeeData();
  }

  render() {
    if (this.state.isLoading) {
      return(
        <div className='loader'>
          <Loader active size='massive' inline='centered'/>
        </div>
      );
    } else {
      return (
        <Grid container columns={1}>
          <Grid.Column>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell><Icon name='wait' size='large'/></Table.HeaderCell>
                  <Table.HeaderCell>ID</Table.HeaderCell>
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Rate</Table.HeaderCell>
                  <Table.HeaderCell>Weekly Pay</Table.HeaderCell>
                  <Table.HeaderCell>Clocked In</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {this.state.employeeData.map((employee) => {
                  const handleClockInOut = () => {
                    this.clockEmployeeInOrOut(employee.id);
                  };
                  return (
                    <Table.Row key={employee}>
                      <Table.Cell collapsing>
                        <TimeClockSlider
                          isClockedIn={employee.clocked}
                          handleFunction={handleClockInOut}
                        />
                      </Table.Cell>
                      <Table.Cell>{employee.id}</Table.Cell>
                      <Table.Cell>{employee.user}</Table.Cell>
                      <Table.Cell>{employee.payRate}</Table.Cell>
                      <Table.Cell>{Math.round(employee.totalPay * 100) / 100}</Table.Cell>
                      <Table.Cell>{employee.clocked.toString()}</Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
              <Table.Footer fullWidth>
                <Table.Row>
                  <Table.HeaderCell/>
                  <Table.HeaderCell colSpan='4'>
                    <Button floated='right' icon labelPosition='left' primary size='small'>
                      <Icon name='user'/> Add User
                    </Button>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Footer>
            </Table>
          </Grid.Column>
        </Grid>
      );
    }
  }
}

export default SemanticTable