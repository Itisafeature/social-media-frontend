import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, user, getPosts, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        Object.keys(user).length > 0 ? (
          <Component {...props} getPosts={getPosts} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default ProtectedRoute;
