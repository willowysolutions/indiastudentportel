import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios"
import { createAdminAPI, deleteAdminAPI, getAllAdminAPI, updateAdminAPI } from "../../api/url";

const initialState = {
  CheckAvailability: [

  ],
  adminData: [],
  bidwinners: [],

}

export const createAdmin = createAsyncThunk("admincreate", async (body) => {
  console.log("insident he slice ", body)
  return await axios.post(`${createAdminAPI}`, body)
    .then(({ data }) => {
      connsole.log(data, "create admin return")
      return data
    })
    .catch((err) => {
      console.log(err);
    });
})

export const getallAdmin = createAsyncThunk("getalladmin", async (body) => {

  console.log("insident he slice ", body)
  return await axios.get(`${getAllAdminAPI}`, body)
    .then(({ data }) => {
      return data
    })
    .catch((err) => {
      console.log(err);
    });
})
export const updateAdmin = createAsyncThunk("updateadmin", async (params) => {

  console.log("insident he slice ", body)
  return await axios.put(`${updateAdminAPI}` + params)
    .then(({ data }) => {
      return data
    })
    .catch((err) => {
      console.log(err);
    });
})
export const deleteAdmin = createAsyncThunk("deleteadmin", async (body) => {

  console.log("insident he slice ", body)
  return await axios.delete(`${deleteAdminAPI}`, body)
    .then(({ data }) => {
      return data
    })
    .catch((err) => {
      console.log(err);
    });
})
export const createAuction = createAsyncThunk("createAuction", async (body) => {

  console.log("insident he slice ", body)
  return await axios.post(`${url}`, body)
    .then(({ data }) => {
      return data
    })
    .catch((err) => {
      console.log(err);
    });
})

const StudentPortalSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(createAdmin.fulfilled, (state, action) => {
      state.adminData = action.payload
    })
  }
})

export default StudentPortalSlice.reducer;