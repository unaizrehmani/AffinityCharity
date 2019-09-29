import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// This needs to be changed to use redux store
const authHere = false;

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authHere === true ? <Component {...props} /> : <Redirect to="login" />
    }
  />
);
