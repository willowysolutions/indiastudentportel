import { useLocation, useNavigate } from "react-router-dom";
import { MdDashboard, MdOutlineEventNote } from "react-icons/md";
import { FaGraduationCap } from "react-icons/fa";
import { FaSchool } from "react-icons/fa";
import { RiLogoutBoxRFill } from "react-icons/ri";
import graduation from "../../../assets/Sidebar/Graduation Cap.svg";
import { HiX } from "react-icons/hi";
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
  // { name: 'All Recomended', icon: FaSchool, path: '/counsellor/collegesCounsellors' },
  //   { name: "Add Colleges", icon: MdOutlineAddBox, path: "/university/addcolleges" },
  // { name: "Book Councillor", icon: PiChalkboardTeacherLight, path: "/student/councillor" },
];

const CounsellorSidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname.includes(path);

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
      className={`fixed top-0 left-0 h-full z-30 w-[239px] transform transition-all duration-300 ease-in-out lg:relative lg:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="h-full">
        <div className="flex flex-col h-full bg-white p-4 lg:p-5 relative">
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
              navigate("/counsellor/login");
            }}
            className={getNavItemClasses(false)}
          >
            <RiLogoutBoxRFill className="h-5 w-5 text-gray-600" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default CounsellorSidebar;
