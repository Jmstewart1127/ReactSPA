import React, { Component } from 'react'
import { Header, Icon} from 'semantic-ui-react';

class JobWidgetHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <Header as='h2' className='employee-widget'>
        <Icon name='cubes' size='small'/>
        <Header.Content>
          {this.props.headerTitle}
        </Header.Content>
      </Header>
    );
  }
}

export default JobWidgetHeader
