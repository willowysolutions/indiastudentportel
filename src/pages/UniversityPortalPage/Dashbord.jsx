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
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl shadow-xl overflow-hidden relative text-white">
             <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
             <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none"></div>
             
             {/* Action Button */}
             <div className="absolute top-6 right-6 z-20">
                <button 
                    onClick={handleEditCollege}
                    className="flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 text-white px-5 py-2.5 rounded-xl hover:bg-white/30 transition-all shadow-lg hover:shadow-xl font-medium"
                >
                    <FaEdit /> Edit Profile
                </button>
             </div>

             <div className="p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 relative z-10">
                 {/* Icon/Image */}
                 <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-white/10 backdrop-blur-sm p-4 shadow-lg border border-white/20 flex items-center justify-center text-white text-6xl shadow-indigo-900/20">
                      {/* <img src={icon} alt="University" className="w-full h-full object-contain" /> */}
                      <FaUniversity />
                 </div>

                 {/* Info */}
                 <div className="flex-1 text-center md:text-left">
                      <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-sm leading-tight mb-2">
                          {universityData?.name || "University Name"}
                      </h2>
                      <p className="text-blue-100 font-medium text-lg flex items-center justify-center md:justify-start gap-2">
                           Welcome to your University Portal Dashboard
                      </p>
                 </div>
             </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             {/* Confact Info */}
             <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300">
                  <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                      <span className="p-2 bg-indigo-100 rounded-lg text-indigo-600"><FaUniversity /></span>
                      Contact Details
                  </h3>
                  <div className="space-y-4">
                       <InfoItem icon={<FaEnvelope />} label="Email Address" value={universityData?.email} />
                       <InfoItem icon={<FaPhoneAlt />} label="Phone Number" value={universityData?.contact} />
                  </div>
             </div>

             {/* Quick Actions / Status (Placeholder for now) */}
             <div className="bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl shadow-xl p-8 text-white relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none group-hover:bg-white/20 transition-all"></div>
                  
                  <h3 className="text-2xl font-bold mb-2 relative z-10">University Status</h3>
                  <p className="text-indigo-100 mb-6 relative z-10">Manage your courses, colleges, and student admissions efficiently.</p>
                  
                  <div className="grid grid-cols-2 gap-4 relative z-10">
                      <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10">
                          <div className="text-3xl font-bold">Active</div>
                          <div className="text-indigo-200 text-sm">Account Status</div>
                      </div>
                      <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10">
                           <FaUserGraduate className="text-3xl mb-1" />
                           <div className="text-indigo-200 text-sm">Student Access</div>
                      </div>
                  </div>
             </div>
        </div>

    </div>
  );
};

const InfoItem = ({ icon, label, value }) => (
    <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-indigo-200 transition-colors">
         <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-indigo-500 text-xl shadow-sm">
             {icon}
         </div>
         <div>
             <div className="text-xs font-bold text-slate-400 uppercase tracking-wide">{label}</div>
             <div className="text-slate-800 font-semibold">{value || "N/A"}</div>
         </div>
    </div>
);

export default Dashbord;
