// src/features/auth/authApi.ts
import axios from 'axios';
import { ApiResponse } from '../apiResponses';
import { LoginRequest, LoginResponse } from './authTypes';
import createClient from '../client';
import { API_BASE_AUTH_URL } from '../apiConstants';

const authClient = createClient(API_BASE_AUTH_URL);

export const AuthApi = {
  login: async (payload: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
    try {
      console.log('POST URL:', authClient.defaults.baseURL + '/user/login');
      console.log('Request:', payload.username, payload.password);
      const response = await authClient.post('/user/login', payload);
      console.log('Login API success:', response.data);
      return {
        success: true,
        data: response.data, // contains token
      };
    } catch (error: any) {
      console.log('Login API error:', error.response?.data || error.message);
      return {
        success: false,
        message: error.response?.data?.error || 'Login failed',
      };
    }
  },
};
