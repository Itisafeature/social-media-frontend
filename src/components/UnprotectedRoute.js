import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const UnprotectedRoute = ({ component: Component, user, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        Object.keys(user).length === 0 ? (
          <Component {...props} />
        ) : (
          <Redirect to="/feed" />
        )
      }
    />
  );
};

export default UnprotectedRoute;
