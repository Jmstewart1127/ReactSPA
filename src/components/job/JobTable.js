import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Button, Grid, Loader, Icon, Table } from 'semantic-ui-react';
import { BusinessHeader } from '../business';

class JobTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobData: [],
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

  setJobData = () => {
    let id = localStorage.getItem('id');
    fetch('https://spring-clock.herokuapp.com/rest/jobs/all/by/user/' + id, {
      headers: {'Authorization': sessionStorage.getItem('jwt')}
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          jobData: responseJson,
          isLoading: false,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  componentWillMount() {
    this.setJobData();
  }

  componentDidMount() {
    if (localStorage.getItem('id') !== 'undefined') {
      this.setJobData();
    }
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
                {this.state.jobData.map((job) => {
                  return (
                    <Table.Row key={job.id}>
                      <Table.Cell collapsing>
                        <Link to={`/Job/${job.id}`}>
                          <Button animated floated='right'>
                            <Button.Content visible>View</Button.Content>
                            <Button.Content hidden>
                              <Icon name='search' />
                            </Button.Content>
                          </Button>
                        </Link>
                      </Table.Cell>
                      <Table.Cell>
                        {job.jobAddress}
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
          </Grid.Column>
        </Grid>
      );
    }
  }
}

export default JobTable