import React, { useState, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import Error from './Error';
import '../css/Login.css';

const Login = ({ loginUser }) => {
  const history = useHistory();
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState('');
  const [timeoutId, setTimeoutId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const errorRef = useRef(null);

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const res = await axios.post('/users/login', { email, password });
      loginUser(res.data);
      history.push('/feed');
    } catch (err) {
      setIsError(true);
      setError('Something Went Wrong. Please Try Again');
      window.clearTimeout(timeoutId);
      setTimeoutId(
        setTimeout(() => {
          setIsError(false);
          setError('');
        }, 5000)
      );
      window.scrollTo(0, errorRef.current.offsetTop);
    }
  };

  return (
    <>
      {isError && <Error errorRef={errorRef} error={error} />}
      <div className="login--container">
        <header className="login-header">Login Below!</header>
        <div className="login--card">
          <div className="login">
            <form className="login-form" onSubmit={handleSubmit}>
              <input
                className="login-form__text"
                type="text"
                onChange={e => setEmail(e.target.value)}
                value={email}
                placeholder="email"
              />
              <input
                className="login-form__text"
                type="password"
                onChange={e => setPassword(e.target.value)}
                value={password}
                placeholder="password"
              />
              <button className="login-form__btn" type="submit">
                Login
              </button>
            </form>
            <Link className="signup__link" to="/signup">
              <button className="signup-btn">Signup</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
