import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from './types';
import Icon from 'react-native-vector-icons/Ionicons';

// Screens
import NewsScreen from '../screens/news/index';
import WeatherScreen from '../screens/weather/index';
import ProductScreen from '../screens/product/index';
import ExpenseTrackerScreen from '../screens/expenseTracker';

const Tab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        tabBarIcon: ({ color, size }) => {
          let iconName: string = '';

          if (route.name === 'News') {
            iconName = 'home-outline';
          } else if (route.name === 'Weather') {
            iconName = 'person-outline';
          } else if (route.name === 'ExpenseTracker') {
            iconName = 'settings-outline';
          }
          else if (route.name === 'Product') {
            iconName = 'settings-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2e86de',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="News" component={NewsScreen} />
      <Tab.Screen name="Weather" component={WeatherScreen} />
      <Tab.Screen name="Product" component={ProductScreen} />
      <Tab.Screen name="ExpenseTracker" component={ExpenseTrackerScreen} />
    </Tab.Navigator>
  );
}
