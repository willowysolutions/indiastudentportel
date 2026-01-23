import { useNavigate } from "react-router-dom";
// import icon from "../../assets/dashboard/wepik-export-20240313072348V9B7.png";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getSingleCollege,
} from "../../Redux/features/University/UniversitySlice";
import { FaUniversity, FaEnvelope, FaPhoneAlt, FaEdit, FaUserGraduate } from "react-icons/fa";

const Dashbord = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const universityData = useSelector(
    (state) => state?.universityAuth?.university
  );
  const data = useSelector((state) => state?.admin?.CollegeProfile?.college);
  // console.log(data, "datadatadatadatadata");
  // console.log(universityData, "universityData");

  const handleEditCollege = () => {
    navigate(`/university/editCollege/${data.id}`, {
      state: { college: data },
    });
  };

  useEffect(() => {
    const fetchCollegeData = async () => {
      try {
        if (universityData?.id) {
          await dispatch(getSingleCollege(universityData.id)).unwrap();
        } 
      } catch (error) {
        console.error("Error fetching college data:", error);
      }
    };

    fetchCollegeData();
  }, [dispatch, universityData?.id]);

  return (
    <div className="space-y-8 font-poppins min-h-[80vh]">
        
        {/* Welcome Section / Header */}
        {/* Welcome Section / Header */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden relative group">
             <div className="bg-slate-50 px-8 py-8 flex flex-col md:flex-row items-center gap-8 border-b border-slate-100">
                 {/* Icon/Image */}
                 <div className="w-24 h-24 rounded-full bg-white p-4 shadow-sm border border-slate-200 flex items-center justify-center text-indigo-600 text-5xl">
                      <FaUniversity />
                 </div>

                 {/* Info */}
                 <div className="flex-1 text-center md:text-left">
                      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight mb-2">
                          {universityData?.name || "University Name"}
                      </h2>
                      <p className="text-slate-500 font-medium text-base flex items-center justify-center md:justify-start gap-2">
                           Welcome to your University Portal Dashboard
                      </p>
                 </div>
                 
                   {/* Action Button */}
                 <div className="">
                    <button 
                        onClick={handleEditCollege}
                        className="flex items-center gap-2 bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-lg hover:bg-slate-50 hover:text-indigo-600 transition-all font-medium text-sm shadow-sm"
                    >
                        <FaEdit /> Edit Profile
                    </button>
                 </div>
             </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             {/* Confact Info */}
             <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                  <h3 className="text-base font-bold text-slate-800 mb-6 flex items-center gap-2 border-b border-slate-50 pb-3">
                      <FaUniversity className="text-indigo-600" />
                      Contact Details
                  </h3>
                  <div className="space-y-4">
                       <InfoItem icon={<FaEnvelope />} label="Email Address" value={universityData?.email} />
                       <InfoItem icon={<FaPhoneAlt />} label="Phone Number" value={universityData?.contact} />
                  </div>
             </div>

             {/* Quick Actions / Status (Placeholder for now) */}
             <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 relative overflow-hidden group">
                  
                  <h3 className="text-base font-bold text-slate-800 mb-2 relative z-10 border-b border-slate-50 pb-3">University Status</h3>
                  <p className="text-slate-500 text-sm mb-6 relative z-10">Manage your courses, colleges, and student admissions efficiently.</p>
                  
                  <div className="grid grid-cols-2 gap-4 relative z-10">
                      <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100">
                          <div className="text-2xl font-bold text-indigo-600">Active</div>
                          <div className="text-slate-500 text-xs font-semibold uppercase mt-1">Account Status</div>
                      </div>
                      <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                           <FaUserGraduate className="text-2xl mb-1 text-emerald-600" />
                           <div className="text-slate-500 text-xs font-semibold uppercase mt-1">Student Access</div>
                      </div>
                  </div>
             </div>
        </div>

    </div>
  );
};

const InfoItem = ({ icon, label, value }) => (
    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100 hover:border-slate-200 transition-colors">
         <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-indigo-500 text-sm shadow-sm shrink-0 border border-slate-100">
             {icon}
         </div>
         <div className="overflow-hidden">
             <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide truncate">{label}</div>
             <div className="text-slate-800 font-semibold text-sm truncate">{value || "N/A"}</div>
         </div>
    </div>
);

export default Dashbord;
