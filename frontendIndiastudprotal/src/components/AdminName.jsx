//imports................................................................................................
import PropTypes from "prop-types";

const AdminName = ({ data }) => {
  return (
    <div className="flex gap-3 items-center group cursor-pointer p-1.5 pr-3 rounded-full hover:bg-white/50 border border-transparent hover:border-white/40 transition-all duration-200">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 p-0.5 shadow-md group-hover:shadow-lg transition-all duration-300">
        <div className="w-full h-full rounded-full bg-slate-50 border-2 border-transparent flex items-center justify-center text-indigo-600 font-bold text-lg">
           {data?.name?.charAt(0) || "U"}
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-slate-700 group-hover:text-indigo-600 transition-colors">
           {data?.name?.split(" ")[0]}
        </span>
        <span className="text-[10px] uppercase tracking-wider font-medium text-slate-400">
          Counsellor
        </span>
      </div>
      <div className="text-slate-400 group-hover:text-indigo-500 transition-colors">
        {/* You can import and use IoIosArrowDown here if you want it back */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
};

AdminName.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
  }),
};

export default AdminName;
