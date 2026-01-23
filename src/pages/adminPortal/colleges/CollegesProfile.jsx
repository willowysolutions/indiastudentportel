import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
        <div className="flex h-screen items-center justify-center bg-white">
           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900"></div>
        </div>
    );
  }

  if (!data) {
    return (
      <div className="flex flex-col h-screen items-center justify-center bg-white text-slate-400">
         <div className="text-6xl mb-4 opacity-20">🏛️</div>
         <p className="text-lg font-medium text-slate-500">No details available.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans text-slate-900 pb-10 px-4 sm:px-6 lg:px-8 space-y-8">
       <div className="space-y-8">
       
        {/* Header / College Card */}
             <div className="px-6 py-6 flex flex-col md:flex-row items-center gap-6 bg-slate-50 border-b border-slate-100">
                 {/* Image */}
                 <div className="w-24 h-24 rounded-xl bg-white p-2 shadow-sm border border-slate-200 flex-shrink-0">
                      <img 
                          src={data?.image || "https://placehold.co/400?text=No+Image"} 
                          alt={data?.name} 
                          className="w-full h-full object-contain rounded-lg"
                      />
                 </div>

                 {/* Info */}
                 <div className="flex-1 text-center md:text-left">
                      <h2 className="text-2xl font-bold text-slate-900 leading-tight">
                          {data?.name}
                      </h2>
                      <p className="text-slate-500 font-medium flex items-center justify-center md:justify-start gap-2 mt-1.5 text-xs">
                           <FaMapMarkerAlt className="text-rose-500" />
                           {data?.location || "Location N/A"}, {data?.state?.state}
                      </p>
                 </div>

                 {/* Badges/Stats & Action */}
                 <div className="flex flex-col items-end gap-3">
                     <div className="flex gap-3">
                        <Badge icon={<FaAward />} label="NAAC" value={data?.naac_grade} color="bg-white text-emerald-700 border-emerald-100 shadow-sm" />
                        <Badge icon={<FaStar />} label="NIRF" value={data?.nirf_ranking} color="bg-white text-amber-700 border-amber-100 shadow-sm" />
                     </div>
                     
                    {data?.created_by === "0" && (
                        <button 
                            onClick={handleEditCollege}
                            className="flex items-center gap-2 bg-white border border-slate-200 text-slate-600 px-3 py-1.5 rounded-lg hover:bg-white hover:text-indigo-600 transition-all font-medium text-xs shadow-sm ml-auto"
                        >
                            <FaEdit /> Edit
                        </button>
                    )}
                 </div>
             </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
             {/* Left Column: Contact & Basic Info */}
             <div className="lg:col-span-1 space-y-6">
                 <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
                      <h3 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2 border-b border-slate-50 pb-3">
                           <FaUniversity className="text-indigo-600" />
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
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden min-h-[500px]">
                    <div className="p-5 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
                         <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                              <span className="p-1.5 bg-indigo-50 rounded-lg text-indigo-600"><FaBookOpen size={14}/></span>
                              Courses Offered
                         </h3>
                         <span className="bg-white border border-slate-200 text-slate-600 text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                            {data?.courses?.length || 0} Courses
                         </span>
                    </div>

                    <div className="p-5">
                        {data?.courses?.length > 0 ? (
                           <div className="grid gap-3">
                               {data.courses.map((course, index) => (
                                   <div key={index} className="bg-white border border-slate-100 rounded-xl p-4 hover:border-indigo-200 hover:shadow-sm transition-all duration-200 flex flex-col md:flex-row justify-between gap-4 group">
                                         <div className="space-y-3 flex-1">
                                              <h4 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                                                 {course?.title || "Course Title N/A"}
                                              </h4>
                                              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600">
                                                   <span className="flex items-center gap-1.5"><span className="text-slate-400 font-medium">Duration:</span> {course?.course_duration}</span>
                                                   <span className="flex items-center gap-1.5"><span className="text-slate-400 font-medium">Fee:</span> {course?.course_fee}</span>
                                              </div>
                                              <div className="text-xs text-slate-400 pt-2 border-t border-slate-50 mt-2">
                                                  Program by: <span className="font-medium text-slate-500">{course?.program_offered_by}</span>
                                              </div>
                                         </div>

                                         <div className="flex items-start pt-1">
                                              {data?.created_by === "0" && (
                                                <button 
                                                    onClick={() => handleEditCourse(course)}
                                                    className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 rounded-lg transition-all text-xs font-semibold flex items-center gap-1.5"
                                                >
                                                    <FaEdit /> Edit
                                                </button>
                                              )}
                                         </div>
                                   </div>
                               ))}
                           </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-16 text-slate-400">
                                <div className="p-4 bg-slate-50 rounded-full mb-3">
                                    <FaBookOpen className="text-2xl text-slate-300" />
                                </div>
                                <p className="font-medium text-sm">No courses listed yet.</p>
                            </div>
                        )}
                    </div>
                </div>
             </div>
        </div>

       </div>
  );
};

const Badge = ({ icon, label, value, color }) => (
    <div className={`flex flex-col items-center px-4 py-2 rounded-xl border min-w-[80px] ${color}`}>
         <div className="text-lg mb-0.5 opacity-90">{icon}</div>
         <div className="font-bold text-sm leading-none">{value || "N/A"}</div>
         <div className="text-[9px] uppercase font-bold opacity-70 mt-1">{label}</div>
    </div>
);

const InfoRow = ({ icon, label, value }) => (
    <div className="flex items-start gap-3.5">
         <div className="mt-0.5 text-slate-400">{icon}</div>
         <div>
             <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">{label}</div>
             <div className="text-slate-900 font-medium text-sm break-words leading-relaxed">{value || "N/A"}</div>
         </div>
    </div>
);

export default CollegeProfile;
