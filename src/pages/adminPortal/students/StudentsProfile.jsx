import { useSelector } from "react-redux";
// import icon from "../../../assets/dashboard/wepik-export-20240313072348V9B7.png"; // Unused icon
import {
  FaUser,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaVenusMars,
  FaSchool,
  FaBook,
  FaLayerGroup,
  FaCalendarAlt,
} from "react-icons/fa";

const StudentsProfile = () => {
  const student = useSelector((state) => state?.admin?.StudentProfile?.student);
  const counsellors = useSelector(
    (state) => state?.admin?.StudentProfile?.counsellors
  );

  return (
    <div className="min-h-screen font-sans text-slate-900 pb-10 px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Header / Profile Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
         <div className="h-32 bg-gradient-to-r from-slate-900 to-slate-800 relative">
             <div className="absolute inset-0 bg-grid-white/5 bg-[length:20px_20px]"></div>
         </div>
         <div className="px-8 pb-8 flex flex-col sm:flex-row items-end -mt-12 gap-6">
            <div className="relative p-1 bg-white rounded-full shadow-md">
                <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center text-4xl text-slate-400 font-bold border-4 border-white">
                    {student?.name?.charAt(0) || "U"}
                </div>
            </div>
            <div className="flex-1 pb-2">
                 <h2 className="text-3xl font-bold text-slate-900">
                    {student?.name || "Name not available"}
                 </h2>
                 <p className="text-slate-500 font-medium flex items-center gap-2">
                     <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
                     Student Profile
                 </p>
            </div>
         </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Personal Info */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-lg">
                   <FaUser size={20} />
                </div>
                <h3 className="text-lg font-bold text-slate-800">Personal Info</h3>
            </div>
            
            <div className="space-y-4">
               <InfoItem icon={<FaUser />} label="Name" value={student?.name} />
               <InfoItem icon={<FaEnvelope />} label="Email" value={student?.email} />
               <InfoItem icon={<FaMapMarkerAlt />} label="Address" value={student?.address} />
               <InfoItem icon={<FaPhoneAlt />} label="Contact" value={student?.contact} />
            </div>
        </div>

        {/* Card 2: Academic Info */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                <div className="p-2.5 bg-purple-50 text-purple-600 rounded-lg">
                   <FaSchool size={20} />
                </div>
                <h3 className="text-lg font-bold text-slate-800">Academic Info</h3>
            </div>

            <div className="space-y-4">
                <InfoItem icon={<FaVenusMars />} label="Gender" value={student?.gender} />
                <InfoItem icon={<FaSchool />} label="School" value={student?.school} />
                <InfoItem icon={<FaLayerGroup />} label="Class" value={student?.class_name} />
                <InfoItem icon={<FaBook />} label="Stream" value={student?.stream} />
            </div>
        </div>
      </div>

      {/* Counselor Bookings Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-800">
            Counselor Bookings
          </h3>
          <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-semibold text-slate-600">
              Total: {counsellors?.length || 0}
          </span>
        </div>
        
        <div className="relative overflow-x-auto">
          {counsellors?.length > 0 ? (
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Counselor</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Message</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Date & Time</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {counsellors?.map((booking, index) => (
                  <tr key={index} className="hover:bg-slate-50 transition-colors duration-150">
                    <td className="px-6 py-4 font-medium text-slate-900">
                      {booking?.counsellor_name || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-slate-600 max-w-xs truncate" title={booking?.title}>
                        {booking?.title || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                        <div className="flex items-center gap-2">
                             <FaCalendarAlt className="text-slate-400" />
                             {booking?.start
                                ? new Date(booking?.start).toLocaleString(undefined, {
                                    dateStyle: 'medium',
                                    timeStyle: 'short'
                                })
                                : "N/A"}
                        </div>
                    </td>
                    <td className="px-6 py-4">
                         <StatusBadge status={booking?.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-slate-400 bg-white">
               <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-3">
                    <FaCalendarAlt size={20} className="text-slate-300" />
               </div>
               <p className="font-medium text-sm">No bookings found for this student.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ icon, label, value }) => (
    <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-slate-200 hover:shadow-sm transition-all duration-200">
        <div className="flex items-center gap-3">
            <span className="text-slate-400">{icon}</span>
            <span className="text-sm font-medium text-slate-500">{label}</span>
        </div>
        <span className="text-slate-900 font-semibold text-sm text-right">{value || "N/A"}</span>
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

export default StudentsProfile;
