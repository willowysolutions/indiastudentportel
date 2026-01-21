import { useSelector } from 'react-redux'
// import icon from '../../../assets/dashboard/university.png'
import { 
    FaUniversity, 
    FaMapMarkerAlt, 
    FaEnvelope, 
    FaPhoneAlt, 
    FaBuilding,
    FaUserGraduate,
} from "react-icons/fa";

const UniversityProfile = () => {
	const data = useSelector(state => state?.admin?.UniversityProfile?.university)
	const colleges = data?.colleges
	const admissions = data?.admissions

    if (!data) return <div className="flex h-screen items-center justify-center text-slate-400">Loading...</div>

	return (
		<div className='min-h-screen p-6 font-poppins'>
            <div className="space-y-8">
                
                {/* Header Card */}
                <div className='bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl overflow-hidden relative'>
                     <div className='absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-cyan-600 to-sky-600'></div>
                     <div className='pt-20 px-8 pb-8 flex flex-col md:flex-row items-end gap-6 relative z-10'>
                          <div className='w-28 h-28 rounded-full bg-white p-1 shadow-lg flex items-center justify-center text-5xl text-cyan-600 border-4 border-white'>
                                {/* <img src={icon} alt="University" className="w-full h-full object-cover" /> */}
                                <span className="font-bold">{data?.details?.name?.charAt(0) || "U"}</span>
                          </div>
                          <div className="flex-1 mb-2">
                                <h1 className='text-3xl font-bold text-slate-800'>{data?.details?.name}</h1>
                                <p className='text-slate-500 font-medium flex items-center gap-2'>
                                    <FaMapMarkerAlt className="text-rose-500" />
                                    {data?.district}, {data?.state?.state || "State N/A"}
                                </p>
                          </div>
                     </div>
                </div>

                {/* Main Content Grid */}
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                    
                    {/* Left Column: Contact Info */}
                    <div className='lg:col-span-1 space-y-8'>
                        <div className='bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl p-6'>
                             <h3 className='text-lg font-bold text-slate-800 mb-4 flex items-center gap-2 border-b border-slate-100 pb-2'>
                                  <FaUniversity className="text-cyan-500" />
                                  Contact Info
                             </h3>
                             <div className="space-y-4">
                                  <InfoRow icon={<FaEnvelope />} label="Email" value={data?.details?.email} />
                                  <InfoRow icon={<FaPhoneAlt />} label="Contact" value={data?.details?.contact} />
                                  <InfoRow icon={<FaMapMarkerAlt />} label="Address" value={data?.details?.address || "N/A"} />
                             </div>
                        </div>

                        {/* Stats Widgets */}
                        <div className="grid grid-cols-2 gap-4">
                             <StatWidget 
                                icon={<FaBuilding />} 
                                value={colleges?.length || 0} 
                                label="Colleges" 
                                color="bg-cyan-100 text-cyan-700" 
                             />
                             <StatWidget 
                                icon={<FaUserGraduate />} 
                                value={admissions?.length || 0} 
                                label="Students" 
                                color="bg-sky-100 text-sky-700" 
                             />
                        </div>
                    </div>

                    {/* Right Column: Colleges List */}
                    <div className='lg:col-span-2'>
                        <div className='bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl overflow-hidden min-h-[500px]'>
                             <div className='p-6 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white flex justify-between items-center'>
                                  <h3 className='text-xl font-bold text-slate-800 flex items-center gap-2'>
                                       <span className="p-2 bg-cyan-100 rounded-lg text-cyan-600"><FaBuilding /></span>
                                       Affiliated Colleges
                                  </h3>
                                  <span className="bg-cyan-100 text-cyan-700 text-xs font-bold px-3 py-1 rounded-full">
                                     {colleges?.length || 0} Listed
                                  </span>
                             </div>

                             <div className='p-6'>
                                 {colleges?.length > 0 ? (
                                     <div className="rounded-xl border border-slate-200 overflow-hidden">
                                         <table className='w-full text-left border-collapse'>
                                             <thead className='bg-slate-50 text-slate-700 font-semibold uppercase text-xs tracking-wider border-b border-slate-200'>
                                                 <tr>
                                                     <th className='p-4'>ID</th>
                                                     <th className='p-4'>College Name</th>
                                                     <th className='p-4'>Location</th>
                                                     <th className='p-4'>Contact</th>
                                                 </tr>
                                             </thead>
                                             <tbody className="divide-y divide-slate-100 bg-white">
                                                 {colleges.map((college, index) => (
                                                     <tr key={index} className='hover:bg-slate-50 transition-colors duration-200'>
                                                         <td className='p-4 text-slate-500 text-sm'>
                                                             #{college.id}
                                                         </td>
                                                         <td className='p-4 font-medium text-slate-800'>
                                                             <div className="whitespace-normal break-words min-w-[150px]">
                                                                 {college.name}
                                                             </div>
                                                         </td>
                                                         <td className='p-4 text-slate-600'>{college.street}</td>
                                                         <td className='p-4 text-slate-600'>{college.contact}</td>
                                                     </tr>
                                                 ))}
                                             </tbody>
                                         </table>
                                     </div>
                                 ) : (
                                     <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                                         <FaBuilding className="text-5xl mb-4 opacity-20" />
                                         <p className="font-medium">No colleges affiliated yet.</p>
                                     </div>
                                 )}
                             </div>
                        </div>
                    </div>
                </div>
            </div>
		</div>
	)
}

const InfoRow = ({ icon, label, value }) => (
    <div className="flex items-start gap-3">
         <div className="mt-1 text-slate-400">{icon}</div>
         <div>
             <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{label}</div>
             <div className="text-slate-800 font-medium break-words">{value || "N/A"}</div>
         </div>
    </div>
);

const StatWidget = ({ icon, value, label, color }) => (
    <div className={`flex flex-col items-center justify-center p-4 rounded-xl shadow-sm border border-white/50 ${color}`}>
        <div className="text-2xl mb-1">{icon}</div>
        <div className="font-bold text-2xl">{value}</div>
        <div className="text-xs uppercase tracking-wide opacity-80">{label}</div>
    </div>
);

export default UniversityProfile
