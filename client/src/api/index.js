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

export const registerUser = async (formData) => {
  return axiosClient
    .post('/api/users', formData)
    .then((token) => token)
    .catch((error) => {
      throw error;
    });
};
