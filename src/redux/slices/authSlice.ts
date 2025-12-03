/** @format */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  loading: false,
  error: null,
};

export const getAuthorization = createAsyncThunk(
  "auth/getAuthorization",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://autobizz-425913.uc.r.appspot.com/getAuthorize",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tokenType: "frontEndTest" }),
        }
      );

      if (!response.ok) throw new Error("Failed to get authorization");

      const data = await response.json();
      return data.token;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Authorization failed"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAuthorization.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAuthorization.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
      })
      .addCase(getAuthorization.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default authSlice.reducer;
