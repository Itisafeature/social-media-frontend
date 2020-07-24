import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../context/UserContext';
import '../css/Navbar.css';

// NEED TO DETERMINE IF SOMEONE IS LOGGED IN

const Navbar = () => {
  const { user } = useContext(UserContext);

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
            <Link className="nav-item" to="/logout">
              Logout
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
          <Link className="nav-item" to="/login">
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
