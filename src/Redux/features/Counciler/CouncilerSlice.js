import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  ApproveSlotesAPI,
  CouncellingStatusAPI,
  RejectSlotesAPI,
  assignRecommendationToStudent,
  getCounsellorSingleCollageApi,
  getCourseApi,
  getSingleBookingAPI,
  getSlotesAPI,
  getallcollageCourseApi,
} from "../../../api/url";
import axios from "../../../api/axios";

const initialState = {
  sloteData: [],
  SloteProfile: null,
  approveBooking: null,
  rejectBooking: null,
  cousellStatus: null,
  colleges: [],
  courses: [],
  loading: false,
  error: null,
  bookingId: null,
  Coursesandcollages: [],
  CounsellorSingleCollage: null,
};

// get all bookings
export const getSlotes = createAsyncThunk(
  "university/fetchCollege",
  async (id, thunkAPI) => {
    // Accept 'id' as a parameter
    try {
      const response = await axios.get(`${getSlotesAPI}${id}`); // Append the 'id' to the URL
      return response.data;
    } catch (error) {
      console.log(error.response.data, "its rejecerdf");
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// single booking

export const getSingleSlots = createAsyncThunk(
  "university/getSingleSlots",
  async ({ councilerId, id }, thunkAPI) => {
    try {
      const response = await axios.get(
        `${getSingleBookingAPI}/${councilerId}/${id}`
      );
      return response.data;
    } catch (error) {
      console.log(error.response.data, "it's rejected");
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Approve booking

export const approveSlote = createAsyncThunk(
  "university/approveSlote",
  async ({ councilerId, bookingId }, thunkAPI) => {
    try {
      const response = await axios.put(
        `${ApproveSlotesAPI}${councilerId}/${bookingId}`
      );
      return response.data;
    } catch (error) {
      console.log(error.response.data, "it's rejected");
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const rejectSlote = createAsyncThunk(
  "university/rejectSlote",
  async ({ councilerId, bookingId }, thunkAPI) => {
    try {
      const response = await axios.put(
        `${RejectSlotesAPI}${councilerId}/${bookingId}`
      );
      console.log(response.data, "single");
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

//  cousilling status

export const coucellingStatus = createAsyncThunk(
  "counciler/coucellingStatus",
  async ({ counsellorId, bookingId }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${CouncellingStatusAPI}/${counsellorId}/${bookingId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getCollege_Course = createAsyncThunk(
  "courses/getCoursesApi",
  async () => {
    try {
      const response = await axios.get(getallcollageCourseApi);
      console.log("response.data", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching courses:", error);
      throw error;
    }
  }
);
export const getCounsellorSingleCollage = createAsyncThunk(
  "courses/getSingleCollege",
  async ({ id, thunkAPI }) => {
    try {
      const response = await axios.get(`${getCounsellorSingleCollageApi}${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const submitRecommendation = createAsyncThunk(
  "counsellor/submitRecommendation",
  async ({ studentId, courseData }, thunkAPI) => {
    console.log("studentId, courseData", studentId, courseData);
    try {
      const response = await axios.post(
        `${assignRecommendationToStudent}/${studentId}`,
        courseData
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
const counsilerSlice = createSlice({
  name: "counciler",
  initialState,
  reducers: {
    // setSelectedSlote(state, action) {
    //   state.selectedSlote = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSlotes.fulfilled, (state, action) => {
        state.sloteData = action.payload;
      })
      .addCase(approveSlote.fulfilled, (state, action) => {
        state.approveBooking = action.payload;
      })
      .addCase(rejectSlote.fulfilled, (state, action) => {
        state.approveBooking = action.payload;
      })
      .addCase(coucellingStatus.fulfilled, (state, action) => {
        state.cousellStatus = action.payload;
      })
      .addCase(getSingleSlots.fulfilled, (state, action) => {
        state.SloteProfile = action.payload;
        state.bookingId = action.payload.booking?.id;
        console.log(state.bookingId, "Stored bookingId in Redux");
      })
      .addCase(getCollege_Course.fulfilled, (state, action) => {
        state.loading = false;
        state.Coursesandcollages = action.payload;
      })
      .addCase(getCounsellorSingleCollage.fulfilled, (state, action) => {
        state.CounsellorSingleCollage = action.payload;
      });
  },
});
export const { setSelectedSlote } = counsilerSlice.actions;

export default counsilerSlice.reducer;
