import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuthentication } from './hooks/authentication';
import UserContext from './context/UserContext';
import Navbar from './components/Navbar';
import AuthenticatedRouter from './components/AuthenticatedRouter';
import UnauthenticatedRouter from './components/UnauthenticatedRouter';
import './css/App.css';

const App = () => {
  const history = useHistory();
  const { loaded, user, loginUser, logoutUser } = useAuthentication(history);

  if (!loaded) return <div>Loading...</div>;

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      <div className="App">
        <Navbar />
        <div className="app-container">
          {Object.keys(user).length > 0 && <AuthenticatedRouter user={user} />}
          {Object.keys(user).length < 1 && (
            <UnauthenticatedRouter user={user} />
          )}
        </div>
      </div>
    </UserContext.Provider>
  );
};

export default App;
