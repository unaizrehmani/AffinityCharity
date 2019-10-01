import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Responsive from 'react-responsive';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import { Icon } from 'semantic-ui-react';
import LoginPage from './containers/loginPage';
import NotFound from './containers/notFoundPage';
import Emailer from './containers/emailEditor';
import HomePage from './containers/homePage';
import SidePanel from './containers/sidePanel';
import CausePage from './containers/causePage';

const Desktop = props => <Responsive {...props} minWidth={992} />;
const Tablet = props => <Responsive {...props} maxWidth={991} />;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false
    };
  }
  handleDrawerToggle = () => {
    this.setState({ menuOpen: !this.state.menuOpen });
  };
  render() {
    return (
      <Router>
        <StyledApp>
          <Desktop>
            <SidePanel toggle={this.handleDrawerToggle} />
          </Desktop>
          <Tablet>
            <IconButton
              color='inherit'
              aria-label='open drawer'
              style={{
                position: 'fixed'
              }}
              onClick={this.handleDrawerToggle}
            >
              <Icon name='bars' />
            </IconButton>
            <Drawer
              open={this.state.menuOpen}
              onClose={this.handleDrawerToggle}
              ModalProps={{
                keepMounted: true // Better open performance on mobile.
              }}
            >
              <SidePanel toggle={this.handleDrawerToggle} />
            </Drawer>
          </Tablet>
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
  /* Add responsive stuff here later */
`;

const ContentArea = styled.div`
  display: flex;
  justify-content: center;
  @media screen and (min-width: 992px) {
    margin-left: 250px;
  }
`;

const mapStateToProps = state => {
  return {
    isLoggedIn: state.authentication.isLoggedIn
  };
};

export default connect(mapStateToProps)(App);
