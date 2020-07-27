import React, { useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import { useAuthentication } from '../hooks/authentication';
import UserContext from '../context/UserContext';
import '../css/Navbar.css';

// FIXME: Object.keys better way

const Navbar = ({ history }) => {
  const { user, logoutUser } = useContext(UserContext);

  if (Object.keys(user).length === 0) {
    return (
      <nav className="navbar">
        <Link className="logo-link" to="/feed">
          <img
            className="logo"
            src="socialmedialogo2.png"
            alt="social media company logo"
          />
        </Link>
        <ul className="nav-links">
          <li>
            <Link className="nav-item" to="/signup">
              Signup
            </Link>
          </li>
          <li>
            <Link className="nav-item" to="/login">
              Login
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
  return (
    <nav className="navbar">
      <Link className="logo-link" to="/feed">
        <img
          className="logo"
          src="socialmedialogo2.png"
          alt="social media company logo"
        />
      </Link>
      <ul className="nav-links">
        <li>
          <Link className="nav-item" to="/feed">
            Feed
          </Link>
        </li>
        <li>
          <Link className="nav-item" to="/my-feed">
            My Feed
          </Link>
        </li>

        <li>
          <button
            className="nav-item nav-item__logout-btn"
            onClick={() => logoutUser(history)}
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default withRouter(Navbar);
