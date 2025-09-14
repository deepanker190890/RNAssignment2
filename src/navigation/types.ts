// Centralized Param List for all navigators

export type RootStackParamList = {
  Login: undefined; // Login screen
  MainTabs: undefined; // Our bottom tabs
  Details: { itemId: number; name: string };
  AddExpense: undefined;
  ExpenseChart: undefined;
};

export type BottomTabParamList = {
  News: undefined;
  Weather: undefined;
  Product: undefined;
  ExpenseTracker: undefined;
};
