import { Routes, Route, Navigate } from "react-router-dom";
import UniversityLayout from "../layouts/UniversityLayout";
import Dashbord from "../pages/UniversityPortalPage/Dashbord";
import CoursesList from "../pages/UniversityPortalPage/CoursesList";
import UniversityLogin from "../pages/UniversityPortalPage/UnivercityLogin";
import UniversitySignUp from "../pages/UniversityPortalPage/UniversitySignUp";
import ProtectedRoute from "./ProtectedRoute";
import { jwtDecode } from "jwt-decode";
import AddCourse from "../pages/UniversityPortalPage/AddCollages";
import EditCourse from "../components/commonComponents/EditCourse";
import EditCollege from "../components/commonComponents/EditCollege";
import CollegeProfile from "../components/commonComponents/UniversityCommonComponent/CollegeProfile";
// import AdmissionUnderUniversity from "../pages/UniversityPortalPage/AdmissionUderUniversity";
// import StudentsUnderUniversity from "../pages/UniversityPortalPage/StudentsUnderUniversity";
// import UniversityStudentDetail from "../pages/UniversityPortalPage/UniversityStudentDetail";
import Collages from "../pages/UniversityPortalPage/Collages";

const RedirectIfAuthenticated = ({ children }) => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const decoded = jwtDecode(token);
      if (decoded === "university") {
        return <Navigate to="/university/dashboard" replace />;
      } else {
        localStorage.removeItem("token");
        return <Navigate to="/university/login" replace />;
      }
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }

  return children;
};

const UniversityPortalRoute = () => {
  return (
    <div>
      <Routes>
        {/* Unprotected Routes */}
        <Route
          path="/university/login"
          element={
            <RedirectIfAuthenticated>
              <UniversityLogin />
            </RedirectIfAuthenticated>
          }
        />
        <Route
          path="/university/signup"
          element={
            <RedirectIfAuthenticated>
              <UniversitySignUp />
            </RedirectIfAuthenticated>
          }
        />

        <Route element={<ProtectedRoute requiredRole="university" />}>
          <Route path="/university" element={<UniversityLayout />}>
            <Route index element={<Dashbord />} />
            <Route path="dashboard" element={<Dashbord />} />
            <Route path="collegeProfile" element={<CollegeProfile />} />
            <Route path="coursesList" element={<CoursesList />} />
            <Route path="addCourse" element={<AddCourse />} />
            <Route path="editCourse/:id" element={<EditCourse />} />
            <Route path="editCollege/:id" element={<EditCollege />} />
            {/* <Route path="courses/:id" element={<Collages />} /> */}
            {/* <Route path="students" element={<StudentsUnderUniversity />} /> */}
            {/* <Route path="studentDetail" element={<UniversityStudentDetail />} /> */}
            {/* <Route path="admission" element={<AdmissionUnderUniversity />} /> */}
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default UniversityPortalRoute;
