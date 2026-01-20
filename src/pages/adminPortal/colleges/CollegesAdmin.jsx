import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState, useMemo, useCallback } from "react";
import {
  getAllColleges,
  ChangeCollegeStatus,
  getAdminSingleCollege,
} from "../../../Redux/features/admin/AdminSlice";
import Table from "../../../components/table/Table";
import { AdminCollegesColumn } from "../../../components/commonComponents/admin/AdminColumns";
import Header from "../../../components/Header";
import { FaSchool } from "react-icons/fa";
import { HiOutlineOfficeBuilding, HiPlus, HiDocumentDownload, HiOutlineExclamationCircle } from "react-icons/hi";

const CollegesAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        setLoading(true);
        const res = await dispatch(getAllColleges());
        setData(res.payload.colleges);
      } catch (error) {
        setError(error.message || "Failed to fetch colleges.");
      } finally {
        setLoading(false);
      }
    };
    fetchColleges();
  }, [dispatch]);

  // View college profile
  const handleViewProfile = useCallback((college) => {
    dispatch(getAdminSingleCollege(college.id));
    navigate("/admin/colleges/profile");
  }, [dispatch, navigate]);

  // Change college status
  const handleStatusChange = useCallback(async (id) => {
    dispatch(ChangeCollegeStatus(id));
  }, [dispatch]);

  // Navigate to Add Course with collegeId
  const handleAddCourse = useCallback((collegeId) => {
    navigate("/admin/colleges/adminAddCourse", { state: { collegeId } });
  }, [navigate]);

  const columns = useMemo(
    () =>
      AdminCollegesColumn(
        handleViewProfile,
        handleStatusChange,
        handleAddCourse
      ),
    [handleViewProfile, handleStatusChange, handleAddCourse]
  );

  return (
    <div className="space-y-6 w-full px-4 sm:px-6 lg:px-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
         <div className="flex-grow">
           <Header title="Colleges" Icon={FaSchool} />
         </div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl shadow-indigo-100/50 border border-slate-100 overflow-hidden">
        {loading ? (
           <div className="flex flex-col items-center justify-center p-20 min-h-[400px]">
            <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
            <p className="text-slate-500 font-medium">Loading colleges...</p>
          </div>
        ) : error ? (
           <div className="p-10 text-center text-red-500 bg-red-50/50 min-h-[200px] flex items-center justify-center flex-col">
             <HiOutlineExclamationCircle className="w-10 h-10 mb-2 opacity-50"/>
            {error}
          </div>
        ) : data?.length > 0 ? (
          <div className="p-2">
            {/* Action Buttons */}
            <div className="p-4 flex flex-wrap justify-end gap-3 border-b border-slate-100 bg-slate-50/50 rounded-t-3xl">
                <button
                  onClick={() => navigate("importExcel")}
                  className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl font-medium hover:bg-slate-50 hover:text-indigo-600 transition-colors shadow-sm"
                >
                  <HiDocumentDownload className="w-5 h-5"/>
                  Import Excel
                </button>
                 <button
                  onClick={() => navigate("adminAddCollege")}
                  className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-all shadow-md shadow-indigo-200"
                >
                  <HiPlus className="w-5 h-5"/>
                  Add College
                </button>
            </div>

            <div className="overflow-x-auto">
              <Table heading="Colleges" DATA={data} COLUMNS={columns} />
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
            <p className="text-slate-500 max-w-sm mx-auto mb-6">
               Get started by adding colleges to the platform.
            </p>
            <div className="flex gap-4">
                 <button
                  onClick={() => navigate("importExcel")}
                   className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl font-medium hover:bg-slate-50 hover:text-indigo-600 transition-colors shadow-sm"
                >
                  <HiDocumentDownload className="w-5 h-5"/>
                  Import
                </button>
                 <button
                  onClick={() => navigate("adminAddCollege")}
                   className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-all shadow-md shadow-indigo-200"
                >
                  <HiPlus className="w-5 h-5"/>
                  Add New
                </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollegesAdmin;
