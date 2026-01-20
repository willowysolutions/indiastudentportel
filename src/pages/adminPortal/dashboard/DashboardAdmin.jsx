import { useNavigate } from "react-router-dom";
import icon from "../../../assets/dashboard/ADMIN.png";
import { useSelector } from "react-redux";
import { FaUserGraduate, FaChalkboardTeacher, FaSchool, FaWpforms } from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";

const DashbordAdmin = () => {
  const admin = useSelector((state) => state?.adminauth?.admin);
  const navigate = useNavigate();

  const cards = [
    {
      title: "Students",
      description: "Manage student profiles",
      icon: FaUserGraduate,
      path: "/admin/students",
      color: "from-blue-500 to-indigo-600",
      bg: "bg-blue-50 text-blue-600",
    },
    {
      title: "Counsellor",
      description: "Manage counselor accounts",
      icon: FaChalkboardTeacher,
      path: "/admin/councillors",
      color: "from-purple-500 to-pink-600",
      bg: "bg-purple-50 text-purple-600",
    },
    {
      title: "Colleges",
      description: "Oversee college listings",
      icon: FaSchool,
      path: "/admin/colleges",
      color: "from-emerald-500 to-teal-600",
      bg: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "Admissions",
      description: "Track admission requests",
      icon: FaWpforms,
      path: "/admin/admission",
      color: "from-orange-500 to-amber-600",
      bg: "bg-orange-50 text-orange-600",
    },
  ];

  return (
    <div className="space-y-6 w-full px-4 sm:px-6 lg:px-8 pb-10">
      {/* Welcome Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 text-white shadow-2xl">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center p-6 md:p-10 gap-8">
          <div className="space-y-6 max-w-2xl">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-2">
                Welcome, {admin?.name?.split(" ")[0]}! <span className="inline-block animate-wave">👋</span>
              </h2>
              <p className="text-blue-200 text-lg font-medium">
                Admin Portal Overview
              </p>
            </div>
            
             <div className="flex flex-wrap gap-4 text-sm md:text-base">
              <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center gap-2">
                <span className="text-blue-200">Role:</span>
                <span className="font-semibold text-white uppercase">{admin?.role || "Admin"}</span>
              </div>
              <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center gap-2">
                <span className="text-blue-200">Email:</span>
                <span className="font-semibold text-white">{admin?.email}</span>
              </div>
            </div>
          </div>

          <div className="hidden md:block relative group">
             <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/30 to-indigo-500/30 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
            <img
              src={icon}
              alt="Admin Profile"
              className="relative w-48 md:w-64 lg:w-72 drop-shadow-2xl transform group-hover:-translate-y-2 transition-transform duration-500 ease-in-out invert brightness-0"
            />
          </div>
        </div>
      </section>

      {/* Cards Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            onClick={() => navigate(card.path)}
            className="group relative bg-white border border-slate-100 rounded-3xl p-6 cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1"
          >
             <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-2xl ${card.bg} transition-transform duration-300 group-hover:scale-110`}>
                <card.icon className="w-6 h-6" />
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 transform group-hover:rotate-45">
                <HiArrowRight className="w-4 h-4" />
              </div>
            </div>
            
            <h3 className="text-lg font-bold text-slate-800 mb-1 group-hover:text-indigo-700 transition-colors">
              {card.title}
            </h3>
            <p className="text-slate-500 text-xs font-medium">
              {card.description}
            </p>

             <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent group-hover:via-indigo-500 transition-all duration-500 opacity-50"></div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default DashbordAdmin;
