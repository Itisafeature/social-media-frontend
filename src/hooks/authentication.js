import { useState, useEffect } from 'react';
import axios from 'axios';

export const useAuthentication = () => {
  const [loaded, setLoaded] = useState(false);
  const [user, setUser] = useState({});

  const loginUser = data => {
    localStorage.setItem(
      'user',
      JSON.stringify({
        email: data.data.user.email,
        username: data.data.user.username,
      })
    );
    setUser({ email: data.data.user.email, username: data.data.user.username });
  };

  useEffect(() => {
    const userData = localStorage.getItem('user');

    const checkAuth = async () => {
      if (!userData) {
        try {
          const res = await axios.get('/users/auth');
          loginUser(res);
          setLoaded(true);
        } catch (err) {
          setLoaded(true);
        }
      } else {
        setUser(JSON.parse(userData));
        setLoaded(true);
      }
    };
    checkAuth();
  }, []);

  return {
    loaded,
    user,
    loginUser,
  };
};
