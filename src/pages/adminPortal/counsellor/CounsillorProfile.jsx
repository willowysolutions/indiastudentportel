import { useSelector } from "react-redux";
// import icon from "../../../assets/dashboard/councillor.png"; // Unused
import {
  FaChalkboardTeacher,
  FaEnvelope,
  FaPhoneAlt,
  FaLanguage,
  FaHeadset,
  FaStar,
  FaCalendarCheck,
} from "react-icons/fa";

const CounsillorProfile = () => {
    const data = useSelector(
        (state) => state?.admin?.CounsilerProfile?.counsellor
    );

    const completedBookings = data?.bookings;

    return (
        <div className="min-h-screen p-6 font-poppins">
            <div className="space-y-8">
                
                {/* Header / Profile Card */}
                <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-violet-600 to-fuchsia-600"></div>
                    <div className="pt-20 px-8 pb-8 flex flex-col md:flex-row items-end gap-6 relative z-10">
                         {/* Avatar */}
                        <div className="w-32 h-32 rounded-full bg-white p-1 shadow-lg flex items-center justify-center text-5xl text-violet-600 border-4 border-white">
                             {/* <img src={icon} alt="Counselor" className="w-full h-full rounded-full object-cover" /> */}
                             {/* Fallback avatar if no image */}
                             <span className="font-bold">{data?.details?.name?.charAt(0) || "C"}</span>
                        </div>

                        {/* Name & Role */}
                        <div className="flex-1 mb-2">
                            <h2 className="text-3xl font-bold text-slate-800">
                                {data?.details?.name || "Name Unavailable"}
                            </h2>
                            <p className="text-slate-500 font-medium flex items-center gap-2">
                                <FaChalkboardTeacher className="text-violet-500" />
                                Professional Counselor
                            </p>
                        </div>

                        {/* Stats Widgets */}
                        <div className="flex gap-4 mb-2">
                            <StatWidget 
                                icon={<FaCalendarCheck />} 
                                value={data?.bookings?.length || 0} 
                                label="Sessions" 
                                color="bg-violet-100 text-violet-600" 
                            />
                             <StatWidget 
                                icon={<FaStar />} 
                                value={data?.average_rating || "N/A"} 
                                label="Rating" 
                                color="bg-amber-100 text-amber-600" 
                            />
                        </div>
                    </div>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300">
                        <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                            <span className="p-2 bg-violet-100 rounded-lg text-violet-600"><FaHeadset /></span>
                            Contact Details
                        </h3>
                         <div className="space-y-4">
                            <InfoItem icon={<FaEnvelope />} label="Email" value={data?.details?.email} />
                            <InfoItem icon={<FaPhoneAlt />} label="Contact" value={data?.details?.contact} />
                         </div>
                    </div>

                    <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300">
                         <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                            <span className="p-2 bg-fuchsia-100 rounded-lg text-fuchsia-600"><FaChalkboardTeacher /></span>
                            Professional Info
                        </h3>
                         <div className="space-y-4">
                            <InfoItem icon={<FaHeadset />} label="Session Mode" value={data?.session_mode} />
                            <InfoItem icon={<FaLanguage />} label="Language" value={data?.language} />
                         </div>
                    </div>
                </div>

                {/* Sessions Table */}
                <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl overflow-hidden">
                    <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
                        <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                            <span className="w-2 h-8 bg-violet-600 rounded-full inline-block"></span>
                            Counselor Sessions
                        </h3>
                    </div>

                    <div className="p-6">
                        {completedBookings?.length > 0 ? (
                            <div className="rounded-xl border border-slate-200 overflow-hidden overflow-x-auto">
                                <table className="w-full text-left border-collapse whitespace-nowrap">
                                    <thead className="bg-slate-50 text-slate-700 font-semibold uppercase text-xs tracking-wider border-b border-slate-200">
                                        <tr>
                                            <th className="p-4">Student Name</th>
                                            <th className="p-4">Title</th>
                                            <th className="p-4">Start Time</th>
                                            <th className="p-4">End Time</th>
                                            <th className="p-4">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 bg-white">
                                        {completedBookings.map((session) => (
                                            <tr key={session.id} className="hover:bg-slate-50 transition-colors duration-200">
                                                <td className="p-4 font-medium text-slate-700">
                                                    {session.student_name || "Unknown"}
                                                </td>
                                                <td className="p-4 text-slate-600">{session.title || "No Title"}</td>
                                                <td className="p-4 text-slate-600">
                                                     {session.start ? new Date(session.start).toLocaleString() : "N/A"}
                                                </td>
                                                <td className="p-4 text-slate-600">
                                                     {session.end ? new Date(session.end).toLocaleString() : "N/A"}
                                                </td>
                                                <td className="p-4">
                                                    <StatusBadge status={session.status} />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                             <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-2xl">📭</div>
                                <p className="font-medium">No sessions found.</p>
                             </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatWidget = ({ icon, value, label, color }) => (
    <div className={`flex flex-col items-center justify-center p-3 rounded-xl min-w-[100px] ${color}`}>
        <div className="text-2xl mb-1">{icon}</div>
        <div className="font-bold text-xl">{value}</div>
        <div className="text-xs uppercase tracking-wide opacity-80">{label}</div>
    </div>
);

const InfoItem = ({ icon, label, value }) => (
    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-violet-50 transition-colors duration-200 border border-slate-100 hover:border-violet-200/50">
        <div className="flex items-center gap-3 text-slate-500">
            <span className="text-violet-400">{icon}</span>
            <span className="text-sm font-medium">{label}</span>
        </div>
        <span className="text-slate-800 font-semibold text-right">{value || "N/A"}</span>
    </div>
);

const StatusBadge = ({ status }) => {
     let colorClass = "bg-slate-100 text-slate-600";
    if (!status) return <span className={`px-3 py-1 rounded-full text-xs font-bold ${colorClass}`}>N/A</span>

    const lowerStatus = status.toLowerCase();
    
    if (lowerStatus === 'approved' || lowerStatus === 'completed') colorClass = "bg-emerald-100 text-emerald-700";
    else if (lowerStatus === 'pending') colorClass = "bg-amber-100 text-amber-700";
    else if (lowerStatus === 'rejected' || lowerStatus === 'cancelled') colorClass = "bg-rose-100 text-rose-700";

    return (
        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${colorClass}`}>
            {status}
        </span>
    );
}

export default CounsillorProfile;
