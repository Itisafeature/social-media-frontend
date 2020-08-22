import React from 'react';
import { Route } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, user, getPosts, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => <Component {...props} user={user} getPosts={getPosts} />}
    />
  );
};

export default ProtectedRoute;
