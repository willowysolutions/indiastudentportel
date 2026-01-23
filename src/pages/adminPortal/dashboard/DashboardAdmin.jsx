import { useNavigate } from "react-router-dom";
import icon from "../../../assets/dashboard/ADMIN.png";
import { useSelector } from "react-redux";
import { FaUserGraduate, FaChalkboardTeacher, FaSchool, FaWpforms } from "react-icons/fa";
import { HiArrowRight, HiOutlineSparkles } from "react-icons/hi";

const DashbordAdmin = () => {
  const admin = useSelector((state) => state?.adminauth?.admin);
  const navigate = useNavigate();

  const cards = [
    {
      title: "Students",
      description: "Manage student profiles",
      icon: FaUserGraduate,
      path: "/admin/students",
      color: "text-blue-600",
      bg: "bg-blue-50 border-blue-100",
      hover: "hover:border-blue-200 hover:shadow-blue-500/10",
    },
    {
      title: "Counsellor",
      description: "Manage counselor accounts",
      icon: FaChalkboardTeacher,
      path: "/admin/councillors",
      color: "text-purple-600",
      bg: "bg-purple-50 border-purple-100",
      hover: "hover:border-purple-200 hover:shadow-purple-500/10",
    },
    {
      title: "Colleges",
      description: "Oversee college listings",
      icon: FaSchool,
      path: "/admin/colleges",
      color: "text-emerald-600",
      bg: "bg-emerald-50 border-emerald-100",
      hover: "hover:border-emerald-200 hover:shadow-emerald-500/10",
    },
    {
      title: "Admissions",
      description: "Track admission requests",
      icon: FaWpforms,
      path: "/admin/admission",
      color: "text-amber-600",
      bg: "bg-amber-50 border-amber-100",
      hover: "hover:border-amber-200 hover:shadow-amber-500/10",
    },
  ];

  return (
    <div className="space-y-8 w-full px-6 lg:px-10 pb-12 font-sans text-slate-900">
      {/* Welcome Section */}
      <section className="relative overflow-hidden rounded-2xl bg-stone-50 border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/5 hover:border-blue-300/50 group">
        <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none group-hover:opacity-[0.08] transition-opacity duration-500">
            <HiOutlineSparkles size={200} className="text-blue-600 rotate-12"/>
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center p-8 gap-8">
          <div className="space-y-3 max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 group-hover:text-blue-700 transition-colors duration-300">
              Welcome back, <span className="text-blue-600">{admin?.name?.split(" ")[0]}</span>
            </h2>
            <p className="text-slate-500 text-lg">
              Here's what's happening in your admin portal today.
            </p>
            
             <div className="flex flex-wrap gap-3 mt-4">
              <div className="px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200 flex items-center gap-2 text-sm text-slate-600 group-hover:border-blue-100 group-hover:bg-blue-50/30 transition-colors duration-300">
                <span className="font-medium text-slate-500">Role:</span>
                <span className="font-bold text-slate-800 uppercase tracking-wide text-xs">{admin?.role || "ADMIN"}</span>
              </div>
              <div className="px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200 flex items-center gap-2 text-sm text-slate-600 group-hover:border-blue-100 group-hover:bg-blue-50/30 transition-colors duration-300">
                <span className="font-medium text-slate-500">Email:</span>
                <span className="font-semibold text-slate-800">{admin?.email}</span>
              </div>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="w-24 h-24 rounded-full bg-blue-50 p-1 border border-blue-100 shadow-sm group-hover:scale-105 transition-transform duration-300">
                 <img
                src={icon}
                alt="Profile"
                className="w-full h-full object-cover rounded-full border-2 border-white shadow-sm"
                />
            </div>
          </div>
        </div>
      </section>

      {/* Cards Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            onClick={() => navigate(card.path)}
            className={`group relative p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${card.bg} ${card.hover} hover:-translate-y-1 shadow-sm`}
          >
             <div className="flex items-center justify-between mb-4">
               <div className={`p-3 rounded-xl bg-white shadow-sm ${card.color}`}>
                 <card.icon size={24} />
               </div>
               <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <HiArrowRight className={`w-5 h-5 ${card.color}`} />
               </div>
             </div>
            
            <h3 className="text-lg font-bold text-slate-800 mb-1">
              {card.title}
            </h3>
            <p className="text-slate-500 text-sm font-medium leading-relaxed">
              {card.description}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default DashbordAdmin;
