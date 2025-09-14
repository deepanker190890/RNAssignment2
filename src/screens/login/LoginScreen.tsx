import React, { useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { useLogin } from '../login/useLogin.hook';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';

const LoginScreen = () => {
  const [email, setEmail] = useState('emilys');
  const [password, setPassword] = useState('emilyspass');
  const { loginCall, loading, error } = useLogin();

  const handleLogin = () => {
    if (!email || !password) return;
    loginCall(email, password);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Secure Login</Text>

      <CustomInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
      />

      <CustomInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      {error && <Text style={styles.error}>{error}</Text>}

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <CustomButton title="Login" onPress={handleLogin} />
      )}
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  title: { fontSize: 20, marginBottom: 20, textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 12,
    borderRadius: 8,
  },
  error: { color: 'red', marginBottom: 10 },
});
