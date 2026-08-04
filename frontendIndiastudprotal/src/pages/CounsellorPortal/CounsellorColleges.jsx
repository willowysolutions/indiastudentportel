import { FaSchool } from "react-icons/fa";
import { useEffect, useMemo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Header from "../../components/Header";
import Table from "../../components/table/Table";
import { CounsellorCollegesColumn } from "../../components/commonComponents/CounsilerCommenComponent/CouncilerColumn";
import { getAdminSingleCollege } from "../../Redux/features/admin/AdminSlice";
import { getCollege_Course } from "../../Redux/features/Counciler/CouncilerSlice";
import { HiOutlineOfficeBuilding } from "react-icons/hi";

const CollegesCounsellors = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { payload } = await dispatch(getCollege_Course());
        if (payload?.colleges) {
          setData(payload.colleges);
        } else {
          setError("No colleges found.");
        }
      } catch (err) {
        setError(err.message || "Failed to fetch colleges.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleViewProfile = useCallback(
    (college) => {
      dispatch(getAdminSingleCollege(college));
      navigate("/counsellor/counsellorCollegeProfile");
    },
    [dispatch, navigate]
  );

  const columns = useMemo(() => CounsellorCollegesColumn(handleViewProfile), [handleViewProfile]);

  return (
    <div className="space-y-6 w-full px-4 sm:px-6 lg:px-8 pb-10">
      <Header title="Colleges" Icon={FaSchool} description="View details of colleges and their courses." />

      <div className="bg-white rounded-3xl shadow-xl shadow-indigo-100/50 border border-slate-100 overflow-hidden">
        {loading ? (
           <div className="flex flex-col items-center justify-center p-20 min-h-[400px]">
            <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
            <p className="text-slate-500 font-medium">Loading colleges...</p>
          </div>
        ) : error ? (
          <div className="p-10 text-center text-red-500 bg-red-50/50 min-h-[200px] flex items-center justify-center">
            {error}
          </div>
        ) : data.length > 0 ? (
          <div className="p-2">
            <div className="overflow-x-auto">
               <Table heading={"Colleges List"} DATA={data} COLUMNS={columns} />
            </div>
             <div className="p-4 bg-slate-50 border-t border-slate-100 text-center text-sm text-slate-500 font-medium">
              Total Colleges: <span className="text-indigo-600 font-bold">{data.length}</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
             <div className="w-24 h-24 bg-indigo-50 text-indigo-200 rounded-full flex items-center justify-center mb-6">
              <HiOutlineOfficeBuilding className="w-12 h-12" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">No Colleges Found</h3>
            <p className="text-slate-500 max-w-sm mx-auto mb-8">
              There are no colleges listed at the moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollegesCounsellors;

