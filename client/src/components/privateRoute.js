import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

class PrivateRoute extends Component {
  render() {
    let render = this.props.isLoggedIn ? (
      this.props.component
    ) : (
      <Redirect
        to={{
          pathname: '/login',
          state: { from: this.props.location }
        }}
      />
    );
    return <Route>{render}</Route>;
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.authentication.isLoggedIn
});

export default connect(mapStateToProps)(PrivateRoute);
