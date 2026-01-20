import { MdDashboard } from "react-icons/md";
import {
  FaWpforms,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaSchool,
} from "react-icons/fa";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { HiX } from "react-icons/hi";
import Admin from "../../../assets/Icons/adminSidebar.svg";
import { useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const SidebarData = [
  { name: "Dashboard", icon: MdDashboard, path: "/admin/dashboard" },
  { name: "Students", icon: FaUserGraduate, path: "/admin/students" },
  { name: "Counsellor", icon: FaChalkboardTeacher, path: "/admin/councillors" },
  { name: "Colleges", icon: FaSchool, path: "/admin/colleges" },
  { name: "Admission", icon: FaWpforms, path: "/admin/admission" },
];

const AdminSidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname.includes(path);

  const getNavItemClasses = (active) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer font-medium transition-all duration-200 ${
      active
        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-indigo-200/50"
        : "text-slate-500 hover:bg-indigo-50 hover:text-indigo-600"
    }`;

  const getIconClasses = (active) =>
    `w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${
      active ? "text-white" : "text-slate-400 group-hover:text-indigo-600"
    }`;

  return (
    <>
      {/* Mobile Backdrop */}
      <div
        className={`fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-30 lg:hidden transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />
      
      <aside
        className={`fixed top-0 left-0 h-full z-40 w-[260px] transform transition-transform duration-300 ease-out lg:relative lg:translate-x-0 bg-white border-r border-slate-100 shadow-xl lg:shadow-none ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Close button - Mobile only */}
           <button
            onClick={onClose}
            className="lg:hidden absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
          >
            <HiX className="w-6 h-6" />
          </button>

           {/* Logo Section */}
           <div className="flex flex-col items-center pt-8 pb-8 px-6">
            <div className="p-3 bg-slate-900 rounded-2xl mb-4 group transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20">
              <img
                src={Admin}
                alt="Admin Icon"
                className="w-10 h-10 transition-transform duration-500 group-hover:scale-110 invert brightness-0"
              />
            </div>
            <h2 className="text-xl font-bold text-slate-800 text-center">
              Admin Portal
            </h2>
            <p className="text-xs text-slate-400 font-medium tracking-wide uppercase mt-1">Management</p>
          </div>

          {/* Navigation */}
          <nav className="flex-grow space-y-1.5 px-4 overflow-y-auto no-scrollbar py-2">
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
                  className={`${getNavItemClasses(active)} group`}
                >
                  <Icon className={getIconClasses(active)} />
                  <span className="text-sm font-semibold tracking-wide">{data.name}</span>
                   {active && (
                     <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse" />
                  )}
                </div>
              );
            })}
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-slate-100 mt-auto">
            <button
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/admin/login");
              }}
              className="flex items-center gap-3 px-4 py-3.5 rounded-xl cursor-pointer font-medium w-full transition-all duration-300 group bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 hover:shadow-sm"
            >
              <RiLogoutBoxRFill className="w-5 h-5 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-x-1" />
              <span className="text-sm font-semibold tracking-wide">Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

AdminSidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AdminSidebar;
