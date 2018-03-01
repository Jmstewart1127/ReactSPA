import React, { Component } from 'react';
import {
  DataTable,
  TableHeader,
  TableBody,
  TableRow,
  TableColumn,
  TablePagination,
  Button,
  Grid,
  Cell,
} from 'react-md';

const headers = ['ID', 'Business Name' ];

export default class BusinessTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      businessData: [],
    }
  }

  setBusinessData = () => {
    let id = localStorage.getItem('id');
    fetch('https://spring-clock.herokuapp.com/rest/user/' + id + '/businesses', {
      headers: {'Authorization': sessionStorage.getItem('jwt')}
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          businessData: responseJson,
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
    return(
      <div className="employee-table">
        <Grid>
          <Cell className="table-cell" size={10}>
            <DataTable>
              <TableHeader>
                <TableRow selectable={false}>
                  {headers.map(header => <TableColumn key={header}>{header}</TableColumn>)}
                </TableRow>
              </TableHeader>
              <TableBody>
                { this.state.businessData.map((business) => {
                  return(
                    <TableRow key={business} selectable={false}>
                      <TableColumn>{business.id}</TableColumn>
                      <TableColumn>{business.bizName}</TableColumn>
                      <Button
                        raised primary
                        conClassName="fa fa-hand-spock-o"
                      >Clock In/Out</Button>
                    </TableRow>
                  );
                })}
              </TableBody>
            </DataTable>
          </Cell>
        </Grid>
      </div>
    );
  }
}