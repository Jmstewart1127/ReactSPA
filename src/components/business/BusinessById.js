import React, { Component } from 'react'
import { Grid, Button, Loader, Icon, Table } from 'semantic-ui-react';

class BusinessById extends Component {
  constructor(props) {
    super(props);
    this.state = {
      businessId: props.match.params.id,
      businessData: [],
      isLoading: true,
    }
  }

  setBusinessData = () => {
    let id = localStorage.getItem('id');
    fetch('https://spring-clock.herokuapp.com/rest/user/' + id + '/businesses')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          businessData: responseJson,
          isLoading: false,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  componentDidMount() {
  }

  render() {
    const businessId = this.props;
    return(
      <div>
        <h1>Hi from {this.state.businessId}</h1>
      </div>
    );
  }
}

export default BusinessById