import React from 'react';
import { Route } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Posts from './Posts';
import PostForm from './PostForm';

const AuthenticatedRouter = () => {
  return (
    <>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/feed">
        <Posts />
      </Route>
      <Route exact path="/posts/new">
        <PostForm />
      </Route>
      <Route exact path="/signup">
        <Signup />
      </Route>
    </>
  );
};

export default AuthenticatedRouter;
