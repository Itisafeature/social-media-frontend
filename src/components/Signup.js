import React, { useState, useContext, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import Error from './Error';
import '../css/Signup.css';
import UserContext from '../context/UserContext';

const Signup = () => {
  const history = useHistory();
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState('');
  const [timeoutId, setTimeoutId] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const { loginUser } = useContext(UserContext);

  const errorRef = useRef(null);

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const res = await axios.post('/users/signup', {
        username,
        email,
        password,
        passwordConfirm,
      });
      loginUser(res.data);
      history.push('/feed');
    } catch (err) {
      setIsError(true);
      console.log(err.response);
      setError(err.response.data.msg);
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

export default Signup;
