import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getExpensesFromDB, addExpenseToDB } from '../../utils/dbHelper';
import { Expense } from '../../models/Expense';

type ExpenseState = {
  expenses: Expense[];
  loading: boolean;
  error: string | null;
};

const initialState: ExpenseState = {
  expenses: [],
  loading: false,
  error: null,
};
export const fetchExpenses = createAsyncThunk<Expense[]>(
    'expenses/fetchExpenses',
    async (_, { rejectWithValue }) => {
        try {
            const expenses = await getExpensesFromDB();
            return expenses;
        } catch (error) {
            console.error('Error fetching expenses:', error);
            return rejectWithValue('Failed to fetch expenses');
        }
    }
);
//without logs and try catch for example 
export const addExpense = createAsyncThunk(
  'expenses/add',
  async (expense: Omit<Expense, 'id'>) => {
    return await addExpenseToDB(expense);
  }
);

const expenseSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenses.pending, (state) => { state.loading = true; })
      .addCase(fetchExpenses.fulfilled, (state, action: PayloadAction<Expense[]>) => {
        state.loading = false;
        state.expenses = action.payload;
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch expenses';
      })
      .addCase(addExpense.fulfilled, (state, action: PayloadAction<Expense>) => {
        state.expenses.push(action.payload);
      });
  },
});

export default expenseSlice.reducer;