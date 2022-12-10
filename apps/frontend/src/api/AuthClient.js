import axios from 'axios';

const $authApi = axios.create({
  withCredentials: true,
  baseURL: process.env.API_URL,
});

$authApi.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

$authApi.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get(`${process.env.API_URL}/refresh`, {
          withCredentials: true,
        });
        localStorage.setItem('token', response.data.accessToken);
        return $authApi.request(originalRequest);
      } catch (e) {
        console.log('Пользователь не авторизован');
      }
    }
    throw error;
  }
);

export default $authApi;
