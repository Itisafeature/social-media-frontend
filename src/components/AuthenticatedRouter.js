import React from 'react';
import { Route } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Posts from './Posts';

const AuthenticatedRouter = () => {
  return (
    <>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/feed">
        <Posts />
      </Route>
      <Route exact path="/signup">
        <Signup />
      </Route>
    </>
  );
};

export default AuthenticatedRouter;
