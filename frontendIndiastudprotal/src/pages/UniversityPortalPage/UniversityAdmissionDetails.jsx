import Link from "react-router-dom";
import Header from "../../components/Header";
import { FaGraduationCap, FaUniversity } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchCollege } from "../../Redux/features/University/UniversitySlice";

const UniversityAdmissionDetail = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);


  // Retrieve the selected college data from Redux store
  // const selectedStudent = useSelector(
  //   (state) => state.university.setSelectedStudent

  // );
  const singleStudentData = useSelector((state) => state?.university?.singleAdmissionData.admission);
console.log(singleStudentData,'bhbhb');

  // const selectedStudent=useSelector(
  //   (state)=>(state.singleData)
  // )
  // console.log(selectedStudent,'ddddd');
  // console.log(selectedCollege, "selected college");
  //  // Log the selected college data in the console
  //  useEffect(() => {
  //    console.log("Selected College:", selectedCollege);
  //  }, [selectedCollege]); // Run this effect whenever selectedCollege changes

  useEffect(() => {
    // Dispatch the fetchCollege action when the component mounts
    dispatch(fetchCollege());
  }, [dispatch]);

  // Retrieve college data from Redux store using useSelector
  // const collegeData = useSelector((state) => state.university.collegeData);
 


 

  

  // const  allCourses = selectedCollege.courses;


// console.log(allCourses);

  return (
    <div className="space-y-6 w-full px-4 sm:px-6 lg:px-8 pb-10">
        <Header title='Admission Details' Icon={FaGraduationCap} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Student Details Card */}
            <div className="bg-white rounded-3xl shadow-xl shadow-indigo-100/50 border border-slate-100 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
                     <h3 className="text-xl font-bold relative z-10 flex items-center gap-2">
                        <span className="p-1.5 bg-white/20 rounded-lg"><FaGraduationCap /></span>
                        Student Information
                     </h3>
                </div>
                <div className="p-6 space-y-4">
                     <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
                         <div className="flex-1">
                             <label className="text-xs font-bold text-slate-400 uppercase">Student Name</label>
                             <div className="text-lg font-bold text-slate-800">{singleStudentData?.student_name}</div>
                         </div>
                     </div>
                     <DetailRow label="Guardian" value={singleStudentData?.guardian} />
                     <DetailRow label="Email" value={singleStudentData?.email} />
                     <DetailRow label="Mobile" value={singleStudentData?.contact} />
                     <DetailRow label="Nationality" value={singleStudentData?.nationality} />
                     <DetailRow label="Religion" value={singleStudentData?.religion} />
                     <DetailRow label="Address" value={singleStudentData?.address} />
                </div>
            </div>

            {/* College Details Card */}
            <div className="bg-white rounded-3xl shadow-xl shadow-indigo-100/50 border border-slate-100 overflow-hidden">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
                     <h3 className="text-xl font-bold relative z-10 flex items-center gap-2">
                        <span className="p-1.5 bg-white/20 rounded-lg"><FaUniversity /></span>
                        College & Course
                     </h3>
                </div>
                <div className="p-6 space-y-6">
                     <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                         <label className="text-xs font-bold text-slate-400 uppercase">Selected College</label>
                         <div className="text-lg font-bold text-indigo-700">{singleStudentData?.college?.name}</div>
                     </div>
                     <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                         <label className="text-xs font-bold text-slate-400 uppercase">Selected Course</label>
                         <div className="text-lg font-bold text-indigo-700">{singleStudentData?.course?.course_name}</div>
                     </div>
                     
                     <div className="space-y-4 pt-2">
                        <DetailRow label="Affiliation" value={singleStudentData?.college?.affliation} />
                        <DetailRow label="Place" value={singleStudentData?.college?.street} />
                        <DetailRow label="State" value={singleStudentData?.state?.state} />
                        <DetailRow label="Pin Code" value={singleStudentData?.college?.pin_code} />
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

export default UniversityAdmissionDetail;
