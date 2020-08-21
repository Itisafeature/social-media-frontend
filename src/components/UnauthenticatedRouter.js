import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import UnprotectedRoute from './UnprotectedRoute';
import Login from './Login';
import Signup from './Signup';
import NotFound from './NotFound';

const UnauthenticatedRouter = ({ user }) => {
  return (
    <Switch>
      <UnprotectedRoute exact path="/" component={Login} user={user} />
      <UnprotectedRoute exact path="/login" component={Login} user={user} />
      <UnprotectedRoute exact path="/signup" component={Signup} user={user} />
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
