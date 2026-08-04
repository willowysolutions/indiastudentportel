import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../api/axios";
import { signUpUniversityAPI, universityLoginAPI } from "../../../api/url";

const initialState = {
  loading: false,
  error: null,
  university: null,
  token: localStorage.getItem("token") || null, // Retrieve token from local storage
};

export const signupUniversity = createAsyncThunk(
  'auth/signupUniversity',
  async (body) => {
    try {
      const response = await axios.post(signUpUniversityAPI, body);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
export const universityLogin = createAsyncThunk(
  'auth/universityLogin',
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.post(universityLoginAPI, body);
      console.log(response, 'ressss');
      return response.data;
    } catch (error) {
      // Check if the error response has data and return it, otherwise return a custom error message
      return rejectWithValue(error.response?.data || 'An error occurred while logging in');
    }
  }
);

const authUniversitySlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.university = null;
      localStorage.removeItem("token"); // Remove token from local storage upon logout
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUniversity.fulfilled, (state, action) => {
        state.loading = false;
        state.university = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token); // Store token in local storage
      })
      .addCase(universityLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.university = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token); // Store token in local storage
      });
  }
});

export const { logout } = authUniversitySlice.actions;

export default authUniversitySlice.reducer;
