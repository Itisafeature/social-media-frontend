import React, { useState } from 'react';
import axios from 'axios';
import '../css/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const res = await axios.post('/users/login', { email, password });
      console.log(res);
    } catch (err) {
      debugger;
    }
  };

  return (
    <>
    <header className="login-header">Login Below!</header>
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
    </div>
    </>
  );
};

export default Login;
