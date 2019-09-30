import React, { Component } from 'react';
import {
  Route,
  NavLink,
  BrowserRouter as Router,
  Switch
} from 'react-router-dom';
import { connect } from 'react-redux';
import LoginPage from './containers/loginPage';
import NotFound from './containers/notFoundPage';
import Emailer from './containers/emailEditor';
import HomePage from './containers/homePage';
import CausePage from './containers/causePage';
// import { PrivateRoute } from './components/privateRoute';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li>
              <NavLink exact activeClassName="active" to="/">
                Home Page
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" to="/login">
                Login Page
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" to="/emailEditor">
                Emailer Page
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" to="/cause">
                Cause Page
              </NavLink>
            </li>
          </ul>
          <hr />
          <Switch>
            {/* Change routes to "PrivateRoute" where needed when auth is finished */}
            <Route exact path="/" component={HomePage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/emailEditor" component={Emailer} />
            <Route exact path="/cause" component={CausePage} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}
const mapStateToProps = state => ({
  isLoggedIn: state.authentication.isLoggedIn
});

export default connect(mapStateToProps)(App);
