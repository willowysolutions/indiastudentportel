import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  EditAdminCollegeAPI,
  EditAdminCourseAPI,
  approveAdmissiontAPI,
  createAllUniversityAPI,
  deleteUniversityAPI,
  getAdminCollegeProfileAPI,
  getAdminSingleStudent,
  getAllAdmissiontAPI,
  getAllCollegesAPI,
  getAllCoursesAPI,
  getAllStudentAPI,
  getAllUniversityAPI,
  getCouncilerAPI,
  getUniversitySingleViewAPI,
  getsingleAdmissiontAPI,
  postAdminCollegesApi,
  postAdminCourseApi,
  rejectAdmissiontAPI,
  updateCollegeActiveStateAPI,
  updateCouncilerActiveStateAPI,
  updateCounsellorActiveStateAPI,
  updateStudentActiveStateAPI,
  updateUniversityAPI,
  updateUniversityActiveStateAPI,
} from "../../../api/url";
import axios from "../../../api/axios";

const initialState = {
  UniversityDetails: null,
  StudentDetails: null,
  AdmissionDetails: null,
  CouncilerDetails: null,
  CollegeDetails: null,
  CourseDetails: null,
  CollegeProfile: null,
  CounsilerProfile: null,
  StudentProfile: null,
  UniversityProfile: null,
  AdmissionProfile: null,
  courses: [],
  loading: false,
  error: null,
};

