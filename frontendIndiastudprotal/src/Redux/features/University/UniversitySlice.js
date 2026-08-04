import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  DeleteCollegeAPI,
  DeleteCourseAPI,
  EditAdminCourseAPI,
  EditCollegeAPI,
  EditCourseAPI,
  createUniversityAPI,
  getAllUniversityAdmissionsAPI,
  getAllUniversityCoursesAPI,
  getCourseApi,
  getCourseNameAPI,
  getSingleCollegeAPI,
  getStateListAPI,
  getUniversityAPI,
  getUniversitySingleAdmissionAPI,
  getUniversitySingleStudentAPI,
  getUniversityStudentsAPI,
  postCourseApi,
} from "../../../api/url";
import axios from "../../../api/axios";
import { data } from "autoprefixer";
import { actions } from "react-table";

const initialState = {
  collegeData: null,
  gettingAllColleges: null,
  singleCollegeData: null,
  UpdatedCollegeData: null,
  selectedCollege: null,
  selectedStudent: null,
  universityData: null,
  singleStudentData: null,
  singleAdmissionData: null,
  courseEditing: null,
  admissionData: null,
  deleteCollege: null,
  dataCourses: [],
  courses: [],
  stateList: [],
  courseName: [],
  loading: false,
  error: null,
};

