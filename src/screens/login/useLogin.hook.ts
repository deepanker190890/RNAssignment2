// src/features/auth/hooks/useLogin.ts
import { useState } from 'react';
import { AuthApi } from '../../api/auth/authApi';
import { useAuth } from '../../context/AuthContext';
import { LoginRequest } from '../../api/auth/authTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();

  const loginCall = async (username: string, password: string) => {
    try {
      setLoading(true);
      setError(null);

      const loginRequest: LoginRequest = { username, password };
      const response = await AuthApi.login(loginRequest);

      if (response.success && response.data?.accessToken) {
        await AsyncStorage.setItem('token', response.data.accessToken);
        login(response.data.accessToken);
      } else {
        setError(response.message || 'Login failed');
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return { loginCall, loading, error };
};
