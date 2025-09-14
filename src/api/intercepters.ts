import EncryptedStorage from 'react-native-encrypted-storage';
import { AxiosInstance } from 'axios';

const Interceptors = {
  attach: (client: AxiosInstance) => {
    //Authentication interceptor
    // This interceptor adds the token to the request headers if available
    client.interceptors.request.use(
      async config => {
        const token = await EncryptedStorage.getItem('token');
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
         // config.headers['x-api-key'] = 'yourreqres-free-v1';
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      },
    );


    // Response interceptor
    client.interceptors.response.use(
      response => {
        // You can log responses or transform data here
        console.log('Response:', response);
        return response;
      },
      error => {
        // Handle errors globally
        console.error('API Error:', error);
        return Promise.reject(error);
      },
    );
  },
};

export default Interceptors;
