import { useNavigate } from "react-router-dom";
// import icon from "../../assets/dashboard/wepik-export-20240313072348V9B7.png";
import "react-circular-progressbar/dist/styles.css";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { 
    FaUserGraduate, 
    FaClipboardList, 
    FaChalkboardTeacher, 
    FaCalendarCheck, 
    FaUniversity,
    FaArrowRight,
    FaEnvelope,
    FaPhoneAlt
} from "react-icons/fa";

const Dashbord = () => {
    const navigate = useNavigate();
    const student = useSelector((state) => state?.studentAuth?.studentDetails);

    const dashboardCards = [
        {
            title: "Aptitude Test",
            description: "Assess your skills and get career recommendations.",
            buttonText: "Take Test",
            path: "/student/test",
            icon: <FaClipboardList />,
            color: "from-blue-500 to-cyan-500"
        },
        {
            title: "Expert Counselling",
            description: "Book sessions with top career counsellors.",
            buttonText: "Book Now",
            path: "/student/counsillor",
            icon: <FaChalkboardTeacher />,
            color: "from-purple-500 to-indigo-500"
        },
        {
            title: "My Bookings",
            description: "Check status of your counselling sessions.",
            buttonText: "View Status",
            path: "/student/bookings",
            icon: <FaCalendarCheck />,
            color: "from-emerald-500 to-teal-500"
        },
        {
            title: "Recommended Colleges",
            description: "Colleges tailored to your profile.",
            buttonText: "Explore Colleges",
            path: "/student/recommended",
            icon: <FaUniversity />,
            color: "from-rose-500 to-pink-500"
        },
    ];

    return (
        <div className="space-y-8 font-poppins min-h-[80vh]">
            
             {/* Header Section */}
             <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl overflow-hidden relative">
                 <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-r from-indigo-600 to-violet-600"></div>
                 
                 <div className="pt-24 px-8 pb-8 flex flex-col md:flex-row items-center md:items-end gap-8 relative z-10">
                     {/* Avatar/Icon */}
                     <div className="w-40 h-40 rounded-2xl bg-white p-2 shadow-2xl skew-y-0 md:-skew-y-2 transform transition-transform hover:skew-y-0 duration-500 border-4 border-white flex items-center justify-center text-indigo-600 text-6xl">
                          <FaUserGraduate />
                     </div>
    
                     {/* Info */}
                     <div className="flex-1 text-center md:text-left mb-2">
                          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 drop-shadow-sm leading-tight">
                              Hello, {student?.name || "Student"}! 👋
                          </h2>
                          <p className="text-slate-500 font-medium mt-2 max-w-2xl">
                               Welcome to your personal dashboard. Manage your bookings, take tests, and explore your future opportunities.
                          </p>
                          
                          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-6 text-sm text-slate-500">
                                <span className="flex items-center gap-2 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
                                    <FaEnvelope className="text-indigo-400" /> {student?.email || "N/A"}
                                </span>
                                <span className="flex items-center gap-2 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
                                    <FaPhoneAlt className="text-indigo-400" /> {student?.contact || "N/A"}
                                </span>
                          </div>
                     </div>
                 </div>
            </div>

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {dashboardCards.map((card, index) => (
                    <div 
                        key={index}
                        onClick={() => navigate(card.path)}
                        className="group bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl p-6 cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                    >
                        <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${card.color} opacity-10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-150 duration-500`}></div>
                        
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${card.color} text-white flex items-center justify-center text-2xl shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}>
                            {card.icon}
                        </div>
                        
                        <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors">
                            {card.title}
                        </h3>
                        <p className="text-slate-500 text-sm mb-6 min-h-[40px]">
                            {card.description}
                        </p>
                        
                        <div className="flex items-center text-indigo-600 font-semibold text-sm group-hover:translate-x-2 transition-transform">
                            {card.buttonText} <FaArrowRight className="ml-2" />
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Student Details / Stats Area (Optional Future Expansion) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl p-8">
                     <h3 className="text-lg font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">Academic Info</h3>
                     <div className="space-y-4">
                         <div className="flex justify-between p-3 bg-slate-50 rounded-lg">
                             <span className="text-slate-500">School</span>
                             <span className="font-semibold text-slate-800">{student?.school || "N/A"}</span>
                         </div>
                         <div className="flex justify-between p-3 bg-slate-50 rounded-lg">
                             <span className="text-slate-500">Stream</span>
                             <span className="font-semibold text-slate-800">{student?.stream || "N/A"}</span>
                         </div>
                     </div>
                </div>
            </div>

        </div>
    );
};

export default Dashbord;
