import React from 'react';
import { Route } from 'react-router-dom';

const UnprotectedRoute = ({ component: Component, loginUser, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => <Component {...props} loginUser={loginUser} />}
    />
  );
};

export default UnprotectedRoute;
