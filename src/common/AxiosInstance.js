import axios from 'axios';

/**
 * Component for handling Api calls without duplicating in each file.
 */
const axiosInstance = axios.create({
  baseURL: 'https://recipes-yummy-api.herokuapp.com',
  headers: { 'Content-Type': 'application/json', 'x-access-token': `${localStorage.getItem('token')}` },
});

axiosInstance.interceptors.request.use((config) => {
  if (localStorage.getItem('token') && config.headers['x-access-token'] === 'null') {
    config.headers['x-access-token'] = `${localStorage.getItem('token')}`;
  }
  return config;
});

export default axiosInstance;
