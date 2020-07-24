import { useState, useEffect } from 'react';
import axios from 'axios';

export const useAuthentication = history => {
  const [loaded, setLoaded] = useState(false);
  const [user, setUser] = useState({});

  const loginUser = data => {
    localStorage.setItem(
      'user',
      JSON.stringify({
        email: data.data.user.email,
        username: data.data.user.username,
        expiresAt: data.data.expiration,
      })
    );
    setUser({ email: data.data.user.email, username: data.data.user.username });
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));

    const checkAuth = async history => {
      if (!userData) {
        try {
          const res = await axios.get('/users/auth');
          loginUser(res);
          setLoaded(true);
        } catch (err) {
          // Need to handle invalid auth here
          setLoaded(true);
        }
      } else if (Date.now() > userData.expiresAt) {
        setLoaded(true);
        history.push('/login');
        // Need to redirect to login page
        // How to get the expiry of cookie... Set and get from localStorage against Date.now
      } else {
        setUser(userData);
        setLoaded(true);
      }
    };
    checkAuth(history);
  }, [history]);

  return {
    loaded,
    user,
    loginUser,
  };
};
