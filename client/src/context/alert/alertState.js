import React, { useReducer } from 'react';
import { v4 } from 'uuid';
import AlertContext from './alertContext';
import AlertReducer from './alertReducer';

import { SET_ALERT, REMOVE_ALERT } from '../types';

const AlertState = ({ children }) => {
  const initialState = [];

  const [state, dispatch] = useReducer(AlertReducer, initialState);

  const setAlert = (message, type, timeout = 2500) => {
    const id = v4();
    dispatch({ type: SET_ALERT, payload: { message, type, id } });

    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
  };

  return (
    <AlertContext.Provider value={{ alerts: state, setAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export default AlertState;
