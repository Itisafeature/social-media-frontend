import React from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import { useAuthentication } from './hooks/authentication';
import UserContext from './context/UserContext';
import Navbar from './components/Navbar';
import Posts from './components/Posts';
import AuthenticatedRouter from './components/AuthenticatedRouter';
import UnauthenticatedRouter from './components/UnauthenticatedRouter';
import './css/App.css';
import axios from 'axios';
import ProtectedRoute from './components/ProtectedRoute';
import UnprotectedRoute from './components/UnprotectedRoute';
import Signup from './components/Signup';
import Login from './components/Login';

const App = () => {
  const history = useHistory();
  const { loaded, user, loginUser, logoutUser } = useAuthentication(history);

  if (!loaded) return <div>Loading...</div>;

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
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      <div className="App">
        <Navbar />
        <div className="app-container">
          <Switch>
            <>
              <AuthenticatedRouter user={user} />
              <UnauthenticatedRouter user={user} />
              <Redirect to="/" />
            </>
          </Switch>
        </div>
      </div>
    </UserContext.Provider>
  );
};

export default App;
