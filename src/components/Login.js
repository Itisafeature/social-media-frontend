import React, { useState } from 'react';
import axios from 'axios';

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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        onChange={e => setEmail(e.target.value)}
        value={email}
        placeholder="email"
      />
      <input
        type="password"
        onChange={e => setPassword(e.target.value)}
        value={password}
        placeholder="password"
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
