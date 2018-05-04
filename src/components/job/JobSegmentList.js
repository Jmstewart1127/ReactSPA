import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Button, Segment, List, Transition } from 'semantic-ui-react'

class JobSegmentList extends Component {
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
        <Link to={`/Job/${this.props.id}`}>
          <Segment className='segment-box'>
            {this.props.address}
          </Segment>
        </Link>
      </div>
    );
  }
}

export default JobSegmentList