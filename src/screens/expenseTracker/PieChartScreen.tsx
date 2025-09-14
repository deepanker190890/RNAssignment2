import { View, Text } from 'react-native'
import React, { FC } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import PieChartComponent from '../../components/PieChartComponent';
import { useExpense } from './useExpense.hook';


type Props = NativeStackScreenProps<RootStackParamList, 'ExpenseChart'>;


const PieChartScreen : FC<Props> = ({ navigation, route }: Props) => {
  const { expenses } = useExpense();
   const categoryData = expenses.reduce<{ [key: string]: number }>((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {});
  const chartData = Object.keys(categoryData).map((key, index) => ({
    name: key,
    amount: categoryData[key],
    color: `hsl(${(index * 50) % 360}, 70%, 60%)`, // Assign unique color
    legendFontColor: '#333',
    legendFontSize: 12,
  }));
  return (
        <View style={{ flex: 1, padding: 80 }}>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>Expenses by Category</Text>
      {expenses.length === 0 ? (
        <Text>No data to display</Text>
      ) : (
        <PieChartComponent data={chartData} />
      )}
    </View>
  )
}

export default PieChartScreen