export const createCollege = createAsyncThunk(
  "createCollege",
  async (body, thunkAPI) => {
    try {
      const response = await axios.post(`${createUniversityAPI}`, body);
      return response.data;
    } catch (error) {
      console.log(error.response.data, "its rejecerdf");
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// get college
export const fetchCollege = createAsyncThunk(
  "university/fetchCollege",
  async (id, thunkAPI) => {
    // Accept 'id' as a parameter
    try {
      const response = await axios.get(`${getUniversityAPI}${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// get single college
export const getSingleCollege = createAsyncThunk(
  "university/getSingleCollege",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${getSingleCollegeAPI}${id}`);
      console.log(response.data, "responseresponseresponse");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// update college
export const UpdateCollege = createAsyncThunk(
  "university/editCollege",
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await axios.put(`${EditCollegeAPI}${id}`, data);
      return response.data;
    } catch (error) {
      console.error("UpdateCollege Error:", error); // Log the error for debugging
      return thunkAPI.rejectWithValue(error.response?.data || "Unknown Error");
    }
  }
); // update college
export const UpdateCourse = createAsyncThunk(
  "university/editCourse",
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await axios.put(`${EditCourseAPI}${id}`, data);
      return response.data;
    } catch (error) {
      console.error("UpdateCourse Error:", error); // Log the error for debugging
      return thunkAPI.rejectWithValue(error.response?.data || "Unknown Error");
    }
  }
);

// delete college
export const deleteCollege = createAsyncThunk(
  "deleteCollege",
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`${DeleteCollegeAPI}${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const postCourse = createAsyncThunk(
  "courses/postCourse",
  async (courseData, thunkAPI) => {
    try {
      const response = await axios.post(postCourseApi, courseData);
      console.log(response, "postCoursepostCourse");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to get course data
export const getCourse = createAsyncThunk(
  "courses/getCoursesApi",
  async (thunkAPI) => {
    try {
      const response = await axios.get(`${getCourseApi}`, {});
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// delete course

export const deleteCourse = createAsyncThunk(
  "deleteCourse",
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`${DeleteCourseAPI}${id}`);
      // Return the deleted course name or any relevant data upon successful deletion
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// // update course
// export const editCourse = createAsyncThunk("editCourse", async (id,thunkAPI) => {
//   try {
//     const response = await axios.put(`${EditCourseAPI}${id}`,data);
//     // Return the edited course data or any relevant data upon successful editing
//     return response.data;
//   } catch (error) {
//     console.log(error.response.data,"its rejecerdf")
//     return thunkAPI.rejectWithValue(error.response.data);   }
// });

// export const getAllAdmission = createAsyncThunk(
//   'university/getAllAdmission',
//   async () => {
//     try {
//       const response = await axios.get(`${getAllUniversityAdmissionsAPI}`);
//       return response.data;
//     } catch (error) {
//       throw error;
//     }
//   }
//   );

// get All Admissions

export const getAllAdmission = createAsyncThunk(
  "university/getAllAdmission",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${getAllUniversityAdmissionsAPI}${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// get single admission

export const getUniversitySingleAdmission = createAsyncThunk(
  "university/getUniversitySingleAdmission",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(
        `${getUniversitySingleAdmissionAPI}${id}`
      );
      console.log(response.data, "single");
      return response.data;
    } catch (error) {
      console.log(error.response.data, "its rejecerdf");
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// get All students
export const getAllStudents = createAsyncThunk(
  "university/getAllStudents",
  async (id, thunkAPI) => {
    try {
      console.log(
        "fetching college studnets in getallstudents in university slice"
      );
      const response = await axios.get(`${getUniversityStudentsAPI}${id}`);
      // console.log(response.data,'erssre');
      return response.data;
    } catch (error) {
      console.log(error.response.data, "its rejecerdf");
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// get All courses
export const getAllCourses = createAsyncThunk(
  "university/getAllCourses",
  async () => {
    try {
      const response = await axios.get(`${getAllUniversityCoursesAPI}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

// get single student
export const getUniversitySingleStudent = createAsyncThunk(
  "university/getUniversitySingleStudent",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${getUniversitySingleStudentAPI}${id}`);
      console.log(response.data, "single");
      return response.data;
    } catch (error) {
      console.log(error.response.data, "its rejecerdf");
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
// state list api for dropdown
export const getStateList = createAsyncThunk(
  "university/states",
  async (thunkAPI) => {
    try {
      const response = await axios.get(`${getStateListAPI}`);
      console.log(response.data, "state list");
      return response.data;
    } catch (error) {
      console.log(error.response.data, "rejected state list");
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getCourseName = createAsyncThunk(
  "university/courcename",
  async (thunkAPI) => {
    try {
      const response = await axios.get(`${getCourseNameAPI}`);
      console.log(response.data, "cource list");
      return response.data;
    } catch (error) {
      console.log(error.response.data, "rejected cource list");
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const collegeSlice = createSlice({
  name: "college",
  initialState,
  reducers: {
    // setSelectedCollege(state, action) {
    //   state.selectedCollege = action.payload;
    // },
    // setSelectedStudent(state, action) {
    //   state.selectedStudent = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCollege.pending, (state, action) => {
        console.log("peinding in teh create college");
      })
      .addCase(createCollege.fulfilled, (state, action) => {
        state.collegeData = action.payload;
      })
      .addCase(createCollege.rejected, (state, action) => {})
      .addCase(fetchCollege.fulfilled, (state, action) => {
        state.gettingAllColleges = action.payload;
      })
      .addCase(UpdateCollege.fulfilled, (state, action) => {
        state.gettingAllColleges = action.payload;
      })
      .addCase(UpdateCourse.fulfilled, (state, action) => {
        state.gettingAllColleges = action.payload;
      })
      .addCase(deleteCollege.fulfilled, (state, action) => {
        state.deleteCollege = action.payload;
      })
      .addCase(postCourse.pending, (state) => {
        state.loading = true;
      })
      .addCase(postCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
        // state.courses.push(action.payload); // Store the newly added course
      })
      .addCase(postCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Store the error message
      })
      .addCase(getCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload.courses;
        state.dataCourses = action.payload.dataCourses;
      })
      .addCase(getCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.singleCollegeData = action.payload;
      })
      .addCase(getAllAdmission.fulfilled, (state, action) => {
        state.admissionData = action.payload.admissions;
      })
      .addCase(getUniversitySingleAdmission.fulfilled, (state, action) => {
        state.singleAdmissionData = action.payload;
      })
      .addCase(getAllStudents.fulfilled, (state, action) => {
        state.universityData = action.payload;
      })
      .addCase(getAllCourses.fulfilled, (state, action) => {
        state.universityData = action.payload;
      })
      .addCase(getSingleCollege.fulfilled, (state, action) => {
        state.singleCollegeData = action.payload;
      })
      .addCase(getUniversitySingleStudent.fulfilled, (state, action) => {
        state.singleStudentData = action.payload;
      })
      .addCase(getStateList.fulfilled, (state, action) => {
        state.stateList = action.payload.states;
      })
      .addCase(getCourseName.fulfilled, (state, action) => {
        state.courseName = action.payload.courses;
      });
  },
});
export const { setSelectedCollege } = collegeSlice.actions;
export const { setSelectedStudent } = collegeSlice.actions;

export default collegeSlice.reducer;
