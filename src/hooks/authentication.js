import { useState, useEffect } from 'react';
import axios from 'axios';

export const useAuthentication = history => {
  const [loaded, setLoaded] = useState(false);
  const [user, setUser] = useState({});

  const loginUser = data => {
    localStorage.setItem(
      'user',
      JSON.stringify({
        id: data.user._id,
        email: data.user.email,
        username: data.user.username,
        expiresAt: data.expiration,
      })
    );
    setUser({ email: data.user.email, username: data.user.username });
  };

  const logoutUser = async history => {
    localStorage.removeItem('user');
    setUser({});
    await axios.get('/users/logout');
    history.push('/login');
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));

    const checkAuth = async history => {
      if (!userData) {
        try {
          const res = await axios.get('/users/auth');
          loginUser(res);
        } catch (err) {
          console.log(err);
        }
      } else if (Date.now() > userData.expiresAt) {
        history.push('/login');
      } else {
        setUser(userData);
      }
      setLoaded(true);
    };
    checkAuth(history);
  }, [history]);

  return {
    loaded,
    user,
    loginUser,
    logoutUser,
  };
};
