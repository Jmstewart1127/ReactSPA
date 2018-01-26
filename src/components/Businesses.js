import React, { Component } from 'react'
import { Grid, Button, Loader, Icon, Table } from 'semantic-ui-react';

class Businesses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      businessData: [],
      isLoading: true,
    }
  }

  setBusinessData = () => {
    let id = localStorage.getItem('id');
    fetch('https://spring-clock.herokuapp.com/rest/user/' + id + '/businesses')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          businessData: responseJson,
          isLoading: false,
        });
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
                  <Table.HeaderCell>ID</Table.HeaderCell>
                  <Table.HeaderCell>Business Name</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {this.state.businessData.map((business) => {
                  return (
                    <Table.Row key={business}>
                      <Table.Cell>{business.id}</Table.Cell>
                      <Table.Cell>{business.bizName}</Table.Cell>
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
                    <Button size='small'>Approve</Button>
                    <Button disabled size='small'>Approve All</Button>
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

export default Businesses