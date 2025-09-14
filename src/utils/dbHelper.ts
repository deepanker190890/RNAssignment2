import * as SQLite from 'react-native-quick-sqlite';
import { Expense } from '../models/Expense';

const db = SQLite.open({ name: 'expenseTrackerDB' });

let isInitialized = false;

export const initDB = async (): Promise<void> => {
  if (isInitialized) return;
  try {
    await db.execute(
      `CREATE TABLE IF NOT EXISTS expenses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        amount REAL NOT NULL,
        category TEXT NOT NULL,
        date TEXT NOT NULL,
        description TEXT
      );`
    );
    isInitialized = true;
    console.log('Table created or already exists');
  } catch (error) {
    console.error('Error creating table', error);
  }
};

export const getExpensesFromDB = async (): Promise<Expense[]> => {
  console.log('Fetching expenses from DB...');
  try {
    await initDB();
    const result = await db.execute('SELECT * FROM expenses');
    const expenses: Expense[] = result.rows && result.rows._array ? result.rows._array : [];
    console.log(`Fetched ${expenses.length} expenses from DB.`);
    return expenses;
  } catch (error) {
    console.error('Error fetching expenses from DB', error);
    throw error;
  }
};

// Omit means we don't need to provide id when adding a new expense because it will be auto generated
export const addExpenseToDB = async (expense: Omit<Expense, 'id'>): Promise<Expense> => {
  console.log('Adding expense to DB:', expense);
  try {
    await initDB();
    const result = await db.execute(
      'INSERT INTO expenses (category, amount, date, description) VALUES (?, ?, ?, ?)',
      [expense.category, expense.amount, expense.date, expense.description]
    );
    const insertId = result.insertId;
    if (typeof insertId !== 'number') {
      throw new Error('Failed to retrieve insertId after inserting expense.');
    }
    console.log('Expense added with id:', insertId);
    return { id: insertId, ...expense };
  } catch (error) {
    console.error('Error adding expense to DB', error);
    throw error;
  }
};