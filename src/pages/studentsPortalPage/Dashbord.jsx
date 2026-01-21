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
             <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl shadow-xl overflow-hidden relative text-white">
                 <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
                 <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none"></div>
                 
                 <div className="p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 relative z-10">
                     {/* Avatar/Icon */}
                     <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-white/10 backdrop-blur-sm p-4 shadow-lg border border-white/20 flex items-center justify-center text-white text-6xl shadow-indigo-900/20">
                          <FaUserGraduate />
                     </div>
    
                     {/* Info */}
                     <div className="flex-1 text-center md:text-left">
                          <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-sm leading-tight mb-2">
                              Hello, {student?.name || "Student"}!
                          </h2>
                          <p className="text-blue-100 font-medium text-lg max-w-2xl mb-6">
                               Welcome to your personal dashboard. Manage your bookings, take tests, and explore your future opportunities.
                          </p>
                          
                          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm font-medium">
                                <span className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full border border-white/10 transition-colors backdrop-blur-sm">
                                    <FaEnvelope className="text-blue-200" /> {student?.email || "N/A"}
                                </span>
                                <span className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full border border-white/10 transition-colors backdrop-blur-sm">
                                    <FaPhoneAlt className="text-blue-200" /> {student?.contact || "N/A"}
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
