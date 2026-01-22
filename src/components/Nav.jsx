import AdminName from "./AdminName";
import { HiMenuAlt2 } from "react-icons/hi";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
//imports................................................................................................

const Nav = ({ onMenuClick , DATA, portalName }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/student/login");
  };

  return (
    <header className="sticky top-0 z-50 transition-all duration-300">
      <div className="absolute inset-0 bg-white/70 backdrop-blur-md shadow-sm border-b border-white/20"></div>
      <div className="relative px-4 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2.5 hover:bg-white/50 active:scale-95 text-slate-600 rounded-xl transition-all duration-200 border border-transparent hover:border-white/40 hover:shadow-sm"
            aria-label="Toggle menu"
          >
            <HiMenuAlt2 className="w-6 h-6" />
          </button>
          
          <div className="hidden sm:block">
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
              {portalName}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Add more nav items here if needed */}
          <div className="pl-4 border-l border-slate-200/60 relative">
             <div 
               onClick={() => setShowDropdown(!showDropdown)}
               className="cursor-pointer"
             >
               <AdminName data={DATA} />
             </div>

             {showDropdown && (
               <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-100 py-2 animate-in fade-in slide-in-from-top-5">
                 <div className="px-4 py-3 border-b border-slate-100">
                   <p className="text-sm font-semibold text-slate-700">Signed in as</p>
                   <p className="text-sm text-slate-500 truncate" title={DATA?.name || "User"}>
                     {DATA?.name || "User"}
                   </p>
                 </div>
                 
                 <div className="p-1">
                   <button
                     onClick={handleLogout}
                     className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                   >
                     <RiLogoutBoxRFill className="w-4 h-4" />
                     Logout
                   </button>
                 </div>
               </div>
             )}
          </div>
        </div>
      </div>
    </header>
  );
};

Nav.propTypes = {
  onMenuClick: PropTypes.func.isRequired,
  DATA: PropTypes.object,
  portalName: PropTypes.string,
};

export default Nav;
