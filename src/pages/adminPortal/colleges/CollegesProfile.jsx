import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// Removed @material-tailwind/react to use custom Tailwind styles
import { 
    FaUniversity, 
    FaMapMarkerAlt, 
    FaEnvelope, 
    FaPhoneAlt, 
    FaGlobe, 
    FaStar, 
    FaAward, 
    FaCalendarAlt,
    FaEdit,
    FaBookOpen
} from "react-icons/fa";

const CollegeProfile = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const data = useSelector((state) => state?.admin?.CollegeProfile?.college);

  const handleEditCollege = () => {
    navigate(`/admin/colleges/editCollege/${data.id}`, {
      state: { college: data },
    });
  };
  
  const handleEditCourse = (course) => {
    navigate(`/admin/colleges/editCourse/${course.id}`, {
      state: { course, college: data },
    });
  };

  useEffect(() => {
    if (data) {
      setIsLoading(false);
    } else {
      console.error("No data available for the selected college.");
      setIsLoading(false);
    }
  }, [data]);

  if (isLoading) {
    return (
        <div className="flex h-screen items-center justify-center bg-slate-50">
           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
    );
  }

  if (!data) {
    return (
      <div className="flex flex-col h-screen items-center justify-center bg-slate-50 text-slate-400">
         <div className="text-6xl mb-4">🏛️</div>
         <p className="text-lg font-medium">No details available for the selected college.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 font-poppins">
       <div className="space-y-8">
       
        {/* Header / College Card */}
        <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl overflow-hidden relative">
             <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-r from-blue-700 to-indigo-600"></div>
             
             {/* Action Button */}
             <div className="absolute top-6 right-6 z-20">
                {data?.created_by === "0" && (
                    <button 
                        onClick={handleEditCollege}
                        className="flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-all shadow-lg hover:shadow-xl font-medium"
                    >
                        <FaEdit /> Edit College
                    </button>
                )}
             </div>

             <div className="pt-24 px-8 pb-8 flex flex-col md:flex-row items-center md:items-end gap-8 relative z-10">
                 {/* Image */}
                 <div className="w-40 h-40 rounded-xl bg-white p-2 shadow-2xl skew-y-0 md:-skew-y-2 transform transition-transform hover:skew-y-0 duration-500 border-4 border-white">
                      <img 
                          src={data?.image || "https://placehold.co/400?text=No+Image"} 
                          alt={data?.name} 
                          className="w-full h-full object-contain rounded-lg bg-white"
                      />
                 </div>

                 {/* Info */}
                 <div className="flex-1 text-center md:text-left mb-2">
                      <h2 className="text-3xl md:text-4xl font-bold text-slate-800 drop-shadow-sm leading-tight">
                          {data?.name}
                      </h2>
                      <p className="text-slate-500 font-medium flex items-center justify-center md:justify-start gap-2 mt-2">
                           <FaMapMarkerAlt className="text-red-500" />
                           {data?.location || "Location N/A"}, {data?.state?.state}
                      </p>
                 </div>

                 {/* Badges/Stats */}
                 <div className="flex gap-4">
                     <Badge icon={<FaAward />} label="NAAC" value={data?.naac_grade} color="bg-emerald-100 text-emerald-700" />
                     <Badge icon={<FaStar />} label="NIRF" value={data?.nirf_ranking} color="bg-amber-100 text-amber-700" />
                 </div>
             </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
             {/* Left Column: Contact & Basic Info */}
             <div className="lg:col-span-1 space-y-8">
                 <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl p-6">
                      <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2 border-b border-slate-100 pb-2">
                           <FaUniversity className="text-indigo-500" />
                           Quick Details
                      </h3>
                      <div className="space-y-4">
                           <InfoRow icon={<FaCalendarAlt />} label="Established" value={data?.established_year} />
                           <InfoRow icon={<FaEnvelope />} label="Email" value={data?.email} />
                           <InfoRow icon={<FaPhoneAlt />} label="Contact" value={data?.contact} />
                           <InfoRow icon={<FaGlobe />} label="Address" value={data?.address} />
                      </div>
                 </div>
             </div>

             {/* Right Column: Courses */}
             <div className="lg:col-span-2">
                <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl overflow-hidden min-h-[500px]">
                    <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white flex justify-between items-center">
                         <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                              <span className="p-2 bg-indigo-100 rounded-lg text-indigo-600"><FaBookOpen /></span>
                              Courses Offered
                         </h3>
                         <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full">
                            {data?.courses?.length || 0} Courses
                         </span>
                    </div>

                    <div className="p-6">
                        {data?.courses?.length > 0 ? (
                           <div className="grid gap-6">
                               {data.courses.map((course, index) => (
                                   <div key={index} className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg hover:border-indigo-200 transition-all duration-300 flex flex-col md:flex-row justify-between gap-4 group">
                                         <div className="space-y-2">
                                              <h4 className="text-lg font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                                                 {course?.title || "Course Title N/A"}
                                              </h4>
                                              <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                                                   <span className="flex items-center gap-1"><span className="font-semibold text-slate-700">Duration:</span> {course?.course_duration}</span>
                                                   <span className="flex items-center gap-1"><span className="font-semibold text-slate-700">Fee:</span> {course?.course_fee}</span>
                                                   <span className="flex items-center gap-1"><span className="font-semibold text-slate-700">Eligibility:</span> {course?.eligibility}</span>
                                              </div>
                                              <div className="text-xs text-slate-400 mt-2">
                                                  Program by: {course?.program_offered_by}
                                              </div>
                                         </div>

                                         <div className="flex items-center">
                                              {data?.created_by === "0" && (
                                                <button 
                                                    onClick={() => handleEditCourse(course)}
                                                    className="px-4 py-2 bg-slate-100 hover:bg-indigo-600 hover:text-white text-slate-600 rounded-lg transition-all text-sm font-medium flex items-center gap-2"
                                                >
                                                    <FaEdit /> Edit
                                                </button>
                                              )}
                                         </div>
                                   </div>
                               ))}
                           </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                                <FaBookOpen className="text-5xl mb-4 opacity-20" />
                                <p className="font-medium">No courses listed yet.</p>
                            </div>
                        )}
                    </div>
                </div>
             </div>
        </div>

       </div>
    </div>
  );
};

const Badge = ({ icon, label, value, color }) => (
    <div className={`flex flex-col items-center px-4 py-2 rounded-xl border border-white/50 shadow-sm ${color}`}>
         <div className="text-lg mb-1">{icon}</div>
         <div className="font-bold text-sm leading-none">{value || "N/A"}</div>
         <div className="text-[10px] uppercase font-bold opacity-70 mt-1">{label}</div>
    </div>
);

const InfoRow = ({ icon, label, value }) => (
    <div className="flex items-start gap-3">
         <div className="mt-1 text-slate-400">{icon}</div>
         <div>
             <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{label}</div>
             <div className="text-slate-800 font-medium break-words">{value || "N/A"}</div>
         </div>
    </div>
);

export default CollegeProfile;
