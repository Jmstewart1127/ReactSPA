import React, { Component } from 'react'
import { Button, Image, List } from 'semantic-ui-react'

class EmployeeList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return(
      <div>
        <List divided verticalAlign='middle'>
          <List.Item>
            <List.Content floated='right'>
              <Button>Add</Button>
            </List.Content>
            <List.Content floated='left'>
              {this.props.EmployeeName}
            </List.Content>
            <List.Content floated='center'>
              {this.props.labor}
            </List.Content>
          </List.Item>
        </List>
      </div>
    );
  }
}

export default EmployeeList