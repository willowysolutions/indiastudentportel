import { FaWpforms, FaUniversity } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleCollege } from "../../../Redux/features/University/UniversitySlice";
import Header from "../../../components/Header";
import Tables from "../../../components/table/Table";
import { getAllRecommendedColleges } from "../../../Redux/features/student/StudentSlice";
import Button from "../../../components/Button";
import { CollegesColumns } from "../../../components/commonComponents/student/TableColumns";

const AllrecommendedColleges = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const recommendations = useSelector(
    (state) => state.student.recommendedColleges?.recommendations || []
  );
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        await dispatch(getAllRecommendedColleges()).unwrap();
      } catch (err) {
        setError(err.message || "Failed to fetch recommendations");
      } finally {
        setLoading(false);
      }
    };
    fetchRecommendations();
  }, [dispatch]);

  const handleViewDetails = (college) => {
    dispatch(getSingleCollege(college.course_id));
    navigate(`/bookings/recommended/${college.course_id}`);
  };
  const ConnectCollege = (college) => {
    if (college?.link) {
      window.open(college.link, "_blank");
    } else {
      console.warn("No link available for this college.");
    }
  };
  const columns = useMemo(
    () => CollegesColumns(navigate, handleViewDetails, ConnectCollege),
    [navigate]
  );

  return (
    <div className="space-y-6 w-full px-4 sm:px-6 lg:px-8 pb-10">
      <Header title="Recommended Colleges" Icon={FaUniversity} description="Colleges customized nicely for your profile." />
      
      <div className="bg-white rounded-3xl shadow-xl shadow-indigo-100/50 border border-slate-100 overflow-hidden">
        {loading ? (
             <div className="flex flex-col items-center justify-center p-20 min-h-[400px]">
                <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
                <p className="text-slate-500 font-medium">Loading recommendations...</p>
            </div>
        ) : error ? (
            <div className="text-center text-rose-500 py-12 bg-rose-50 rounded-xl border border-rose-100 m-4">
                <p className="font-semibold">{error}</p>
            </div>
        ) : recommendations?.length > 0 ? (
            <div className="p-2">
              <div className="overflow-x-auto">
                 <Tables
                   heading="All Recommended Colleges"
                   DATA={recommendations}
                   COLUMNS={columns}
                 />
              </div>
              <div className="p-4 bg-slate-50 border-t border-slate-100 text-center text-sm text-slate-500 font-medium">
                Total Recommendations: <span className="text-indigo-600 font-bold">{recommendations.length}</span>
              </div>
            </div>
        ) : (
            <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
                 <div className="w-24 h-24 bg-indigo-50 text-indigo-200 rounded-full flex items-center justify-center mb-6">
                    <FaWpforms className="w-12 h-12" />
                 </div>
                 <h3 className="text-xl font-bold text-slate-700 mb-2">No recommendations found!</h3>
                 <p className="text-slate-500 max-w-sm mx-auto mb-6">
                    Schedule a Counsellor session to get personalized recommendations.
                 </p>
                 <span onClick={() => navigate("/student/counsillor")}>
                    <Button title="Book A Counsellor" />
                 </span>
            </div>
        )}
      </div>
    </div>
  );
};
export default AllrecommendedColleges;
