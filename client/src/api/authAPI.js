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
  if(token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
})

export const getLoggedInUser = async () => {
  return axiosClient
    .get('/api/auth')
    .then(user => user)
    .catch(error => { throw error });
};

export const loginUser = async (formData) => {
  return axiosClient
  .post('/api/auth', formData)
  .then()
}