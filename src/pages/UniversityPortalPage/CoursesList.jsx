import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCourse } from "../../Redux/features/University/UniversitySlice";
import Tables from "../../components/table/Table";
import Header from "../../components/Header";
import { FaWpforms } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { coursesColumns } from "../../components/commonComponents/UniversityCommonComponent/CollagesTableColumn";

const CoursesList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { courses } = useSelector((state) => state.university);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        await dispatch(getCourse()).unwrap();
      } catch (err) {
        setError(err.message || "Failed to fetch Course");
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [dispatch]);

  const handleEditCourse = (course) => {
    navigate(`/university/editCourse/${course.id}`, {
      state: { course },
    });
  };

  const columns = useMemo(() => coursesColumns(handleEditCourse), []);

  return (
    <div className="space-y-6 w-full px-4 sm:px-6 lg:px-8 pb-10">
      <Header title="Courses Offered" Icon={FaWpforms} />

      <div className="bg-white rounded-3xl shadow-xl shadow-indigo-100/50 border border-slate-100 overflow-hidden">
         {loading ? (
             <div className="flex flex-col items-center justify-center p-20 min-h-[400px]">
                 <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
                 <p className="text-slate-500 font-medium">Loading courses...</p>
             </div>
         ) : error ? (
            <div className="text-center p-10 text-rose-500">
                {error}
            </div>
         ) : courses?.length > 0 ? (
            <div className="p-2">
                 <Tables
                   heading="Courses List"
                   DATA={courses}
                   COLUMNS={columns}
                 />
                 <div className="p-4 bg-slate-50 border-t border-slate-100 text-center text-sm text-slate-500 font-medium">
                    Total Courses: <span className="text-indigo-600 font-bold">{courses.length}</span>
                </div>
            </div>
         ) : (
             <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
                 <div className="w-24 h-24 bg-indigo-50 text-indigo-200 rounded-full flex items-center justify-center mb-6">
                     <FaWpforms className="w-12 h-12" />
                 </div>
                 <h3 className="text-xl font-bold text-slate-800 mb-2">No Courses Found</h3>
                 <p className="text-slate-500 max-w-sm mx-auto">
                     No courses available at the moment.
                 </p>
             </div>
         )}
      </div>
    </div>
  );
};

export default CoursesList;
