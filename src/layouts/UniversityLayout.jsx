import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";
import CollegeSidebar from "../components/commonComponents/UniversityCommonComponent/CollegeSidebar";
import { useSelector } from "react-redux";
import { useState } from "react";

function UniversityLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const universityName = useSelector((state) => state?.universityAuth?.university);

  return (
    <div className="h-screen flex">
      {/* Sidebar for larger screens */}
      <div
        className={`md:w-60 transition-all duration-300 ${
          isSidebarOpen ? "block" : "hidden"
        } lg:block`}
      >
        <CollegeSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      </div>

      {/* Main content section */}
      <div className="flex flex-col flex-grow h-screen overflow-hidden bg-gradient-to-b from-sky-200 to-blue-100">
        {/* Navbar */}
        <Nav
          className="shadow-md z-50"
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
          DATA={universityName}
        />

        {/* Content */}
        <div className="flex-grow overflow-y-auto no-scrollbar overflow-x-auto h-full p-2">
          <div className="md:p-5 ">
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
}

export default UniversityLayout;
