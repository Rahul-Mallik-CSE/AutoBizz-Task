/** @format */

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/slices/authSlice";
import salesReducer from "@/slices/salesSlice";
import filtersReducer from "@/slices/filtersSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    sales: salesReducer,
    filters: filtersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
