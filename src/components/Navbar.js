import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css';

const Navbar = () => {
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
          <Link className="nav-item" to="/login">
            Login
          </Link>
        </li>
        <li>
          <Link className="nav-item">My Feed</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
