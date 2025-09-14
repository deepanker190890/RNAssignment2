export interface Expense {
  id: number;
  category: string;
  amount: number;
  date: string; // ISO string format
  description: string; // Additional info about the expense
}
