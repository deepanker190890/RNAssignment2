import React, { FC } from 'react';
import { View, Text, FlatList } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../../navigation/types';
import { useExpense } from './useExpense.hook';
import ExpenseItem from '../../components/ExpenseItem';
import CustomButton from '../../components/CustomButton';
import { RootStackParamList } from '../../navigation/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = BottomTabScreenProps<BottomTabParamList, 'ExpenseTracker'>;

const ExpenseTrackerScreen: FC<Props> = ({ navigation, route }: Props) => {
  const { expenses, loading, error } = useExpense();
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error}</Text>;
  return (
    <View style={{ flex: 1, padding: 10 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <CustomButton title="Add Expense" onPress={() => navigation?.getParent()?.navigate('AddExpense')} />
        <CustomButton title="View Chart" onPress={() => navigation?.getParent()?.navigate({ name: "ExpenseChart", params: undefined })} />
      </View>
      <FlatList
        data={expenses}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <ExpenseItem expense={item} />}
      />
    </View>
  );
};

export default ExpenseTrackerScreen;
