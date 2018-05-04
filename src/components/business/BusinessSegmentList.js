import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Button, Segment, List, Transition } from 'semantic-ui-react'

class BusinessSegmentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      duration: 500,
      visible: true,
    };
  }

  render() {
    return(
      <div>
        <Link to={`/Business/${this.props.id}`}>
          <Segment className='segment-box'>
            {this.props.bizName}
          </Segment>
        </Link>
      </div>
    );
  }
}

export default BusinessSegmentList