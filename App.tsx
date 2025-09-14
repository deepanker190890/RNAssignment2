import React, { useContext } from 'react';
import { StatusBar, StyleSheet, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/login/LoginScreen';
import BottomTabs from './src/navigation/BottomTabs';
import DetailsScreen from './src/screens/DetailsScreen';
import { RootStackParamList } from './src/navigation/types'; // Add this import
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { DeviceLog } from 'react-native-device-log';
import AddExpense from './src/screens/expenseTracker/AddExpense';
import PieChart from './src/screens/expenseTracker/PieChartScreen';


const Stack = createNativeStackNavigator<RootStackParamList>(); // Add type here

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <AuthProvider>
        <SafeAreaProvider>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </SafeAreaProvider>
      </AuthProvider>
    </Provider>
  );
}

function AppNavigator() {
  const { isAuthenticated } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        <Stack.Screen name="Login" component={LoginScreen} />
      ) : (
        <>
          <Stack.Screen name="MainTabs" component={BottomTabs} />
          <Stack.Screen name="Details" component={DetailsScreen} />
          <Stack.Screen name="AddExpense" component={AddExpense} />
           <Stack.Screen name="ExpenseChart" component={PieChart} />
        </>
      )}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
