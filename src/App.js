import React, { Component } from 'react'
import { Sidebar, Segment, Button, Menu, MenuItem, Image, Icon, Header } from 'semantic-ui-react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import BusinessTable from "./components/BusinessTable";
import SemanticTable from "./components/SemanticTable";
import Businesses from "./components/Businesses";
import Login from "./components/FunLogin";
import Logout from "./components/Logout";

class App extends Component {
  state = { visible: false };

  toggleVisibility = () => this.setState({ visible: !this.state.visible });

  logout = () => { localStorage.setItem('id', 'undefined') };

  render() {
    const { visible } = this.state;
    const handleLogout = () => { this.logout() };
    return (
      <Router>
        <div className="main-content">
          <Menu>
            <Menu.Item onClick={this.toggleVisibility}>
              <Icon name='list' />
            </Menu.Item>
              <Logout
                logoutFunction={handleLogout}
              />
          </Menu>
          <Sidebar.Pushable as={Segment}>
            <Sidebar as={Menu} animation='overlay' width='thin' visible={visible} icon='labeled' vertical inverted>
              <Menu.Item name='home'>
                <Link to="/">
                  <Icon name='home' />
                  Home
                </Link>
              </Menu.Item>
              <Menu.Item name='university'>
                <Link to="/Businesses">
                  <Icon name='university' link="/Businesses" />
                  Businesses
                </Link>
              </Menu.Item>
              <Menu.Item name='users'>
                <Link to="/Employees">
                  <Icon name='users' />
                  Employees
                </Link>
              </Menu.Item>
            </Sidebar>
            <Sidebar.Pusher>
              <Segment basic>
                <body>
                  <Route exact path="/" component={Login}/>
                  <Route path="/Employees" component={SemanticTable}/>
                  <Route path="/Businesses" component={Businesses}/>
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
