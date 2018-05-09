import React, { Component } from 'react'
import { Header, Icon} from 'semantic-ui-react';

class EmployeeHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <Header as='h2' className='widget-header'>
        <Icon name='users' size='small'/>
        <Header.Content>
          {this.props.headerTitle}
        </Header.Content>
      </Header>
    );
  }
}

export default EmployeeHeader