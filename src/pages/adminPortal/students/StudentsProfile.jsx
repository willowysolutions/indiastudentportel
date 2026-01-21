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
} from "react-icons/fa";

const StudentsProfile = () => {
  const student = useSelector((state) => state?.admin?.StudentProfile?.student);
  const counsellors = useSelector(
    (state) => state?.admin?.StudentProfile?.counsellors
  );

  return (
    <div className="min-h-screen p-6 font-poppins">
      <div className="space-y-8">
        
        {/* Header / Profile Card */}
        <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl overflow-hidden relative">
           <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-indigo-600 to-purple-600"></div>
           <div className="pt-16 px-8 pb-8 flex flex-col items-start relative z-10">
              <div className="w-24 h-24 rounded-full bg-white p-1 shadow-lg flex items-center justify-center text-4xl text-indigo-600 border-4 border-white">
                  <span className="font-bold">{student?.name?.charAt(0) || "U"}</span>
              </div>
              <div className="mt-4">
                 <h2 className="text-3xl font-bold text-slate-800">
                    {student?.name || "Name not available"}
                 </h2>
                 <p className="text-slate-500 font-medium">Student Profile</p>
              </div>
           </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Personal Info */}
          <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 group">
             <div className="flex items-center gap-3 mb-6">
                 <div className="p-3 bg-indigo-100 text-indigo-600 rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <FaUser size={24} />
                 </div>
                 <h3 className="text-xl font-bold text-slate-800">Personal Info</h3>
             </div>
             
             <div className="space-y-4">
                <InfoItem icon={<FaUser />} label="Name" value={student?.name} />
                <InfoItem icon={<FaEnvelope />} label="Email" value={student?.email} />
                <InfoItem icon={<FaMapMarkerAlt />} label="Address" value={student?.address} />
                <InfoItem icon={<FaPhoneAlt />} label="Contact" value={student?.contact} />
             </div>
          </div>

          {/* Card 2: Academic Info */}
          <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 group">
             <div className="flex items-center gap-3 mb-6">
                 <div className="p-3 bg-purple-100 text-purple-600 rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <FaSchool size={24} />
                 </div>
                 <h3 className="text-xl font-bold text-slate-800">Academic Info</h3>
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
        <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <span className="w-2 h-8 bg-indigo-600 rounded-full inline-block"></span>
              Counselor Bookings
            </h3>
          </div>
          
          <div className="p-6">
            {counsellors?.length > 0 ? (
              <div className="rounded-xl border border-slate-200 overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-50 text-slate-700 font-semibold uppercase text-xs tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="p-4">Counselor</th>
                      <th className="p-4">Message</th>
                      <th className="p-4">Date & Time</th>
                      <th className="p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {counsellors?.map((booking, index) => (
                      <tr key={index} className="hover:bg-slate-50 transition-colors duration-200">
                        <td className="p-4 font-medium text-slate-700">
                          {booking?.counsellor_name || "N/A"}
                        </td>
                        <td className="p-4 text-slate-600">{booking?.title || "N/A"}</td>
                        <td className="p-4 text-slate-600">
                          {booking?.start
                            ? new Date(booking?.start).toLocaleString()
                            : "N/A"}
                        </td>
                        <td className="p-4">
                             <StatusBadge status={booking?.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                 <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-2xl">🚧</div>
                 <p className="font-medium">No counselor bookings available.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ icon, label, value }) => (
    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-indigo-50 transition-colors duration-200 border border-slate-100 hover:border-indigo-200/50">
        <div className="flex items-center gap-3 text-slate-500">
            <span className="text-indigo-400">{icon}</span>
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

export default StudentsProfile;
