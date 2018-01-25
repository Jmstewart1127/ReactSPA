import React, { Component } from 'react'
import { Sidebar, Segment, Button, Menu, MenuItem, Image, Icon, Header } from 'semantic-ui-react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import BusinessTable from "./components/BusinessTable";
import EmployeeTable from "./components/EmployeeTable";
import SemanticTable from "./components/SemanticTable";
import Login from "./components/FunLogin";

class App extends Component {
  state = { visible: false };

  toggleVisibility = () => this.setState({ visible: !this.state.visible });

  render() {
    const { visible } = this.state;
    return (
      <Router>
        <div className="main-content">
          <Menu>
            <Menu.Item onClick={this.toggleVisibility}>
              <Icon name='list' />
            </Menu.Item>
          </Menu>
          <Sidebar.Pushable as={Segment}>
            <Sidebar as={Menu} animation='push' width='thin' visible={visible} icon='labeled' vertical inverted>
              <Menu.Item name='home'>
                <Icon name='home' />
                <Link to="/">Home</Link>
              </Menu.Item>
              <Menu.Item name='university'>
                <Icon name='university' />
                <Link to="/Businesses">Businesses</Link>
              </Menu.Item>
              <Menu.Item name='users'>
                <Icon name='users' />
                <Link to="/Employees">Employees</Link>
              </Menu.Item>
            </Sidebar>
            <Sidebar.Pusher>
              <Segment basic>
                <Header as='h3'>Application Content</Header>
                <Image src='/assets/images/wireframe/paragraph.png' />
                <body>
                  <Route exact path="/" component={Login}/>
                  <Route path="/Employees" component={SemanticTable}/>
                  <Route path="/Businesses" component={BusinessTable}/>
                </body>
              </Segment>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </div>
      </Router>
    )
  }
}

export default App
