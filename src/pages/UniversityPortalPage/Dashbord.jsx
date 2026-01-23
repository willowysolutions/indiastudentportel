import { useNavigate } from "react-router-dom";
// import icon from "../../assets/dashboard/wepik-export-20240313072348V9B7.png";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getSingleCollege,
} from "../../Redux/features/University/UniversitySlice";
import { FaUniversity, FaEnvelope, FaPhoneAlt, FaEdit, FaUserGraduate } from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi";

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
        {/* Welcome Section / Header */}
        <section className="relative overflow-hidden rounded-2xl bg-stone-50 border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/5 hover:border-blue-300/50 group">
             <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none group-hover:opacity-[0.08] transition-opacity duration-500">
                 <HiOutlineSparkles size={200} className="text-blue-600 rotate-12"/>
             </div>

             <div className="relative z-10 flex flex-col md:flex-row justify-between items-center p-8 gap-8">
                  <div className="space-y-3 max-w-2xl">
                      <h2 className="text-3xl font-bold tracking-tight text-slate-900 group-hover:text-blue-700 transition-colors duration-300">
                          Welcome back, <span className="text-blue-600">{universityData?.name || "University"}</span>
                      </h2>
                      <p className="text-slate-500 text-lg">
                          Welcome to your University Portal Dashboard.
                      </p>

                      <div className="flex flex-wrap gap-3 mt-4">
                           {/* Email Badge */}
                           <div className="px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200 flex items-center gap-2 text-sm text-slate-600 group-hover:border-blue-100 group-hover:bg-blue-50/30 transition-colors duration-300">
                               <span className="font-medium text-slate-500">Email:</span>
                               <span className="font-semibold text-slate-800">{universityData?.email}</span>
                           </div>
                           
                           {/* Phone Badge */}
                           <div className="px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200 flex items-center gap-2 text-sm text-slate-600 group-hover:border-blue-100 group-hover:bg-blue-50/30 transition-colors duration-300">
                               <span className="font-medium text-slate-500">Phone:</span>
                               <span className="font-semibold text-slate-800">{universityData?.contact || "N/A"}</span>
                           </div>

                           {/* Edit Button */}
                           <button 
                               onClick={handleEditCollege}
                               className="px-4 py-1.5 rounded-full bg-white border border-slate-200 flex items-center gap-2 text-sm text-slate-600 hover:text-indigo-600 hover:border-indigo-200 hover:shadow-sm transition-all duration-300 cursor-pointer"
                           >
                               <FaEdit /> 
                               <span className="font-semibold">Edit Profile</span>
                           </button>
                      </div>
                  </div>

                  {/* Right Icon */}
                  <div className="hidden md:block">
                       <div className="w-24 h-24 rounded-full bg-blue-50 p-1 border border-blue-100 shadow-sm group-hover:scale-105 transition-transform duration-300 flex items-center justify-center">
                            <div className="w-full h-full rounded-full border-2 border-white bg-white flex items-center justify-center shadow-sm text-indigo-500 text-4xl">
                                <FaUniversity />
                            </div>
                       </div>
                  </div>
             </div>
        </section>

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
