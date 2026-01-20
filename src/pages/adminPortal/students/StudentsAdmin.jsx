import { FaUserGraduate } from "react-icons/fa";
import Header from "../../../components/Header";
import Table from "../../../components/table/Table";
import { useEffect, useMemo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  ChangeStudentStatus,
  getSingleStudent,
  getStudents,
} from "../../../Redux/features/admin/AdminSlice";
import { StudentColumns } from "../../../components/commonComponents/admin/AdminColumns";
import { HiUserGroup, HiOutlineExclamationCircle } from "react-icons/hi";

const StudentsAdmin = () => {
  const dispatch = useDispatch();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateData, setUpdateData] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const { payload } = await dispatch(getStudents());
        setStudents(payload.students);
      } catch (error) {
        setError(error.message || "Failed to fetch students.");
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, [dispatch, updateData]);


  const handleViewProfile = useCallback((student) => {
    dispatch(getSingleStudent(student.id));
    navigate("/admin/students/profile");
  }, [dispatch, navigate]);

  const handleStatusChange = useCallback((id) => {
    dispatch(ChangeStudentStatus(id));
    setUpdateData((prev) => !prev);
  }, [dispatch]);

  const columns = useMemo(
    () => StudentColumns(handleViewProfile, handleStatusChange),
    [handleViewProfile, handleStatusChange]
  );

  return (
    <div className="space-y-6 w-full px-4 sm:px-6 lg:px-8 pb-10">
      <Header title="All Students List" Icon={FaUserGraduate} />

      <div className="bg-white rounded-3xl shadow-xl shadow-indigo-100/50 border border-slate-100 overflow-hidden">
        {loading ? (
           <div className="flex flex-col items-center justify-center p-20 min-h-[400px]">
            <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
            <p className="text-slate-500 font-medium">Loading students...</p>
          </div>
        ) : error ? (
          <div className="p-10 text-center text-red-500 bg-red-50/50 min-h-[200px] flex items-center justify-center flex-col">
            <HiOutlineExclamationCircle className="w-10 h-10 mb-2 opacity-50"/>
            {error}
          </div>
        ) : students?.length > 0 ? (
          <div className="p-2">
            <div className="overflow-x-auto">
              <Table heading="Students Lists" DATA={students} COLUMNS={columns} />
            </div>
             <div className="p-4 bg-slate-50 border-t border-slate-100 text-center text-sm text-slate-500 font-medium">
              Total Students: <span className="text-indigo-600 font-bold">{students.length}</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
             <div className="w-24 h-24 bg-indigo-50 text-indigo-200 rounded-full flex items-center justify-center mb-6">
              <HiUserGroup className="w-12 h-12" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">No Students Found</h3>
            <p className="text-slate-500 max-w-sm mx-auto">
              There are no registered students at this time.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentsAdmin;