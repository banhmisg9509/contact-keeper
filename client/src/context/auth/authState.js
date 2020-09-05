import { registerUser, getLoggedInUser, loginUser } from 'api';
import React, { useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from '../types';

const AuthState = ({ children }) => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const loadUser = async () => {
    try {
      const user = await getLoggedInUser();
      dispatch({ type: USER_LOADED, payload: user });
    } catch (error) {
      dispatch({ type: AUTH_ERROR, payload: error.msg });
    }
  };

  const register = async (formData) => {
    try {
      const token = await registerUser(formData);
      dispatch({ type: REGISTER_SUCCESS, payload: token });
      loadUser();
    } catch (error) {
      dispatch({ type: REGISTER_FAIL, payload: error.msg });
    }
  };

  const login = async (formData) => {
    try {
      const token = await loginUser(formData);
      dispatch({ type: LOGIN_SUCCESS, payload: token });
      loadUser();
    } catch (error) {
      dispatch({ type: LOGIN_FAIL, payload: error.msg });
    }
  };

  const logout = () => {
    dispatch({ type: LOGOUT });
  };

  const clearErrors = () => {
    dispatch({ type: CLEAR_ERRORS });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        loadUser,
        register,
        login,
        logout,
        clearErrors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
