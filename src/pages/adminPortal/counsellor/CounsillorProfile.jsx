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
  FaCalendarAlt
} from "react-icons/fa";

const CounsillorProfile = () => {
    const data = useSelector(
        (state) => state?.admin?.CounsilerProfile?.counsellor
    );

    const completedBookings = data?.bookings;

    return (
        <div className="min-h-screen font-sans text-slate-900 pb-10 px-4 sm:px-6 lg:px-8 space-y-8">
            
            {/* Header / Profile Card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-6 py-6 flex flex-col sm:flex-row items-center gap-6 bg-slate-50 border-b border-slate-100">
                     {/* Avatar */}
                    <div className="relative">
                        <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-3xl text-violet-500 font-bold border border-slate-200 shadow-sm">
                             {data?.details?.name?.charAt(0) || "C"}
                        </div>
                    </div>

                    {/* Name & Role */}
                    <div className="flex-1 text-center sm:text-left">
                        <h2 className="text-2xl font-bold text-slate-900">
                            {data?.details?.name || "Name Unavailable"}
                        </h2>
                        <p className="text-slate-500 text-sm font-medium flex items-center justify-center sm:justify-start gap-2 mt-1">
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-violet-500"></span>
                            Professional Counselor
                        </p>
                    </div>

                    {/* Stats Widgets */}
                    <div className="flex gap-3">
                        <StatWidget 
                            icon={<FaCalendarCheck />} 
                            value={data?.bookings?.length || 0} 
                            label="Sessions" 
                            color="bg-white text-violet-600 border-violet-100 shadow-sm" 
                        />
                         <StatWidget 
                            icon={<FaStar />} 
                            value={data?.average_rating || "N/A"} 
                            label="Rating" 
                            color="bg-white text-amber-600 border-amber-100 shadow-sm" 
                        />
                    </div>
                </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
                    <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-50">
                        <div className="p-2 bg-violet-50 text-violet-600 rounded-lg">
                           <FaHeadset size={16} />
                        </div>
                        <h3 className="text-base font-bold text-slate-800">Contact Details</h3>
                    </div>
                     <div className="space-y-4">
                        <InfoItem icon={<FaEnvelope />} label="Email" value={data?.details?.email} />
                        <InfoItem icon={<FaPhoneAlt />} label="Contact" value={data?.details?.contact} />
                     </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
                     <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-50">
                        <div className="p-2 bg-fuchsia-50 text-fuchsia-600 rounded-lg">
                           <FaChalkboardTeacher size={16} />
                        </div>
                        <h3 className="text-base font-bold text-slate-800">Professional Info</h3>
                    </div>
                     <div className="space-y-4">
                        <InfoItem icon={<FaHeadset />} label="Session Mode" value={data?.session_mode} />
                        <InfoItem icon={<FaLanguage />} label="Language" value={data?.language} />
                     </div>
                </div>
            </div>

            {/* Sessions Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
                    <h3 className="text-base font-bold text-slate-800">
                        Counselor Sessions
                    </h3>
                     <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-semibold text-slate-600">
                        Total: {completedBookings?.length || 0}
                    </span>
                </div>

                <div className="relative overflow-x-auto">
                    {completedBookings?.length > 0 ? (
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Student Name</th>
                                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Title</th>
                                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Start Time</th>
                                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">End Time</th>
                                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 bg-white">
                                {completedBookings.map((session) => (
                                    <tr key={session.id} className="hover:bg-slate-50 transition-colors duration-150">
                                        <td className="px-6 py-4 font-medium text-slate-900">
                                            {session.student_name || "Unknown"}
                                        </td>
                                        <td className="px-6 py-4 text-slate-600">{session.title || "No Title"}</td>
                                        <td className="px-6 py-4 text-slate-600">
                                             <div className="flex items-center gap-2">
                                                <FaCalendarAlt className="text-slate-400" />
                                                {session.start ? new Date(session.start).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' }) : "N/A"}
                                             </div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-600">
                                             <div className="flex items-center gap-2">
                                                <FaCalendarAlt className="text-slate-400" />
                                                {session.end ? new Date(session.end).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' }) : "N/A"}
                                             </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <StatusBadge status={session.status} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                         <div className="flex flex-col items-center justify-center py-16 text-slate-400 bg-white">
                            <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-3">
                                <FaCalendarCheck size={20} className="text-slate-300" />
                            </div>
                            <p className="font-medium text-sm">No sessions found.</p>
                         </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const StatWidget = ({ icon, value, label, color }) => (
    <div className={`flex flex-col items-center justify-center px-4 py-2 rounded-xl border min-w-[90px] ${color}`}>
        <div className="text-lg mb-0.5">{icon}</div>
        <div className="font-bold text-base">{value}</div>
        <div className="text-[9px] uppercase tracking-wide opacity-80 font-semibold">{label}</div>
    </div>
);

const InfoItem = ({ icon, label, value }) => (
    <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-slate-50/30 hover:bg-white hover:border-slate-200 hover:shadow-sm transition-all duration-200">
        <div className="flex items-center gap-3">
            <span className="text-slate-400 text-sm">{icon}</span>
            <span className="text-xs font-medium text-slate-500">{label}</span>
        </div>
        <span className="text-slate-900 font-semibold text-xs text-right">{value || "N/A"}</span>
    </div>
);

const StatusBadge = ({ status }) => {
     let styles = "bg-slate-100 text-slate-600 border-slate-200";
    if (!status) return <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${styles}`}>N/A</span>

    const lowerStatus = status.toLowerCase();
    
    if (lowerStatus === 'approved' || lowerStatus === 'completed') styles = "bg-emerald-50 text-emerald-700 border-emerald-200";
    else if (lowerStatus === 'pending') styles = "bg-amber-50 text-amber-700 border-amber-200";
    else if (lowerStatus === 'rejected' || lowerStatus === 'cancelled') styles = "bg-rose-50 text-rose-700 border-rose-200";

    return (
        <span className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-bold border ${styles} shadow-sm`}>
            {status}
        </span>
    );
}

export default CounsillorProfile;
