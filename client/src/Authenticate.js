import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import App from './App';
import PrivateRoute from './components/privateRoute';
import LoginPage from './containers/loginPage';

export default class Authenticate extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/login' component={LoginPage} />
          <PrivateRoute path='/' component={<App />} />
        </Switch>
      </Router>
    );
  }
}
