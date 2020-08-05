import React from 'react';
import axios from 'axios';
import ProtectedRoute from './ProtectedRoute';
import Posts from './Posts';

const AuthenticatedRouter = ({ user }) => {
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
      <ProtectedRoute
        exact
        path="/feed"
        component={Posts}
        user={user}
        getPosts={getAllPosts}
      />
      <ProtectedRoute
        exact
        path="/my-feed"
        component={Posts}
        user={user}
        getPosts={getUserPosts}
      />
    </>
  );
};

export default AuthenticatedRouter;
