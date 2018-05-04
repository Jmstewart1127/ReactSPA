import React, { Component } from 'react'
import { Button, Header, Icon} from 'semantic-ui-react';

class EmployeeWidgetHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <Header as='h2' className='employee-widget'>
        <Icon name='users' size='small'/>
        <Header.Content>
          {this.props.headerTitle}
        </Header.Content>
      </Header>
    );
  }
}

export default EmployeeWidgetHeader
