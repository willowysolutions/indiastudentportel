import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../api/axios";
import { CouncilerLoginAPI, signUpCounsilerAPI,  } from "../../../api/url";
//imports................................................................................................

const initialState = {
  loading: false,
  error: null,
  counsillor: null, 
  token: localStorage.getItem("token") || null,
};

export const signupCounciler = createAsyncThunk(
  'counsellor/signup',
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.post(signUpCounsilerAPI, body);
      if (response.data.success) {
        return response.data;
      } else {
        return rejectWithValue(response.data);
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: 'Registration failed' }
      );
    }
  }
);

export const councilerLogin = createAsyncThunk(
  'councilerLogin',
  async (body, { rejectWithValue }) => { // Added rejectWithValue
    try {
      const response = await axios.post(`${CouncilerLoginAPI}`, body);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: 'Login failed' }
      );
    }
  }
);

const councilerauthSlice = createSlice({
  name: 'councilerAuth',
  initialState,
  reducers: {
    // You can add your custom reducers here if needed
  },
  extraReducers: (builder) => {
    builder
    .addCase(signupCounciler.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(signupCounciler.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.counsillor = action.payload.user;
      if (action.payload.token) {
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      }
    })
    .addCase(signupCounciler.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || action.error.message;
    })
    .addCase(councilerLogin.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(councilerLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.counsillor = action.payload.user;
      if (action.payload.token) {
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      }
    })
    .addCase(councilerLogin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || action.error.message;
    });
  }
});

export default councilerauthSlice.reducer;
