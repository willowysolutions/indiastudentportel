import { Routes, Route, Navigate } from "react-router-dom";
import Dashbord from "../pages/CounsellorPortal/DashBord";
import Wallet from "../pages/CounsellorPortal/Wallet";
import StudentDashbord from "../pages/CounsellorPortal/SloteDetails";
import RecommendCollegeProfile from "../pages/CounsellorPortal/RecommendCollegeProfile";
import Bookings from "../pages/CounsellorPortal/Bookings";
import CounsellorLayout from "../layouts/CounsellorLayout";
import CounsillorLogin from "../pages/CounsellorPortal/CounsillorLogin";
import { jwtDecode } from "jwt-decode";
import ProtectedRoute from "./ProtectedRoute";
import CounsillorSignup from "../pages/CounsellorPortal/CounsillorSignup";
import CollegesCounsellors from "../pages/CounsellorPortal/CounsellorColleges";
import CounsellorPreLogin from "../pages/CounsellorPortal/CounsellorPreLogin";

const RedirectIfAuthenticated = ({ children }) => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const decoded = jwtDecode(token);
      if (decoded === "counsellor") {
        return <Navigate to="/counsellor/dashboard" replace />;
      } else {
        localStorage.removeItem("token");
        return <Navigate to="/counsellor/login" replace />;
      }
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }

  return children;
};

const CounsillorPortalRoute = () => {
  return (
    <div>
      <Routes>
        <Route path="/counselor" element={<CounsellorPreLogin />} />
        <Route
          path="counsellor/login"
          element={
            <RedirectIfAuthenticated>
              <CounsillorLogin />
            </RedirectIfAuthenticated>
          }
        ></Route>
        <Route
          path="counsellor/signup"
          element={
            <RedirectIfAuthenticated>
              <CounsillorSignup />
            </RedirectIfAuthenticated>
          }
        ></Route>

        <Route element={<ProtectedRoute requiredRole="counsellor" />}>
          <Route path="/counsellor" element={<CounsellorLayout />}>
            <Route index element={<Dashbord />} />
            <Route path="dashboard" element={<Dashbord />}></Route>
            <Route
              path="collegesCounsellors"
              element={<CollegesCounsellors />}
            ></Route>
            <Route path="wallet" element={<Wallet />}></Route>
            <Route path="booking" element={<Bookings />}></Route>
            <Route path="booking/:id" element={<StudentDashbord />} />
            <Route
              path="booking/:id/:collegeId"
              element={<RecommendCollegeProfile />}
            />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default CounsillorPortalRoute;
