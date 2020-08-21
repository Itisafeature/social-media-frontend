import React from 'react';
import { Route } from 'react-router-dom';

const UnprotectedRoute = ({ component: Component, ...rest }) => {
  return <Route {...rest} render={props => <Component {...props} />} />;
};

export default UnprotectedRoute;
