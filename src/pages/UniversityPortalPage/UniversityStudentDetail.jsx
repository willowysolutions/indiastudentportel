import Header from "../../components/Header";
import { FaGraduationCap, FaUniversity } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchCollege } from "../../Redux/features/University/UniversitySlice";
import { useEffect } from "react";


const UniversityStudentDetail = () => {
  const dispatch = useDispatch();
  const singleStudentData = useSelector((state) => state?.university?.singleStudentData?.student);
  
  // Clean up unused selectors/state in next pass if needed, for now focusing on UI render
  
  useEffect(() => {
    dispatch(fetchCollege());
  }, [dispatch]);

  return (
    <div className="space-y-6 w-full px-4 sm:px-6 lg:px-8 pb-10">
        <Header title='Student Details' Icon={FaGraduationCap} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Student Details Card */}
            <div className="bg-white rounded-3xl shadow-xl shadow-indigo-100/50 border border-slate-100 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
                     <h3 className="text-xl font-bold relative z-10 flex items-center gap-2">
                        <span className="p-1.5 bg-white/20 rounded-lg"><FaGraduationCap /></span>
                        Student Review
                     </h3>
                </div>
                <div className="p-6 space-y-4">
                     <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
                         <div className="flex-1">
                             <label className="text-xs font-bold text-slate-400 uppercase">Student Name</label>
                             <div className="text-lg font-bold text-slate-800">{singleStudentData?.name}</div>
                         </div>
                     </div>
                     <DetailRow label="Email" value={singleStudentData?.email} />
                     <DetailRow label="Mobile" value={singleStudentData?.contact} />
                     <DetailRow label="Address" value={singleStudentData?.address} />
                </div>
            </div>

            {/* College Details Card (Placeholder/Static as per original file structure) */}
            <div className="bg-white rounded-3xl shadow-xl shadow-indigo-100/50 border border-slate-100 overflow-hidden">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
                     <h3 className="text-xl font-bold relative z-10 flex items-center gap-2">
                        <span className="p-1.5 bg-white/20 rounded-lg"><FaUniversity /></span>
                        College & Contact
                     </h3>
                </div>
                <div className="p-6">
                    <p className="text-slate-500 italic text-center py-10">
                        {/* Original file had empty li's for details. Keeping placeholder until data binding is confirmed. */}
                        No confirmed college details available for this view.
                    </p>
                     
                     <div className="space-y-4 pt-2 hidden">
                        {/* Hidden until data source confirmed, matching original empty display */}
                        <DetailRow label="Affiliation" value="" />
                        <DetailRow label="Place" value="" />
                     </div>
                </div>
            </div>
        </div>
    </div>
  );
};

const DetailRow = ({ label, value }) => (
    <div className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0 hover:bg-slate-50/50 rounded-lg px-2 transition-colors">
        <span className="text-sm font-medium text-slate-500">{label}</span>
        <span className="text-sm font-semibold text-slate-700 text-right max-w-[60%]">{value || "N/A"}</span>
    </div>
);

export default UniversityStudentDetail;
