import { Routes, Route, Navigate } from "react-router-dom";
import Dashbord from "../pages/studentsPortalPage/Dashbord";
import Admission from "../pages/studentsPortalPage/Admission";
import BookCouncillor from "../pages/studentsPortalPage/bookcouncillor/BookCouncillor";
import CouncillorProfile from "../pages/studentsPortalPage/bookcouncillor/CouncillorProfile";
import AptitudeTest from "../pages/studentsPortalPage/aptitudetest.jsx/AptitudeTest";
import StudentLayout from "../layouts/StudentLayout";
import SlotSelect from "../pages/studentsPortalPage/bookcouncillor/slotlSelection/SlotSelect";
import { jwtDecode } from "jwt-decode";
import Login from "../pages/studentsPortalPage/Login";
import StudentSignUp from "../pages/studentsPortalPage/StudentSignUp";
import ProtectedRoute from "./ProtectedRoute";
import AddmissionTable from "../pages/studentsPortalPage/AddmissionTable";
import AdmissionProfileStudent from "../pages/studentsPortalPage/AddmissionProfileStudent";
import Bookings from "../pages/studentsPortalPage/bookings/Bookings";
import AllrecommendedColleges from "../pages/studentsPortalPage/bookings/AllrecommendedColleges";
import BookedCouncillorProfile from "../pages/studentsPortalPage/bookings/BookedCouncillorProfile";
import StudentPreLogin from "../pages/studentsPortalPage/StudentPreLogin";

const RedirectIfAuthenticated = ({ children }) => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const decoded = jwtDecode(token);
      if (decoded === "student") {
        return <Navigate to="/student/dashboard" replace />;
      } else {
        localStorage.removeItem("token");
        return <Navigate to="/student/login" replace />;
      }
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }

  return children;
};

const StudentPortalRoute = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<StudentPreLogin />}></Route>
        <Route
          path="/student/login"
          element={
            <RedirectIfAuthenticated>
              <Login />
            </RedirectIfAuthenticated>
          }
        ></Route>
        <Route
          path="/student/signup"
          element={
            <RedirectIfAuthenticated>
              <StudentSignUp />
            </RedirectIfAuthenticated>
          }
        ></Route>
        <Route element={<ProtectedRoute requiredRole="student" />}>
          <Route path="/student" element={<StudentLayout />}>
            <Route index element={<Dashbord />} />
            <Route path="dashboard" element={<Dashbord />}></Route>
            <Route path="admission" element={<AddmissionTable />}></Route>
            <Route path="admission/create" element={<Admission />}></Route>
            <Route
              path="admission/profile"
              element={<AdmissionProfileStudent />}
            ></Route>
            <Route path="counsillor" element={<BookCouncillor />}></Route>
            <Route
              path="counsillor/profile"
              element={<CouncillorProfile />}
            ></Route>
            <Route path="counsillor/booking" element={<SlotSelect />}></Route>
            <Route path="bookings" element={<Bookings />}></Route>
            <Route
              path="booking/profile"
              element={<BookedCouncillorProfile />}
            ></Route>
            <Route
              path="recommended"
              element={<AllrecommendedColleges />}
            ></Route>
            <Route path="test" element={<AptitudeTest />}></Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default StudentPortalRoute;
