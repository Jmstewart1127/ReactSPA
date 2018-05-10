import React, { Component } from 'react'
import { Grid, Button, Form, Header, Icon, MenuItem, Segment, Sidebar, Menu } from 'semantic-ui-react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Businesses, BusinessById } from './components/business';
import { EmployeesByBusiness, EmployeeById, SemanticTable } from './components/employee';
import { JobById, JobTable } from './components/job';
import { CreateAccount, Login, Logout } from './components/auth';

class App extends Component {
  state = {
    visible: true,
    loggedIn: false,
    loginVisibility: true,
    userId: '',
    username: '',
    password: '',
  };

  toggleVisibility = () => this.setState({visible: !this.state.visible});

  toggleLoginVisibility = () => this.setState({loginVisibility: !this.state.loginVisibility});

  logout = () => {
    localStorage.setItem('id', 'undefined');
    this.isLoggedIn();
  };

  isLoggedIn = () => {
    if (localStorage.getItem('id') === 'undefined') {
      this.setState({loggedIn: false});
    } else {
      this.setState({loggedIn: true});
    }
  };

  getUserId = () => {
    let username = this.state.username;
    let password = this.state.password;
    fetch('https://spring-clock.herokuapp.com/rest/login/' + username + '/' + password, {
      headers: {'Authorization': sessionStorage.getItem('jwt')}
    })
      .then((response) => response.json())
      .then((responseJson) => {
        localStorage.setItem('id', responseJson.id);
        this.setState({loggedIn: true});
      })
      .catch((error) => {
        console.error(error);
      });
  };

  login = () => {
    fetch('https://spring-clock.herokuapp.com/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: this.state.username,
        password: this.state.password,
      })
    })
      .then((response) => {
        sessionStorage.setItem('jwt', response.headers.get('Authorization'));
      })
  };

  handleUserNameChange = event => {
    this.setState({username: event.target.value});
  };

  handlePassWordChange = event => {
    this.setState({password: event.target.value});
  };

  handleSubmit = event => {
    this.login();
    this.getUserId();
    event.preventDefault();
    this.setState({
      loggedIn: true,
    })
  };

  componentDidMount() {
    this.isLoggedIn();
    console.log(this.state.loggedIn);
  }

  render() {
    const {visible} = this.state;
    if (localStorage.getItem('id') === 'undefined') {
      return (
        <Router>
          <div>
            <Menu>
              {this.state.loginVisibility ?
                <MenuItem position='right' onClick={this.toggleLoginVisibility}>
                  <Link to={'/Create/Account'}>
                    <Icon name='add user' />Create Account
                  </Link>
                </MenuItem> :
                <MenuItem position='right' onClick={this.toggleLoginVisibility}>
                  <Link to={'/'}>
                    <Icon name='sign out' />Back
                  </Link>
                </MenuItem>
              }
            </Menu>
            {this.state.loginVisibility ?
              <Grid container centered columns={3}>
                <Grid.Column>
                  <Segment>
                    <Header as='h2' className='main-widget-header'>
                      <Icon name='user' size='small'/>
                      <Header.Content>
                        {'Login'}
                      </Header.Content>
                    </Header>
                    <Form className='login-form' onSubmit={this.handleSubmit}>
                      <Form.Field>
                        <label>Username</label>
                        <input
                          placeholder='Username'
                          value={this.state.username}
                          onChange={this.handleUserNameChange}
                        />
                      </Form.Field>
                      <Form.Field>
                        <label>Password</label>
                        <input
                          placeholder='Password'
                          type="password"
                          value={this.state.password}
                          onChange={this.handlePassWordChange}
                        />
                      </Form.Field>
                      <Button type='submit'>Login</Button>
                    </Form>
                  </Segment>
                </Grid.Column>
              </Grid> : <div></div>
            }
            <body>
              <Route path="/Create/Account" component={CreateAccount}/>
            </body>
          </div>
        </Router>
      );
    } else {
      return (
        <Router>
          <div className="main-content">
            <Menu>
              <Menu.Item onClick={this.toggleVisibility}>
                <Icon name='list' />
              </Menu.Item>
              <Logout
                logoutFunction={this.logout}
                loginFunction={this.login}
                loggedIn={this.state.loggedIn}
              />
            </Menu>
            <Sidebar.Pushable as={Segment}>
              <Sidebar as={Menu} animation='overlay' width='thin' visible={visible} icon='labeled' vertical inverted>
                <Menu.Item name='home'>
                  <Link to="/">
                    <Icon name='home'/>
                    Home
                  </Link>
                </Menu.Item>
                <Menu.Item name='university'>
                  <Link to="/Businesses">
                    <Icon name='university' link="/Businesses"/>
                    Businesses
                  </Link>
                </Menu.Item>
                <Menu.Item name='users'>
                  <Link to="/Employees">
                    <Icon name='users'/>
                    Employees
                  </Link>
                </Menu.Item>
                <Menu.Item name='cubes'>
                  <Link to="/Jobs">
                    <Icon name='cubes'/>
                    Jobs
                  </Link>
                </Menu.Item>
              </Sidebar>
              <Sidebar.Pusher>
                <Segment basic>
                  <body>
                    <Route exact path="/" component={Login} loggedIn={this.state.loggedIn}/>
                    <Route path="/Create/Account" component={CreateAccount}/>
                    <Route path="/Employees" component={SemanticTable}/>
                    <Route path="/Employee/:id" component={EmployeeById}/>
                    <Route path="/View/Employees/:id" component={EmployeesByBusiness}/>
                    <Route path="/Businesses" component={Businesses}/>
                    <Route path="/Business/:id" component={BusinessById}/>
                    <Route path="/Jobs" component={JobTable}/>
                    <Route path="/Job/:id" component={JobById}/>
                  </body>
                </Segment>
              </Sidebar.Pusher>
            </Sidebar.Pushable>
          </div>
        </Router>
      );
    }
  }
}

export default App
