/** @format */

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/redux/slices/authSlice";
import salesReducer from "@/redux/slices/salesSlice";
import filtersReducer from "@/redux/slices/filtersSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    sales: salesReducer,
    filters: filtersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
