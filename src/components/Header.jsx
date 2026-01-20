const Header = ({ title, Icon }) => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-900 to-purple-900 shadow-lg text-white p-6 md:p-8 flex justify-between items-center group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10 transition-all duration-500 group-hover:bg-white/10"></div>
      
      <div className="relative z-10">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h2>
        <div className="h-1 w-20 bg-indigo-500 rounded-full mt-2 group-hover:w-full transition-all duration-500"></div>
      </div>
      
      <div className="relative z-10 bg-white/10 p-3 rounded-2xl backdrop-blur-sm border border-white/10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
        <Icon className="w-6 h-6 md:w-8 md:h-8" />
      </div>
    </div>
  );
};

export default Header;
