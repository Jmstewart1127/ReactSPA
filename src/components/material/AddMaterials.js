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
      totalPrice: 1,
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
        totalPrice: 1
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
        totalPrice: 1
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
    this.toggleSubmit();
    event.preventDefault();
  }

  addNewMaterial = () => {
    fetch('https://spring-clock.herokuapp.com/rest/material/add', {
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
        totalPrice: Math.round((this.state.quantity * this.state.price) * 100) / 100,
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
                <label>Purchased From</label>
                <input
                  placeholder='Purchased From'
                  value={this.state.purchasedFrom}
                  onChange={this.handleChange('purchasedFrom')}
                />
              </Form.Field>
              <Form.Field>
                <label>PO Number</label>
                <input
                  placeholder='PO Number'
                  value={this.state.poNumber}
                  onChange={this.handleChange('poNumber')}
                />
              </Form.Field>
              <Form.Field>
                <label>Part Description</label>
                <input
                  placeholder='Part Description'
                  value={this.state.partName}
                  onChange={this.handleChange('partName')}
                />
              </Form.Field>
              <Form.Field>
                <label>Price Per Unit</label>
                <input
                  placeholder='Price Per Unit'
                  value={this.state.price}
                  onChange={this.handleChange('price')}
                />
              </Form.Field>
              <Form.Field>
                <label>Quantity</label>
                <input
                  placeholder='Quantity'
                  value={this.state.quantity}
                  onChange={this.handleChange('quantity')}
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