import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";
import { useState } from "react";
import { useSelector } from "react-redux";
import StudentSidebar from "../components/commonComponents/student/StudentSidebar";

const StudentLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const student = useSelector((state) => state?.studentAuth?.studentDetails);

  return (
    <div className="h-screen flex">
      <div
        className={`md:w-60 transition-all duration-300 ${
          isSidebarOpen ? "block" : "hidden"
        } lg:block`}
      >
        <StudentSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          className="transition-all duration-300"
        />
      </div>
      {/* Main content section */}
      <div className="flex flex-col flex-grow h-screen overflow-hidden bg-slate-50">
        {/* Navbar */}
        <Nav
          className="shadow-md z-50"
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
          DATA={student}
          portalName="Student Portal"
        />
        {/* Content */}
        <div className="flex-grow overflow-y-auto no-scrollbar overflow-x-auto h-full p-2">
          <div className="md:p-5">
            <Outlet />
          </div>
        </div>
      </div>
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-20 lg:hidden transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default StudentLayout;
