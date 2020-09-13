import React, { useReducer } from 'react';
import ContactContext from './contactContext';
import ContactReducer from './contactReducer';
import { contactAPI } from 'api';

import {
  GET_CONTACTS,
  CLEAR_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERR
} from '../types';

const ContactState = ({ children }) => {
  const initialState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null
  };

  const [state, dispatch] = useReducer(ContactReducer, initialState);
 
  const getContacts = async () => {
    try {
      const contacts = await contactAPI.getContacts();
      dispatch({ type: GET_CONTACTS, payload: contacts });
    } catch (error) {
      dispatch({ type: CONTACT_ERR, payload: error.msg });
    }
  }

  const clearContacts = async () => {
      dispatch({ type: CLEAR_CONTACTS });
  }

  const addContact = async (contact) => {
    try {
      const data = await contactAPI.addContact(contact);
      dispatch({ type: ADD_CONTACT, payload: data });
    } catch (error) {
      dispatch({ type: CONTACT_ERR, payload: error.msg });
    }
  };

  const deleteContact = async (id) => {
    try {
      await contactAPI.deleteContact(id);
      dispatch({ type: DELETE_CONTACT, payload: id });
    } catch (error) {
      dispatch({ type: CONTACT_ERR, payload: error.msg });
    }
  };

  const setCurrent = (contact) => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };

  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  const updateContact = (contact) => {
    dispatch({ type: UPDATE_CONTACT, payload: contact });
  };

  const filterContacts = (text) => {
    dispatch({ type: FILTER_CONTACTS, payload: text });
  };

  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        loading: state.loading,
        getContacts,
        clearContacts,
        addContact,
        updateContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        filterContacts,
        clearFilter,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};

export default ContactState;
