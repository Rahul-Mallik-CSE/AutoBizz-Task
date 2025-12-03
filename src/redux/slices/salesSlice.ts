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
      // Build query params - API requires ALL parameters to be present, even if empty
      const query = new URLSearchParams();
      query.append("startDate", params.startDate);
      query.append("endDate", params.endDate);
      query.append("priceMin", params.priceMin || "");
      query.append("email", params.email || "");
      query.append("phone", params.phone || "");
      query.append("sortBy", params.sortBy || "date");
      query.append("sortOrder", params.sortOrder || "asc");
      query.append("after", params.after || "");
      query.append("before", params.before || "");

      const url = `https://autobizz-425913.uc.r.appspot.com/sales?${query.toString()}`;
      console.log("Fetching sales from:", url);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "X-AUTOBIZZ-TOKEN": params.token,
        },
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Error response:", errorData);
        throw new Error(
          errorData.error || `Failed to fetch sales: ${response.status}`
        );
      }

      const data = await response.json();
      console.log("Sales data received:", {
        salesCount: data.results?.Sales?.length || 0,
        totalSalesCount: data.results?.TotalSales?.length || 0,
      });
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
