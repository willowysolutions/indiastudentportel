import { useSelector } from "react-redux";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import CounsellorSidebar from "../components/commonComponents/CounsilerCommenComponent/CounsellorSidebar";
import Nav from "../components/Nav";

//imports................................................................................................

function CounsellorLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const counsellorName = useSelector(
    (state) => state?.councilerAuth?.counsillor
  );
  return (
    <div className="h-screen flex">
      {/* Sidebar section */}
      <div
        className={`md:w-60 transition-all duration-300 ${
          isSidebarOpen ? "block" : "hidden"
        } lg:block`}
      >
        <CounsellorSidebar
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
          DATA={counsellorName}
          portalName="Counsellor Portal"
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
}

export default CounsellorLayout;
