import React from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Posts from './Posts';

const AuthenticatedRouter = () => {
  const getAllPosts = async () => {
    const res = await axios.get('/posts');
    return res.data.posts;
  };

  const getUserPosts = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const res = await axios.get(`/users/${user.id}/posts`);
    return res.data.posts;
  };

  return (
    <>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/feed">
        <Posts getPosts={getAllPosts} />
      </Route>
      <Route exact path="/my-feed">
        <Posts getPosts={getUserPosts} />
      </Route>
      <Route exact path="/signup">
        <Signup />
      </Route>
    </>
  );
};

export default AuthenticatedRouter;
