import React, { Component } from 'react'
import { Header, Icon} from 'semantic-ui-react';

class JobHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <Header as='h2' className='main-widget-header'>
        <Icon name='cubes' size='small'/>
        <Header.Content>
          {this.props.headerTitle}
        </Header.Content>
      </Header>
    );
  }
}

export default JobHeader