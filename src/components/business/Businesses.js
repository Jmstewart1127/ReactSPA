import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import { Button, Form, Grid, Loader, Icon, Table } from 'semantic-ui-react';
import NewBusinessForm from './AddBusinessForm';
import BusinessHeader from './BusinessHeader';

class Businesses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      businessData: [],
      visible: false,
      submitted: false,
      isLoading: true,
    }
  }

  toggleVisibility = () => {
    if (this.state.visible) {
      this.setState({visible: false});
    } else {
      this.setState({visible: true});
    }
  };

  setBusinessData = () => {
    let id = localStorage.getItem('id');
    fetch('https://spring-clock.herokuapp.com/rest/user/' + id + '/businesses', {
      headers: {'Authorization': sessionStorage.getItem('jwt')}
    })
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

  componentWillMount() {
    this.setBusinessData();
  }

  componentDidMount() {
    if (localStorage.getItem('id') !== 'undefined') {
      this.setBusinessData();
    }
  }

  render() {
    const reload = () => { setTimeout(() => { this.setBusinessData(); }, 400); };
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
            <BusinessHeader
              headerTitle={"Businesses"}
            />
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell></Table.HeaderCell>
                  <Table.HeaderCell>Business Name</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {this.state.businessData.map((business) => {
                  return (
                    <Table.Row key={business.id}>
                      <Table.Cell collapsing>
                        <Link to={`/Business/${business.id}`}>
                        <Button animated floated='right'>
                          <Button.Content visible>View</Button.Content>
                          <Button.Content hidden>
                            <Icon name='search' />
                          </Button.Content>
                        </Button>
                        </Link>
                      </Table.Cell>
                      <Table.Cell>
                        {business.bizName}
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
              <Table.Footer fullWidth>
                <Table.Row>
                  <Table.HeaderCell/>
                  <Table.HeaderCell colSpan='4'>
                    <Button
                      floated='right'
                      icon labelPosition='left'
                      primary size='small'
                      onClick={this.toggleVisibility}
                    >
                      <Icon name='university'/> Add Business
                    </Button>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Footer>
            </Table>
            <NewBusinessForm
              visible={this.state.visible}
              reloadData={reload}
            />
          </Grid.Column>
        </Grid>
      );
    }
  }
}

export default Businesses