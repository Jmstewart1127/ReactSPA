import React, { Component } from 'react'
import { Button, Segment, List, Transition } from 'semantic-ui-react'

class EmployeeSegmentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      duration: 500,
      visible: true,
    };
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  toggleVisibility = () => this.setState({ visible: !this.state.visible })

  render() {
    return(
      <div>
        <Segment className='segment-box'>
          {this.props.employeeName}
        </Segment>
      </div>
    );
  }
}

export default EmployeeSegmentList