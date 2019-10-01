import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

// This needs to be changed to use redux store
const authHere = false;

export default class PrivateRoute extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let render = authHere ? (
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