// Get All Universities
export const getUniversity = createAsyncThunk(
  "admin/getAllUniversity",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${getAllUniversityAPI}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Create University
export const createUniversity = createAsyncThunk(
  "admin/createUniversity",
  async (body) => {
    try {
      const response = await axios.post(`${createAllUniversityAPI}`, body);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

// Get Single University by ID
export const getSingleUniversity = createAsyncThunk(
  "admin/getSingleUniversity",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${getUniversitySingleViewAPI}${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
// update college
export const UpdateAdminCollege = createAsyncThunk(
  "university/editCollege",
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await axios.put(`${EditAdminCollegeAPI}${id}`, data);
      return response.data;
    } catch (error) {
      console.error("UpdateCollege Error:", error); // Log the error for debugging
      return thunkAPI.rejectWithValue(error.response?.data || "Unknown Error");
    }
  }
);

// Edit course
export const UpdateAdminCourse = createAsyncThunk(
  "admin/editAdminCourse",
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await axios.put(`${EditAdminCourseAPI}${id}`, data);
      return response.data;
    } catch (error) {
      console.error("UpdateCourse Error:", error); // Log the error for debugging
      return thunkAPI.rejectWithValue(error.response?.data || "Unknown Error");
    }
  }
);

// Delete University
export const deleteUniversity = createAsyncThunk(
  "admin/deleteUniversity",
  async (id) => {
    try {
      const response = await axios.delete(`${deleteUniversityAPI}/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
export const postAdminColleges = createAsyncThunk(
  "colleges/postAdminColleges",
  async (body) => {
    try {
      const response = await axios.post(postAdminCollegesApi, body);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
export const postAdminCourse = createAsyncThunk(
  "courses/postAdminCourse",
  async (courseData, thunkAPI) => {
    try {
      const response = await axios.post(postAdminCourseApi, courseData);
      console.log(response, "postCoursepostCourse");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
// Get Students
export const getStudents = createAsyncThunk(
  "admin/getStudents",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${getAllStudentAPI}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Change Student Status
export const ChangeStudentStatus = createAsyncThunk(
  "admin/ChangestudentStatus",
  async (id, thunkAPI) => {
    try {
      const response = await axios.put(`${updateStudentActiveStateAPI}/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Change College Status
export const ChangeCollegeStatus = createAsyncThunk(
  "admin/ChangeCollegeStatus",
  async (id, thunkAPI) => {
    try {
      const response = await axios.put(`${updateCollegeActiveStateAPI}${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update college status"
      );
    }
  }
);

// Change Counselor Status
export const ChangeCounselorStatus = createAsyncThunk(
  "admin/ChangeCounselorStatus",
  async (id, thunkAPI) => {
    try {
      const response = await axios.put(
        `${updateCounsellorActiveStateAPI}/${id}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Get All Colleges
export const getAllColleges = createAsyncThunk(
  "admin/getAllColleges",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${getAllCollegesAPI}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Get Single College Profile
export const getAdminSingleCollege = createAsyncThunk(
  "admin/getAdminSingleCollege",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${getAllCollegesAPI}/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Get Single Student Profile
export const getSingleStudent = createAsyncThunk(
  "admin/getSingleStudent",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${getAdminSingleStudent}/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Get Admissions
export const getAdmissions = createAsyncThunk(
  "admin/getAdmissions",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${getAllAdmissiontAPI}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Get Single Admission
export const getSingleAdmissions = createAsyncThunk(
  "admin/getSingleAdmissions",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${getsingleAdmissiontAPI}/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Approve Admission
export const ApproveAdmission = createAsyncThunk(
  "admin/ApproveAdmission",
  async ({ id, data }) => {
    try {
      const response = await axios.put(`${approveAdmissiontAPI}/${id}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

// Reject Admission
export const RejectAdmission = createAsyncThunk(
  "admin/RejectAdmission",
  async ({ id, data }) => {
    try {
      const response = await axios.put(`${rejectAdmissiontAPI}/${id}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

// Get All Counselors
export const getAllCounciler = createAsyncThunk(
  "admin/getAllCounciler",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${getCouncilerAPI}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Get Single Counselor Profile
export const getSingleCounciler = createAsyncThunk(
  "admin/getSingleCounciler",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${getCouncilerAPI}/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Get All Courses
export const getAllCourses = createAsyncThunk(
  "admin/getAllCourses",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${getAllCoursesAPI}/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUniversity.fulfilled, (state, action) => {
        state.UniversityDetails = action.payload;
      })
      .addCase(createUniversity.fulfilled, (state, action) => {
        state.UniversityDetails = action.payload;
      })
      .addCase(getSingleUniversity.fulfilled, (state, action) => {
        state.UniversityProfile = action.payload;
      })
      .addCase(UpdateAdminCollege.fulfilled, (state, action) => {
        state.UniversityDetails = action.payload;
      })
      .addCase(UpdateAdminCourse.fulfilled, (state, action) => {
        state.UniversityDetails = action.payload;
      })
      .addCase(deleteUniversity.fulfilled, (state, action) => {
        state.UniversityDetails = action.payload;
      })
      .addCase(postAdminCourse.pending, (state) => {
        state.loading = true;
      })
      .addCase(postAdminCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(postAdminCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Store the error message
      })
      .addCase(getStudents.fulfilled, (state, action) => {
        state.StudentDetails = action.payload;
      })
      .addCase(getSingleStudent.fulfilled, (state, action) => {
        state.StudentProfile = action.payload;
      })
      .addCase(ChangeStudentStatus.fulfilled, (state, action) => {
        state.StudentDetails = action.payload;
      })
      .addCase(getAdmissions.fulfilled, (state, action) => {
        state.AdmissionDetails = action.payload;
      })
      .addCase(getSingleAdmissions.fulfilled, (state, action) => {
        state.AdmissionProfile = action.payload;
      })
      .addCase(ApproveAdmission.fulfilled, (state, action) => {
        state.AdmissionDetails = action.payload;
      })
      .addCase(RejectAdmission.fulfilled, (state, action) => {
        state.AdmissionDetails = action.payload;
      })
      .addCase(getAllCounciler.fulfilled, (state, action) => {
        state.CouncilerDetails = action.payload;
      })
      .addCase(getSingleCounciler.fulfilled, (state, action) => {
        state.CounsilerProfile = action.payload;
      })
      .addCase(getAllCourses.fulfilled, (state, action) => {
        state.CourseDetails = action.payload;
      })
      .addCase(getAllColleges.fulfilled, (state, action) => {
        state.CollegeDetails = action.payload;
      })
      .addCase(getAdminSingleCollege.fulfilled, (state, action) => {
        state.CollegeProfile = action.payload;
      });
  },
});

export default adminSlice.reducer;
