import AdminName from "./AdminName";
import { HiMenuAlt2 } from "react-icons/hi";
import PropTypes from "prop-types";
//imports................................................................................................

const Nav = ({ onMenuClick , DATA, portalName }) => {
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
          <div className="pl-4 border-l border-slate-200/60">
             <AdminName data={DATA} />
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
