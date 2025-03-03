import AdminName from "./AdminName";
import { IoIosArrowDown } from "react-icons/io";
import { HiMenuAlt2 } from "react-icons/hi";
//imports................................................................................................

const Nav = ({ onMenuClick , DATA }) => {
  return (
    <header className="sticky top-0 bg-white shadow-sm z-10">
      <div className="px-4 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            <HiMenuAlt2 className="w-6 h-6 text-gray-600" />
          </button>
          {/* <Search /> */}
        </div>

        <div className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-lg transition-colors">
          <AdminName data={DATA} />
          {/* <IoIosArrowDown className="text-gray-600" /> */}
        </div>
      </div>
    </header>
  );
};

export default Nav;
