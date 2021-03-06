import React, { useState, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import Error from './Error';
import '../css/Signup.css';

const Signup = ({ loginUser }) => {
  const history = useHistory();
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState('');
  const [timeoutId, setTimeoutId] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [image, setImage] = useState('');

  const errorRef = useRef(null);

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('passwordConfirm', passwordConfirm);
      formData.append('image', image);
      const res = await axios.post('/users/signup', formData);
      loginUser(res.data);
      history.push('/feed');
    } catch (err) {
      setIsError(true);
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
      <div className="signup--container">
        <header className="signup--header">Signup Below!</header>
        <div className="signup--card">
          <div className="signup">
            <form
              className="signup-form"
              encType="multipart/form-data"
              onSubmit={handleSubmit}
            >
              <input
                className="signup--form__text"
                type="text"
                onChange={e => setUsername(e.target.value)}
                value={username}
                placeholder="username"
              />
              <input
                className="signup--form__text"
                type="text"
                onChange={e => setEmail(e.target.value)}
                value={email}
                placeholder="email"
              />
              <input
                className="signup--form__text"
                type="password"
                onChange={e => setPassword(e.target.value)}
                value={password}
                placeholder="password"
              />
              <input
                className="signup--form__text"
                type="password"
                onChange={e => setPasswordConfirm(e.target.value)}
                value={passwordConfirm}
                placeholder="password confirmation"
              />
              <input type="file" onChange={e => setImage(e.target.files[0])} />
              <button className="signup-form__btn" type="submit">
                Signup
              </button>
            </form>
            <Link className="login__link" to="/login">
              <button className="login-btn">Login</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
