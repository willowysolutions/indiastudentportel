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
import { HiOutlineSparkles } from "react-icons/hi";

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
             <section className="relative overflow-hidden rounded-2xl bg-stone-50 border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/5 hover:border-blue-300/50 group">
                 <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none group-hover:opacity-[0.08] transition-opacity duration-500">
                     <HiOutlineSparkles size={200} className="text-blue-600 rotate-12"/>
                 </div>
                 
                 <div className="relative z-10 flex flex-col md:flex-row justify-between items-center p-8 gap-8">
                      <div className="space-y-3 max-w-2xl">
                          <h2 className="text-3xl font-bold tracking-tight text-slate-900 group-hover:text-blue-700 transition-colors duration-300">
                              Hello, <span className="text-blue-600">{student?.name || "Student"}</span>!
                          </h2>
                          <p className="text-slate-500 text-lg">
                              Welcome to your personal dashboard. Manage your bookings, take tests, and explore your future opportunities.
                          </p>
                          
                          <div className="flex flex-wrap gap-3 mt-4">
                                <div className="px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200 flex items-center gap-2 text-sm text-slate-600 group-hover:border-blue-100 group-hover:bg-blue-50/30 transition-colors duration-300">
                                    <span className="font-medium text-slate-500">Email:</span>
                                    <span className="font-semibold text-slate-800">{student?.email || "N/A"}</span>
                                </div>
                                <div className="px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200 flex items-center gap-2 text-sm text-slate-600 group-hover:border-blue-100 group-hover:bg-blue-50/30 transition-colors duration-300">
                                    <span className="font-medium text-slate-500">Phone:</span>
                                    <span className="font-semibold text-slate-800">{student?.contact || "N/A"}</span>
                                </div>
                          </div>
                      </div>

                      {/* Right Icon */}
                      <div className="hidden md:block">
                           <div className="w-24 h-24 rounded-full bg-blue-50 p-1 border border-blue-100 shadow-sm group-hover:scale-105 transition-transform duration-300 flex items-center justify-center">
                                <div className="w-full h-full rounded-full border-2 border-white bg-white flex items-center justify-center shadow-sm text-indigo-500 text-4xl">
                                    <FaUserGraduate />
                                </div>
                           </div>
                      </div>
                 </div>
             </section>

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
