import React, { Component } from 'react'
import { Header, Icon} from 'semantic-ui-react';

class BusinessWidgetHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <Header as='h2' className='widget-header'>
        <Icon name='university' size='small'/>
        <Header.Content>
          {this.props.headerTitle}
        </Header.Content>
      </Header>
    );
  }
}

export default BusinessWidgetHeader
