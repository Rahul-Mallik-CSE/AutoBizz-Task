/** @format */

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Filters {
  startDate: string;
  endDate: string;
  priceMin: string;
  email: string;
  phone: string;
  sortBy: "date" | "price";
  sortOrder: "asc" | "desc";
}

interface FiltersState {
  filters: Filters;
}

const initialState: FiltersState = {
  filters: {
    startDate: "2025-01-01",
    endDate: "2025-01-31",
    priceMin: "",
    email: "",
    phone: "",
    sortBy: "date",
    sortOrder: "asc",
  },
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setDateRange: (
      state,
      action: PayloadAction<{ startDate: string; endDate: string }>
    ) => {
      state.filters.startDate = action.payload.startDate;
      state.filters.endDate = action.payload.endDate;
    },
    setPriceMin: (state, action: PayloadAction<string>) => {
      state.filters.priceMin = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.filters.email = action.payload;
    },
    setPhone: (state, action: PayloadAction<string>) => {
      state.filters.phone = action.payload;
    },
    setSorting: (
      state,
      action: PayloadAction<{
        sortBy: "date" | "price";
        sortOrder: "asc" | "desc";
      }>
    ) => {
      state.filters.sortBy = action.payload.sortBy;
      state.filters.sortOrder = action.payload.sortOrder;
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
});

export const {
  setDateRange,
  setPriceMin,
  setEmail,
  setPhone,
  setSorting,
  resetFilters,
} = filtersSlice.actions;
export default filtersSlice.reducer;
