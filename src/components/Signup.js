import React, { useState, useContext } from 'react';
import axios from 'axios';
import '../css/Signup.css';
import UserContext from '../context/UserContext';
import { Link, withRouter } from 'react-router-dom';

const Signup = ({ history }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const { loginUser } = useContext(UserContext);

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const res = await axios.post('/users/signup', {
        username,
        email,
        password,
        passwordConfirm,
      });
      loginUser(res);
      history.push('/feed');
    } catch (err) {
      // TODO: handle error
      console.log(err);
    }
  };

  return (
    <>
      <header className="signup-header">Signup Below!</header>
      <div className="signup">
        <form className="signup-form" onSubmit={handleSubmit}>
          <input
            className="signup-form__text"
            type="text"
            onChange={e => setUsername(e.target.value)}
            value={username}
            placeholder="username"
          />
          <input
            className="signup-form__text"
            type="text"
            onChange={e => setEmail(e.target.value)}
            value={email}
            placeholder="email"
          />
          <input
            className="signup-form__text"
            type="password"
            onChange={e => setPassword(e.target.value)}
            value={password}
            placeholder="password"
          />
          <input
            className="signup-form__text"
            type="password"
            onChange={e => setPasswordConfirm(e.target.value)}
            value={passwordConfirm}
            placeholder="password confirmation"
          />
          <button className="signup-form__btn" type="submit">
            Signup
          </button>
        </form>
        <Link className="login-btn" to="/login">
          <button>Login</button>
        </Link>
      </div>
    </>
  );
};

export default withRouter(Signup);
