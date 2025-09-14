// src/components/ExpenseItem.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { Expense } from '../models/Expense';

const ExpenseItem = ({ expense }: { expense: Expense }) => (
  <View style={{ margin: 10, padding: 10, borderWidth: 1 }}>
    <Text>Category: {expense.category}</Text>
    <Text>Amount: ${expense.amount}</Text>
    <Text>Date: {new Date(expense.date).toLocaleDateString()}</Text>
    <Text>Description: {expense.description}</Text>
  </View>
);

export default ExpenseItem;
