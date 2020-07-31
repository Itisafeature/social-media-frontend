import React from 'react';
import { Switch, withRouter } from 'react-router-dom';
import { useAuthentication } from './hooks/authentication';
import UserContext from './context/UserContext';
import Navbar from './components/Navbar';
import AuthenticatedRouter from './components/AuthenticatedRouter';
import UnauthenticatedRouter from './components/UnauthenticatedRouter';
import './css/App.css';

const App = ({ history }) => {
  const { loaded, user, loginUser, logoutUser } = useAuthentication(history);

  if (!loaded) return <div>Loading...</div>;

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      <div className="App">
        <Navbar />
        <Switch>
          {Object.keys(user).length > 0 && <AuthenticatedRouter />}
          {Object.keys(user).length === 0 && <UnauthenticatedRouter />}
        </Switch>
      </div>
    </UserContext.Provider>
  );
};

export default withRouter(App);
