import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  CreateBookingAPI,
  councilerBookingAPI,
  createAdmissionAPI,
  getSingleAdmissionAPI,
  getUniversityforStdAPI,
  reviewCouncilerAPI,
  updateStudentAPI,
  getAllQuestionsAPI,
  SubmitExamAPI,
  testResultsAPI,
  uploadPDFAPI,
  getPDFAPI,
  getAllStudentAdmissionsAPI,
  getAllBookingAPI,
  getRecommendationsAPI,
} from "../../../api/url";
import axios from "../../../api/axios";
import axios2 from "../../../api/loadsteraxios";
const initialState = {
  studentData: null,
  admissionData: null,
  councilerData: null,
  error: null,
  universities: null,
  states: null,
  questions: [],
  selectedCounselor: {},
  recommendedColleges: [],
  recommendationsLoading: false,
  recommendationsError: null,
};

// update student
export const updateStudent = createAsyncThunk(
  "student/UpdateStudent",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.put(updateStudentAPI, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// create admission
export const createAdmission = createAsyncThunk(
  "student/CreateAdmission",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(createAdmissionAPI, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//get university for addmission
export const getAUniversityforAddmission = createAsyncThunk(
  "student/getuniversityAdmision",
  async () => {
    try {
      const response = await axios.get(getUniversityforStdAPI);
      return response.data;
    } catch (error) {
      console.error("Error fetching universities:", error);
      throw error;
    }
  }
);

// get single Admission
export const getSingleAdmission = createAsyncThunk(
  "student/getSingleAdmission",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(getSingleAdmissionAPI, { params: data });
      console.log(response, "getSingleAdmission");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// get all questions

export const getAllQuestions = createAsyncThunk(
  "student/getAllQuestions",
  async () => {
    try {
      const response = await axios.get(getAllQuestionsAPI);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

// submit test
export const submitTest = createAsyncThunk(
  "student/submitTest",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios2.post(SubmitExamAPI, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// get test result
export const getResults = createAsyncThunk(
  "student/getResults",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios2.get(`${testResultsAPI}${data}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const arrayBufferToBase64 = (buffer) => {
  return btoa(
    new Uint8Array(buffer).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      ""
    )
  );
};
export const getPdfResult = createAsyncThunk(
  "student/getPdfResult",
  async (data, { rejectWithValue }) => {
    try {
      const url = new URL(data);
      const token = url.searchParams.get("token");
      const proxyUrl = `DownloadPDFReport?token=${token}`;
      const response = await axios2.get(proxyUrl, {
        responseType: "arraybuffer",
      });
      const result = arrayBufferToBase64(response.data);
      return result;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// stored pdf to db
export const uploadPDF = createAsyncThunk(
  "student/uploadPDF",
  async (uploadData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${uploadPDFAPI}/${uploadData.studentId}`,
        { pdf: uploadData.pdf }
      );
      console.log("Upload Response:", data);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// get stored pdf from db
export const getPDF = createAsyncThunk(
  "student/getPDF",
  async (studentId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${getPDFAPI}/${studentId}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getReport = createAsyncThunk();

export const SingleAdmission = createAsyncThunk();

export const getAllAdmission = createAsyncThunk(
  "student/getAllAdmissions",
  async () => {
    try {
      const response = await axios.get(getAllStudentAdmissionsAPI);
      console.log(response, "getAllAdmission");
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const SingleBooking = createAsyncThunk();

export const getAllBookings = createAsyncThunk(
  "student/getAllBookings",
  async (id) => {
    try {
      const response = await axios.get(`${getAllBookingAPI}/${id}`);
      console.log(response, "getAllBookings");
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

// counciler getcouncilerBooking
export const getcouncilerBooking = createAsyncThunk(
  "student/councilerBooking",
  async () => {
    try {
      const response = await axios.get(councilerBookingAPI);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

// counciler review

export const createReview = createAsyncThunk(
  "student/createReview",
  async (payload, { rejectWithValue }) => {
    const { data, studentid, counsellorId } = payload;
    try {
      const response = await axios.post(
        `${reviewCouncilerAPI}/${studentid}/${counsellorId}`,
        data
      );
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Students can review only once and must book this counselor to submit a review";
      return rejectWithValue({ error: message });
    }
  }
);

export const createBooking = createAsyncThunk(
  "student/createBooking",
  async (payload, { rejectWithValue }) => {
    const { data, studentid, counsellorId } = payload;
    console.log("Booking Data being sent to API:", {
      studentid,
      counsellorId,
      data,
    });
    try {
      const response = await axios.post(
        `${CreateBookingAPI}/${studentid}/${counsellorId}`,
        data
      );
      console.log("Response from API:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error from API:", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
// Add the new thunk for fetching recommendations
export const getAllRecommendedColleges = createAsyncThunk(
  "student/getAllRecommendedColleges",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(getRecommendationsAPI);
      console.log("API Response:", response.data); // Debug log
      return response.data;
    } catch (error) {
      console.error("API Error:", error); // Debug log
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    SingleCounselor: (state, action) => {
      state.selectedCounselor = action.payload;
    },
    clearSelectedCounselor: (state) => {
      state.selectedCounselor = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateStudent.fulfilled, (state, action) => {
        state.studentData = action.payload;
      })
      .addCase(createAdmission.fulfilled, (state, action) => {
        state.admissionData = action.payload;
      })
      .addCase(getSingleAdmission.fulfilled, (state, action) => {
        state.admissionData = action.payload;
      })
      .addCase(getcouncilerBooking.fulfilled, (state, action) => {
        state.councilerData = action.payload.counsellors;
      })
      .addCase(getAUniversityforAddmission.fulfilled, (state, action) => {
        state.universities = action.payload.universities;
        state.states = action.payload.states;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.loading = false;
        state.councilerData = action.payload;
      })
      .addCase(getAllQuestions.fulfilled, (state, action) => {
        state.questions = action.payload.questions;
      })
      .addCase(getAllRecommendedColleges.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllRecommendedColleges.fulfilled, (state, action) => {
        state.loading = false;
        state.recommendedColleges = action.payload;
        state.error = null;
      })
      .addCase(getAllRecommendedColleges.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(uploadPDF.rejected, (state, action) => {
        console.error("PDF upload failed:", action.payload);
        state.error = action.payload;
      })
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.error = action.payload; // Assuming the error payload is structured appropriately
        }
      );
  },
});

export const { SingleCounselor, clearSelectedCounselor } = studentSlice.actions;

export default studentSlice.reducer;
