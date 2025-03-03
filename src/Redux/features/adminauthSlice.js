import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";
import { loginAdminAPI } from "../../api/url";
//imports................................................................................................

const initialState = {
  admin: null,
  token: null,
};

export const adminlogin = createAsyncThunk("adminlogin", async (body) => {
  try {
    const response = await axios.post(`${loginAdminAPI}`, body);
    return response.data;
  } catch (error) {
    return error;
    throw error;
  }
});

const adminauthSlice = createSlice({
  name: "adminauth",
  initialState,
  reducers: {
    sendLogout: (state) => {
      state.admin = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(adminlogin.fulfilled, (state, action) => {
      state.admin = action.payload.user;
      state.token = action.payload.token;
    });
  },
});

export default adminauthSlice.reducer;
