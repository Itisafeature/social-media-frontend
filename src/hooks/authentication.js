import { useState, useEffect } from 'react';
import axios from 'axios';

export const useAuthentication = () => {
  const [loaded, setLoaded] = useState(false);
  const [user, setUser] = useState({});

  const loginUser = data => {
    localStorage.setItem('user', {
      expiresAt: data.expiresAt,
      email: data.email,
    });
  };

  useEffect(() => {
    const userData = localStorage.getItem('user');

    const checkAuth = async () => {
      if (!userData) {
        const res = await axios.get('/users/auth');
        loginUser(res);
        console.log(localStorage.getItem('user'));
      }
    };
    checkAuth();
  }, []);
};
