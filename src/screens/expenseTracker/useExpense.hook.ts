// src/hooks/useExpense.ts
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExpenses, addExpense } from '../../redux/slices/expenseSlice';
import { RootState, AppDispatch } from '../../redux/store';

export const useExpense = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { expenses, loading, error } = useSelector(
    (state: RootState) => state.expenses,
  );

  useEffect(() => {
    dispatch(fetchExpenses());
  }, []);

  const addNewExpense = (
    category: string,
    amount: number,
    description: string,
  ) => {
    const date = new Date().toISOString();
    dispatch(addExpense({ category, amount, date, description }));
  };

  return { expenses, loading, error, addNewExpense };
};
