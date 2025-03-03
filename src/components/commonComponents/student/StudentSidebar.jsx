import { MdDashboard, MdOutlineEventNote } from "react-icons/md";
import { GoQuestion } from "react-icons/go";
import {  FaWpforms } from "react-icons/fa";
import { PiChalkboardTeacherLight } from "react-icons/pi";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import { HiX } from "react-icons/hi";
import graduation from "../../../assets/Sidebar/Graduation Cap.svg";

// Sidebar data
const SidebarData = [
  { name: "Dashboard", icon: MdDashboard, path: "/student/dashboard" },
  { name: "Aptitude Test", icon: GoQuestion, path: "/student/test" },
  { name: "Book Counsellor", icon: PiChalkboardTeacherLight, path: "/student/counsillor" },
  { name: "Bookings", icon: MdOutlineEventNote, path: "/student/bookings" },
  { name: "Recommended", icon: FaWpforms, path: "/student/recommended" },
  { name: "Admission", icon: FaWpforms, path: "/student/admission" },
];

const StudentSidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Helper to check active state
  const isActive = (path) => location.pathname.includes(path);

  // Helper for dynamic classes
  const getNavItemClasses = (active) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer font-medium transition-all duration-200 ${
      active
        ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white"
        : "bg-white text-gray-600 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-500 hover:text-white"
    }`;

  const getIconClasses = (active) =>
    `w-5 h-5 ${active ? "text-white" : "text-gray-600"}`;

  return (
    <aside
      className={`fixed top-0 left-0 h-full z-30 w-[239px] transform transition-all duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:relative lg:translate-x-0`}
    >
      <div className="h-full flex flex-col bg-white p-4 lg:p-5">
        {/* Close button for mobile */}
        <button
          onClick={onClose}
          className="lg:hidden absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-white"
        >
          <HiX className="w-6 h-6" />
        </button>

        {/* Sidebar Header */}
        <div className="flex justify-center items-center pt-4 lg:pt-5">
          <img
            src={graduation}
            alt="Graduation Cap"
            className="bg-black p-4 rounded-xl transition-transform hover:scale-105"
          />
        </div>

        {/* Navigation */}
        <nav className="flex-grow mt-8 space-y-2">
          {SidebarData.map((data, i) => {
            const active = isActive(data.path);
            return (
              <div
                key={i}
                onClick={() => {
                  navigate(data.path);
                  onClose();
                }}
                className={getNavItemClasses(active)}
              >
                <data.icon className={getIconClasses(active)} />
                <span className="text-sm lg:text-base">{data.name}</span>
              </div>
            );
          })}
        </nav>

        {/* Logout Button */}
        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/student/login");
          }}
          className={getNavItemClasses(false)}
        >
          <RiLogoutBoxRFill className="h-5 w-5 text-gray-600" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default StudentSidebar;
