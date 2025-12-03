/** @format */

import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";

export interface Sale {
  _id: string;
  date: string;
  price: number;
  customerEmail: string;
  customerPhone: string;
  __v: number;
}

interface DailyTotal {
  day: string;
  totalSale: number;
}

interface SalesState {
  sales: Sale[];
  totalSales: DailyTotal[];
  pagination: {
    before: string;
    after: string;
  };
  loading: boolean;
  error: string | null;
  currentPage: number;
}

const initialState: SalesState = {
  sales: [],
  totalSales: [],
  pagination: { before: "", after: "" },
  loading: false,
  error: null,
  currentPage: 1,
};

interface FetchSalesParams {
  token: string;
  startDate: string;
  endDate: string;
  priceMin?: string;
  email?: string;
  phone?: string;
  sortBy?: string;
  sortOrder?: string;
  after?: string;
  before?: string;
}

export const fetchSales = createAsyncThunk(
  "sales/fetchSales",
  async (params: FetchSalesParams, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams({
        startDate: params.startDate,
        endDate: params.endDate,
        sortBy: params.sortBy || "date",
        sortOrder: params.sortOrder || "asc",
      });

      if (params.priceMin) query.append("priceMin", params.priceMin);
      if (params.email) query.append("email", params.email);
      if (params.phone) query.append("phone", params.phone);
      if (params.after) query.append("after", params.after);
      if (params.before) query.append("before", params.before);

      const response = await fetch(
        `https://autobizz-425913.uc.r.appspot.com/sales?${query}`,
        {
          headers: { "X-AUTOBIZZ-TOKEN": params.token },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch sales");

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch sales"
      );
    }
  }
);

const salesSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {
    setSales: (state, action: PayloadAction<SalesState>) => {
      state.sales = action.payload.sales;
      state.totalSales = action.payload.totalSales;
      state.pagination = action.payload.pagination;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSales.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSales.fulfilled, (state, action) => {
        state.loading = false;
        state.sales = action.payload.results.Sales;
        state.totalSales = action.payload.results.TotalSales;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchSales.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSales } = salesSlice.actions;
export default salesSlice.reducer;
