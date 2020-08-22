import React, { useCallback } from 'react';
import axios from 'axios';
import ProtectedRoute from './ProtectedRoute';
import Posts from './Posts';
import { Route, Switch, Redirect } from 'react-router-dom';
import NotFound from './NotFound';

const AuthenticatedRouter = ({ user }) => {
  const getAllPosts = useCallback(async () => {
    const res = await axios.get('/posts');
    return res.data.posts;
  }, []);

  const getUserPosts = useCallback(async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const res = await axios.get(`/users/${user.id}/posts`);
    return res.data.posts;
  }, []);

  return (
    <Switch>
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
      <Route exact path="/">
        <Redirect to="/feed"></Redirect>
      </Route>
      <Route exact path="/login">
        <Redirect to="/feed" />
      </Route>
      <Route exact path="/signup">
        <Redirect to="/feed" />
      </Route>
      <Route path="/" component={NotFound} />
    </Switch>
  );
};

export default AuthenticatedRouter;
