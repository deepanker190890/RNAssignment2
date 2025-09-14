import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextType {
  token: string | null;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem('token');
      if (saved) setToken(saved);
      const isAuthenticatedSaved = await AsyncStorage.getItem('isAuthenticated');
      if (isAuthenticatedSaved === 'true') setIsAuthenticated(true);
    })();
  }, []);

  const login = async (newToken: string) => {
    await AsyncStorage.setItem('token', newToken);
    setToken(newToken);
    await AsyncStorage.setItem('isAuthenticated', 'true');
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    setToken(null);
    await AsyncStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
  };
  //Provides values to childeren components
  // This context will be used to provide authentication state and methods to the rest of the app
  return (
    <AuthContext.Provider value={{isAuthenticated, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
//custom hook : shortcut use: const { token, login, logout } = useAuth();
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
};

// example for children:
// <AuthProvider>
//   <AppNavigation />   // This is "children"
// </AuthProvider>
