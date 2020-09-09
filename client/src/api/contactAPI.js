import axios from 'axios';

const axiosClient = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.response.use(
  function (response) {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  function ({ response }) {
    if (response && response.data) {
      return Promise.reject(response.data);
    }
    return Promise.reject(response);
  }
);

axiosClient.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
});

export const addContact = async (contact) => {
  return await axiosClient.post('/api/contacts', contact);
};


export const getContacts = async () => {
  return await axiosClient.get('/api/contacts');
}