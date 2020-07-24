import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from 'react-router-dom';
import { useAuthentication } from './hooks/authentication';
import UserContext from './context/UserContext';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Posts from './components/Posts';
import './css/App.css';

function App(props) {
  const { loaded, user, loginUser } = useAuthentication(props.history);

  if (!loaded) return <div>Loading...</div>;

  return (
    <UserContext.Provider value={{ user, loginUser }}>
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/feed">
              <Posts />
            </Route>
          </Switch>
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default withRouter(App);
