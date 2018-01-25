import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import { List, ListItem } from 'react-md/lib/Lists';
import EmployeeTable from './EmployeeTable';
import BusinessTable from './BusinessTable';

const Nav = () => (
  <Router>
    <div>
      <List className="md-cell md-paper md-paper--1">
        <ListItem>
          <Link to="/">Home</Link>
        </ListItem>
        <ListItem>
          <Link to="/Employees">Employees</Link>
        </ListItem>
        <ListItem>
          <Link to="/Businesses">Business</Link>
        </ListItem>
      </List>
      <hr/>

      <Route exact path="/" component={Home}/>
      <Route path="/Employees" component={EmployeeTable}/>
      <Route path="/Businesses" component={BusinessTable}/>
    </div>
  </Router>
);

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

export default Nav