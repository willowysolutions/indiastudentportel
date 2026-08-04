import { HiOutlineSparkles } from "react-icons/hi";

const Header = ({ title, Icon, description }) => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-slate-50 border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/5 hover:border-blue-300/50 group">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none group-hover:opacity-[0.08] transition-opacity duration-500">
        <HiOutlineSparkles size={150} className="text-blue-600 rotate-12" />
      </div>

      <div className="relative z-10 flex items-center justify-between p-6 md:p-8">
        <div className="space-y-1">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 group-hover:text-blue-700 transition-colors duration-300">
            {title}
          </h2>
          {description && (
            <p className="text-slate-500 text-sm md:text-base font-medium max-w-2xl">
              {description}
            </p>
          )}
          <div className="h-1 w-12 bg-blue-600 rounded-full transition-all duration-300 group-hover:w-24 opacity-0 group-hover:opacity-100 mt-2"></div>
        </div>

        <div className="relative z-10 flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-blue-50 text-blue-600 shadow-sm border border-blue-100 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
          <Icon className="w-7 h-7 md:w-8 md:h-8" />
        </div>
      </div>
    </div>
  );
};

import PropTypes from "prop-types";

Header.propTypes = {
  title: PropTypes.string.isRequired,
  Icon: PropTypes.elementType.isRequired,
  description: PropTypes.string,
};

export default Header;
