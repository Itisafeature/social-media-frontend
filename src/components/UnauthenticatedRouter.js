import React from 'react';
import { Route } from 'react-router-dom';
import UnprotectedRoute from './UnprotectedRoute';
import Login from './Login';
import Signup from './Signup';

const UnauthenticatedRouter = ({ user }) => {
  return (
    <>
      <UnprotectedRoute exact path="/login" component={Login} user={user} />
      <UnprotectedRoute exact path="/signup" component={Signup} user={user} />
    </>
  );
};

export default UnauthenticatedRouter;
