/** @format */

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/lib/slices/authSlice";
import salesReducer from "@/lib/slices/salesSlice";
import filtersReducer from "@/lib/slices/filtersSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    sales: salesReducer,
    filters: filtersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
