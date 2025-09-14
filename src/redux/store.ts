import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/productsSlice"; //name can be anything
import expenseReducer from "./slices/expenseSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    expenses: expenseReducer,
  },
});


// Infer the `RootState (Selector for getting response)` and `AppDispatch(For sending request)` types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;