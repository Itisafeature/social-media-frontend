import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuthentication } from './hooks/authentication';
import Navbar from './components/Navbar';
import AuthenticatedRouter from './components/AuthenticatedRouter';
import UnauthenticatedRouter from './components/UnauthenticatedRouter';
import './css/App.css';

const App = () => {
  const history = useHistory();
  const { loaded, user, loginUser, logoutUser } = useAuthentication(history);

  if (!loaded) return <div>Loading...</div>;

  return (
    <div className="App">
      <Navbar logoutUser={logoutUser} user={user} />
      <div className="app-container">
        {Object.keys(user).length > 0 && <AuthenticatedRouter user={user} />}
        {Object.keys(user).length < 1 && (
          <UnauthenticatedRouter loginUser={loginUser} />
        )}
      </div>
    </div>
  );
};

export default App;
