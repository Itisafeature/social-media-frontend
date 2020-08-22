import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import UnprotectedRoute from './UnprotectedRoute';
import Login from './Login';
import Signup from './Signup';
import NotFound from './NotFound';

const UnauthenticatedRouter = ({ loginUser }) => {
  return (
    <Switch>
      <UnprotectedRoute
        exact
        path="/"
        component={Login}
        loginUser={loginUser}
      />
      <UnprotectedRoute
        exact
        path="/login"
        component={Login}
        loginUser={loginUser}
      />
      <UnprotectedRoute
        exact
        path="/signup"
        component={Signup}
        loginUser={loginUser}
      />
      <Route exact path="/feed">
        <Redirect to="/login" />
      </Route>
      <Route exact path="/my-feed">
        <Redirect to="/login" />
      </Route>
      <Route path="/" component={NotFound} />
    </Switch>
  );
};

export default UnauthenticatedRouter;
