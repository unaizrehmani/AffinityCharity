import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import styled from 'styled-components';
import Responsive from 'react-responsive';
import Drawer from '@material-ui/core/Drawer';
import NotFoundPage from './containers/notFoundPage';
import { HomePage } from './containers/homePage';
import CausePage from './containers/causePage';
import Emailer from './containers/emailEditor';
import SidePanel from './containers/sidePanel';
import MenuButton from './components/menuButton';
import ManageAgentsPage from './containers/manageAgentsPage';
import { CreateCausePage } from './containers/createCausePage';
import ProfilePage from './containers/profilePage';
import PendingEmail from './containers/pendingEmail';
import subscriberPage from './containers/subscriberPage';
import RegisterPageContainer from './containers/registerPage';
import UnsubscribePageContainer from './containers/unsubscribePage';

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
        <Desktop>
          <SidePanel toggle={this.handleDrawerToggle} />
        </Desktop>
        <Tablet>
          <MenuButton toggle={this.handleDrawerToggle} />
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
            <Route exact path="/" component={HomePage} />
            <Route exact path="/editor/:id" component={Emailer} />
            <Route exact path="/cause" component={CausePage} />
            <Route exact path="/admin" component={ManageAgentsPage} />
            <Route exact path="/profile" component={ProfilePage} />
            <Route exact path="/createcause" component={CreateCausePage} />
            <Route exact path="/pending" component={PendingEmail} />
            <Route exact path="/subscribers" component={subscriberPage} />
            <Route
              exact
              path="/register/:id"
              component={RegisterPageContainer}
            />
            <Route
              exact
              path="/unsubscribe/:id"
              component={UnsubscribePageContainer}
            />
            <Route component={NotFoundPage} />
          </Switch>
        </ContentArea>
      </Router>
    );
  }
}

const Desktop = props => <Responsive {...props} minWidth={992} />;

const Tablet = props => <Responsive {...props} maxWidth={991} />;

const ContentArea = styled.div`
  display: flex;
  justify-content: center;
  @media screen and (min-width: 992px) {
    margin-left: 200px;
  }
`;

export default App;
