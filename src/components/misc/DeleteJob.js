import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Modal } from 'semantic-ui-react'

class DeleteJob extends Component {
  state = { open: false }

  show = size => () => this.setState({ size, open: true })
  close = () => this.setState({ open: false })

  deleteJob = () => {
    fetch('https://spring-clock.herokuapp.com/rest/job/delete', {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: this.props.id,
        jobAddress: this.props.jobAddress,
      })
    }).then(() => this.close());
  };

  render() {
    const { open, size } = this.state
    return (
      <div>
        <Button
          onClick={this.show('mini')}
          className='single-button'
          icon='remove' floated='right'
          size='large'
        />
        <Modal size={size} open={open} onClose={this.close}>
          <Modal.Header>
            Delete Employee {this.props.jobAddress}
          </Modal.Header>
          <Modal.Content>
            <p>Are you sure you want to delete this Job Site</p>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={this.close}>
              No
            </Button>
            <Link to={`/Business/${this.props.bizId}`} delay={200}>
              <Button
                positive icon='checkmark'
                labelPosition='right'
                content='Yes'
                onClick={this.deleteJob}
              />
            </Link>
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

export default DeleteJob