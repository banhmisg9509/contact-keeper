import React, { useReducer } from 'react';
import uuid from 'uuid';
import ContactContext from './contactContext';
import ContactReducer from './contactReducer';

import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
} from '../types';

const ContactState = ({ children }) => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: 'nvtri',
        email: 'nvtri@gmail.com',
        phone: '111-111-1111',
        type: 'personal',
      },
      {
        id: 2,
        name: 'ltduc',
        email: 'ltduc@gmail.com',
        phone: '111-111-1112',
        type: 'personal',
      },
      {
        id: 3,
        name: 'nthieu',
        email: 'nthieu@gmail.com',
        phone: '111-111-1113',
        type: 'personal',
      },
    ],
  };

  const [state, dispatch] = useReducer(ContactReducer, initialState);

  // Add Contact

  // Delete Contact

  // Set Current Contact

  // Clear Current Contact

  // Update Contact

  // Filter Contacts

  // Clear Filter
  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};

export default ContactState;
