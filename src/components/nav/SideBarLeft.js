import React, { Component } from 'react'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import BusinessTable from "../business/BusinessTable";
import EmployeeTable from "../employee/EmployeeTable";
import Login from "../auth/Login";

class SideBarLeft extends Component {
  state = { visible: false };

  toggleVisibility = () => this.setState({ visible: !this.state.visible });

  render() {
    const { visible } = this.state;
    return (
      <Router>
        <div>
          <Button onClick={this.toggleVisibility}>Toggle Visibility</Button>
          <Sidebar.Pushable as={Segment}>
            <Sidebar as={Menu} animation='push' width='thin' visible={visible} icon='labeled' vertical inverted>
              <Menu.Item name='home'>
                <Icon name='home' />
                <Link to="/">Home</Link>
              </Menu.Item>
              <Menu.Item name='gamepad'>
                <Icon name='gamepad' />
                <Link to="/Businesses">Business</Link>
              </Menu.Item>
              <Menu.Item name='camera'>
                <Icon name='camera' />
                <Link to="/Employees">Employees</Link>
              </Menu.Item>
            </Sidebar>
            <Sidebar.Pusher>
              <Segment basic>
                <Header as='h3'>Application Content</Header>
                <Image src='/assets/images/wireframe/paragraph.png' />
              </Segment>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
          <Route exact path="/" component={Login}/>
          <Route path="/Employees" component={EmployeeTable}/>
          <Route path="/Businesses" component={BusinessTable}/>
        </div>
      </Router>
    )
  }
}

export default SideBarLeft