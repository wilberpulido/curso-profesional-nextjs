'use client';
import React, { useState, useContext, createContext } from 'react';
import Cookie from 'js-cookie';
import axios, { Axios } from 'axios';
import endPoints from '@services/api';

const AuthContext = createContext();

export function ProviderAuth({ children }) {
  const auth = useProviderAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};

function useProviderAuth() {
  const [user, setUser] = useState(null);

  const signIn = async (email, password) => {
    const options = {
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
      },
    };
    console.log(Cookie.get('token'));
    const { data: data } = await axios.post(endPoints.auth.login, { email, password }, options);
    // .catch((test) => {
    //   console.log('test');
    //   console.log(test);
    //   return 'error';
    // });
    if (data) {
      const token = data.access_token;
      Cookie.set('token', token, { expires: 50 });
      axios.defaults.headers.Authorization = `Bearer ${token}`;
      const { data: user } = await axios.get(endPoints.auth.profile);
      setUser(user);
    }
  };

  const logout = () => {
    Cookie.remove('token');
    setUser(null);
    delete axios.defaults.headers.Authorization;
    window.location.href = '/login';
  };

  return {
    user,
    signIn,
    logout,
  };
}
