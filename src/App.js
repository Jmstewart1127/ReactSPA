import React, { Component } from 'react'
import { Sidebar, Segment, Button, Menu, MenuItem, Image, Icon, Header } from 'semantic-ui-react'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import BusinessTable from "./components/business/BusinessTable";
import SemanticTable from "./components/employee/SemanticTable";
import Businesses from "./components/business/Businesses";
import BusinessById from "./components/business/BusinessById";
import Login from "./components/auth/Login";
import Logout from "./components/auth/Logout";

class App extends Component {
  state = {
    visible: false,
    loggedIn: false,
  };

  toggleVisibility = () => this.setState({ visible: !this.state.visible });

  logout = () => {
    localStorage.setItem('id', 'undefined');
  };

  login = () => {
    return(<Link to="/"/>);
  };

  isLoggedIn = () => {
    if (localStorage.getItem('id') === 'undefined') {
      this.setState({ loggedIn: false });
    } else {
      this.setState({ loggedIn: true });
    }
  };

  componentDidMount() {
    this.isLoggedIn();
    console.log(this.state.loggedIn);
  }

  render() {
    const { visible } = this.state;
    const handleLogout = () => { this.logout() };
    const handleLogin = () => { this.login() };
    const checkLoggedIn = this.state.loggedIn;
    return (
      <Router>
        <div className="main-content">
          <Menu>
            <Menu.Item onClick={this.toggleVisibility}>
              <Icon name='list' />
            </Menu.Item>
            <Logout
              logoutFunction={handleLogout}
              loginFunction={handleLogin}
              loggedIn={checkLoggedIn}
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
                  <Route exact path="/" component={Login} loggedIn={this.state.loggedIn}/>
                  <Route path="/Employees" component={SemanticTable}/>
                  <Route path="/Businesses" component={Businesses}/>
                  <Route path="/Business/:id" component={BusinessById}/>
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
