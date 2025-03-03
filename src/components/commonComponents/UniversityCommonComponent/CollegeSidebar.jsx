import { MdDashboard, MdOutlineAddBox, MdPersonOutline } from "react-icons/md";
import { FaGraduationCap } from "react-icons/fa";
import { RiLogoutBoxRFill } from "react-icons/ri";
import graduation from "../../../assets/Sidebar/Graduation Cap.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { HiX } from "react-icons/hi";

const SidebarData = [
  { name: "Dashboard", icon: MdDashboard, path: "/university/dashboard" },
  { name: "Profile", icon: MdPersonOutline, path: "/university/collegeProfile" },
  { name: "Our Courses", icon: FaGraduationCap, path: "/university/coursesList" },
  { name: "Add Course", icon: MdOutlineAddBox, path: "/university/addCourse" },
  // { name: "Edit Profile", icon: MdDashboard, path: "/university/editCollege" },
];

const CollegeSidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Helper to determine active state
  const isActive = (path) => location.pathname.includes(path);

  // Dynamic classes for navigation items
  const getNavItemClasses = (active) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer font-medium transition-all duration-200 ${
      active
        ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white"
        : "bg-white text-gray-600 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-500 hover:text-white"
    }`;

  // Dynamic classes for icons
  const getIconClasses = (active) =>
    `w-5 h-5 ${active ? "text-white" : "text-gray-600"}`;

  return (
    <aside
      className={`fixed top-0 left-0 h-full z-30 w-[239px] transform transition-all duration-300 ease-in-out lg:relative lg:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="h-full">
        <div className="flex flex-col h-full bg-white p-4 lg:p-5 relative">
          {/* Close button - Mobile only */}
          <button
            onClick={onClose}
            className="lg:hidden absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-white"
            aria-label="Close Sidebar"
          >
            <HiX className="w-6 h-6" />
          </button>

          {/* Sidebar header */}
          <div className="flex justify-center items-center pt-4 lg:pt-5">
            <img
              src={graduation}
              alt="Graduation Cap"
              className="bg-black p-4 rounded-xl transition-transform hover:scale-105"
            />
          </div>

          {/* Navigation items */}
          <nav className="flex-grow mt-8 space-y-2">
            {SidebarData.map((data, i) => {
              const Icon = data.icon;
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
                  <Icon className={getIconClasses(active)} />
                  <span className="text-sm lg:text-base">{data.name}</span>
                </div>
              );
            })}
          </nav>

          {/* Logout button */}
          <button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/university/login");
            }}
            className="flex items-center gap-3 px-4 py-3 mt-4 text-gray-600 hover:text-white hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-500 rounded-lg transition-all duration-200"
            aria-label="Logout"
          >
            <RiLogoutBoxRFill className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default CollegeSidebar;
