import React, { Component } from 'react';
import { Checkbox } from 'semantic-ui-react';

class AddEmployeeToJobCheckBox extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.isOnJob) {
      return(
        <div>
          <Checkbox
            label={this.props.employeeName}
            onClick={this.props.handleRemove}
            checked={true}
          />
        </div>
      );
    } else {
      return(
        <div>
          <Checkbox
            label={this.props.employeeName}
            onClick={this.props.handleAdd}
          />
        </div>
      );
    }
  }
}

export default AddEmployeeToJobCheckBox