import React, { Component } from 'react'
import { Button, Form, Segment} from 'semantic-ui-react';

class AddMaterials extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobId: '',
      purchasedFrom: '',
      poNumber: '',
      partName: '',
      quantity: 0,
      price: 0,
      totalPrice: this.quantity * this.price,
      submitted: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleSubmit = () => {
    if (this.state.submitted) {
      this.setState({
        submitted: false,
        jobId: '',
        purchasedFrom: '',
        poNumber: '',
        partName: '',
        quantity: 0,
        price: 0,
      });
    } else {
      this.setState({
        submitted: true,
        jobId: '',
        purchasedFrom: '',
        poNumber: '',
        partName: '',
        quantity: 0,
        price: 0,
      });
    }
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSubmit(event) {
    this.addNewMaterial();
    event.preventDefault();
  }

  addNewMaterial = () => {
    fetch('https://spring-clock.herokuapp.com/rest/job/add', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('jwt')
      },
      body: JSON.stringify({
        jobId: this.props.jobId,
        purchasedFrom: this.state.purchasedFrom,
        poNumber: this.state.poNumber,
        partName: this.state.partName,
        quantity: this.state.quantity,
        price: this.state.price,
        totalPrice: this.state.totalPrice,
      })
    })
      .then(() => console.log(this.state.totalPrice))
  };

  render() {
    if (this.props.visible) {
      return(
        <div className='loader'>
          <Segment>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field>
                <label>Job Address</label>
                <input
                  placeholder='Job Address'
                  value={this.state.jobAddress}
                  onChange={this.handleChange('jobAddress')}
                />
              </Form.Field>
              <Form.Field>
                <label>Customer Name</label>
                <input
                  placeholder='Customer Name'
                  value={this.state.customerName}
                  onChange={this.handleChange('customerName')}
                />
              </Form.Field>
              <Form.Field>
                <label>Amount Charged</label>
                <input
                  placeholder='Amount Charged'
                  value={this.state.amountCharged}
                  onChange={this.handleChange('amountCharged')}
                />
              </Form.Field>
              <Button type='submit' onClick={this.props.reloadData}>Add</Button>
            </Form>
          </Segment>
        </div>
      );
    } else {
      return(
        <div></div>
      );
    }
  }
}

export default AddMaterials