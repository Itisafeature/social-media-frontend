import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useAuthentication } from './hooks/authentication';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Posts from './components/Posts';
import './css/App.css';

function App() {
  const authentication = useAuthentication();
  return (
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
  );
}

export default App;
