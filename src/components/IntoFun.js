import React, { Component } from 'react';

export default class IntoFun extends Component {
  constructor(props) {
    super(props);

    this.state = {
      aString: '',
    }
  }

  render() {
    const id = this.props;
    const name = this.props;
    return(
      <div>
        <table>
          <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
          </tr>
          </thead>
          <tbody>
            <tr>
              <td>{ this.props.id }</td>
              <td>{ this.props.name }</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}