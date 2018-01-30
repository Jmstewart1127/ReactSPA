import React, { Component } from 'react';
import { Checkbox } from 'semantic-ui-react';

class TimeClockSlider extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const handleFunction = this.props;
    const isClockedIn = this.props;
    if (this.props.isClockedIn) {
      return(
        <div>
          <Checkbox
            onClick={this.props.handleFunction}
            slider
            checked={true}
          />
        </div>
      );
    } else {
      return(
        <div>
          <Checkbox
            onClick={this.props.handleFunction}
            slider
          />
        </div>
      );
    }
  }
}

export default TimeClockSlider