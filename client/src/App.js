import React, { Component } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { connect } from "react-redux";
import LoginPage from "./containers/loginPage";
import NotFound from "./containers/notFoundPage";
import Emailer from "./containers/emailEditor";
import HomePage from './containers/homePage';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/emailEditor" component={Emailer} />
          <Route exact path="/home" component={HomePage} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}
const mapStateToProps = state => {
  return {
    isLoggedIn: state.authentication.isLoggedIn
  };
};

export default connect(mapStateToProps)(App);
