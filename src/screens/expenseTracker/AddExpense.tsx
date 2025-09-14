import React, { FC, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useExpense } from './useExpense.hook';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';

type Props = NativeStackScreenProps<RootStackParamList, 'AddExpense'>;

const AddExpense: FC<Props> = ({ navigation, route }: Props) => {
  const { addNewExpense } = useExpense();
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const handleAdd = () => {
    if (!category || !amount) {
      Alert.alert('Error', 'Category and Amount are required');
      return;
    }

    addNewExpense(category, parseFloat(amount), description);
    Alert.alert('Success', 'Expense added');
    setCategory('');
    setAmount('');
    setDescription('');
  };

  return (
    <View style={styles.container}>
      <CustomInput
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
        style={styles.input}
      />
      <CustomInput
        placeholder="Amount"
        value={amount}
        keyboardType="numeric"
        onChangeText={setAmount}
        style={styles.input}
      />
      <CustomInput
        placeholder="Description (optional)"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <CustomButton title="Add Expense" onPress={handleAdd} />
    </View>
  );
};

export default AddExpense;

const styles = StyleSheet.create({
  container: { flex: 1, paddingStart: 20, paddingEnd: 20, paddingTop: 200 },
  input: { borderWidth: 1, marginVertical: 10, padding: 10, borderRadius: 5 },
});
