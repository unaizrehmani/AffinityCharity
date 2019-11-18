import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import App from './App';
import PrivateRoute from './components/privateRoute';
import LoginPage from './containers/loginPage';
import RegisterPage from './containers/registerPage';
import UnsubscribePage from './containers/unsubscribePage';

export default class Authenticate extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <Route path="/register/:id" component={RegisterPage} />
          <Route path="/unsubscribe/:id" component={UnsubscribePage} />
          <PrivateRoute path="/" component={<App />} />
        </Switch>
      </Router>
    );
  }
}
