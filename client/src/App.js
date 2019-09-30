import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import LoginPage from './containers/loginPage';
import NotFound from './containers/notFoundPage';
import Emailer from './containers/emailEditor';
import HomePage from './containers/homePage';
import SidePanel from './containers/sidePanel';
import CausePage from './containers/causePage';

class App extends Component {
  render() {
    return (
      <Router>
        <StyledApp>
          <SidePanel />
          <ContentArea>
            <Switch>
              {/* Change routes to "PrivateRoute" where needed when auth is finished */}
              <Route exact path='/' component={HomePage} />
              <Route exact path='/emailEditor' component={Emailer} />
              <Route exact path='/cause' component={CausePage} />
              <Route exact path='/login' component={LoginPage} />
              <Route component={NotFound} />
            </Switch>
          </ContentArea>
        </StyledApp>
      </Router>
    );
  }
}

const StyledApp = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 100%;
  align-items: stretch;
  a:link {
    text-decoration: none;
    color: inherit;
  }
  a:visited {
    text-decoration: none;
  }
`;

const ContentArea = styled.div`
  display: flex;
`;
const mapStateToProps = state => {
  return {
    isLoggedIn: state.authentication.isLoggedIn
  };
};

export default connect(mapStateToProps)(App);
