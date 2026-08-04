import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../api/axios";
import { StudentloginAPI, signUpStudentAPI } from "../../../api/url";
//imports................................................................................................

const initialState = {
  loading: false,
  error: null,
  studentDetails: {},
  token: localStorage.getItem("token") || null,
};

export const signupStudent = createAsyncThunk(
  'students/signupStudent',
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${signUpStudentAPI}`, body);
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response.data); 
    }
  }
);


export const studentLogin = createAsyncThunk(
  'auth/studentLogin',
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${StudentloginAPI}`, body);
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response.data); 
    }
  }
);

const studentauthSlice = createSlice({
  name: 'studentAuth',
  initialState,
  reducers: {
    updateStudent: (state, action) => {
      state.studentDetails = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupStudent.pending, (state) => {
        state.loading = true;
        state.error = null; 
      })
      .addCase(signupStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.student = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token); 
      })
      .addCase(signupStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; 
      })
      .addCase(studentLogin.pending, (state) => {
        state.loading = true;
        state.error = null; 
      })
      .addCase(studentLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.studentDetails = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token); 
      })
      .addCase(studentLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; 
      });
  }
});
export const { updateStudent } = studentauthSlice.actions

export default studentauthSlice.reducer;
