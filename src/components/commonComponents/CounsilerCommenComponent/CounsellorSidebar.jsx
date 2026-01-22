import { useLocation, useNavigate } from "react-router-dom";
import { MdDashboard, MdOutlineEventNote } from "react-icons/md";
import { FaGraduationCap } from "react-icons/fa";
import { FaSchool } from "react-icons/fa";
import { RiLogoutBoxRFill } from "react-icons/ri";

import { HiX } from "react-icons/hi";
import PropTypes from "prop-types";
//imports................................................................................................

const SidebarData = [
  { name: "Dashboard", icon: MdDashboard, path: "/counsellor/dashboard" },
  { name: "Bookings", icon: MdOutlineEventNote, path: "/counsellor/booking" },
  {
    name: "All Colleges",
    icon: FaSchool,
    path: "/counsellor/collegesCounsellors",
  },
  { name: "Wallet", icon: FaGraduationCap, path: "/counsellor/wallet" },
];

const CounsellorSidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname.includes(path);

  const getNavItemClasses = (active) =>
    `flex items-center gap-3 px-4 py-3.5 rounded-xl cursor-pointer font-medium transition-all duration-300 group ${
      active
        ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-200"
        : "text-slate-500 hover:bg-indigo-50 hover:text-indigo-600"
    }`;

  const getIconClasses = (active) =>
    `w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${active ? "text-white" : "text-slate-400 group-hover:text-indigo-600"}`;

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-30 lg:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed top-0 left-0 h-full z-40 w-[260px] transform transition-transform duration-300 cubic-bezier(0.4, 0, 0.2, 1) lg:relative lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full bg-white border-r border-slate-100 shadow-xl lg:shadow-none flex flex-col p-6 relative">
          {/* Close button for mobile */}
          <button
            onClick={onClose}
            className="lg:hidden absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
          >
            <HiX className="w-6 h-6" />
          </button>

          {/* Logo Section */}
          <div className="flex flex-col items-center pt-2 pb-8">
            <div className="mb-3 group transition-all duration-300">
              <img
                src="/images/Logo-final-file.png"
                alt="Logo"
                className="w-40 object-contain transition-transform duration-500 hover:scale-105"
              />
            </div>
            <h2 className="text-xl font-bold text-slate-800 text-center">
              India Student
            </h2>
            <p className="text-xs text-slate-400 font-medium tracking-wide uppercase mt-1">Counsellor Portal</p>
          </div>

          {/* Navigation */}
          <nav className="flex-grow space-y-2 overflow-y-auto no-scrollbar py-4">
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
                  <span className="text-sm font-semibold tracking-wide">{data.name}</span>
                  {active && (
                     <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse" />
                  )}
                </div>
              );
            })}
          </nav>

          {/* Logout Button */}
          <div className="pt-6 border-t border-slate-100 mt-auto">
            <button
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/counsellor/login");
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

CounsellorSidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CounsellorSidebar;
