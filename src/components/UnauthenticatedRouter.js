import React from 'react';
import { Route } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';

const UnauthenticatedRouter = () => {
  return (
    <>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/signup">
        <Signup />
      </Route>
    </>
  );
};

export default UnauthenticatedRouter;
