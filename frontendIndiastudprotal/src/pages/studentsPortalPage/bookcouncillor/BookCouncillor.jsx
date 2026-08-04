import Tables from "../../../components/table/Table";
import { getCouncillorColumns } from "../../../components/commonComponents/student/TableColumns";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  SingleCounselor,
  getcouncilerBooking,
} from "../../../Redux/features/student/StudentSlice";
import { FaChalkboardTeacher } from "react-icons/fa";
import Header from "../../../components/Header";

const BookCouncillor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isDataLoading, setIsDataLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsDataLoading(true);
        setError(null);
        await dispatch(getcouncilerBooking()).unwrap();
      } catch (err) {
        setError(err.message || "Failed to fetch data");
      } finally {
        setIsDataLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  const Datas = useSelector((state) => state?.student?.councilerData);
  const [selectedCounselor, setSelectedCounselor] = useState("");

  useEffect(() => {
    if (selectedCounselor) {
      navigate("/student/counsillor/profile");
    }
  }, [selectedCounselor, navigate]);

  const handleViewProfile = (counselor) => {
    setSelectedCounselor(counselor);
    dispatch(SingleCounselor(counselor));
  };

  const handleCheckAvailability = (counselor) => {
    setSelectedCounselor(counselor);
    dispatch(SingleCounselor(counselor));
    navigate("/student/counsillor/booking");
  };
  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const totalStars = reviews.reduce(
      (sum, review) => sum + review.stars_count,
      0
    );
    return (totalStars / reviews.length).toFixed(1);
  };
  const columns = useMemo(
    () =>
      getCouncillorColumns(
        handleViewProfile,
        handleCheckAvailability,
        calculateAverageRating
      ),
    []
  );

  return (
    <div className="space-y-6 w-full px-4 sm:px-6 lg:px-8 pb-10">
      <Header title="Book a Counsellor" Icon={FaChalkboardTeacher} description="Find and book sessions with expert career counsellors." />
      
      <div className="bg-white rounded-3xl shadow-xl shadow-indigo-100/50 border border-slate-100 overflow-hidden">
        {isDataLoading ? (
            <div className="flex flex-col items-center justify-center p-20 min-h-[400px]">
                <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
                <p className="text-slate-500 font-medium">Loading counsellors...</p>
            </div>
        ) : error ? (
            <div className="text-center text-rose-500 py-12 bg-rose-50 rounded-xl border border-rose-100 m-4">
                <p className="font-semibold">{error}</p>
            </div>
        ) : Datas?.length > 0 ? (
            <div className="p-2">
              <div className="overflow-x-auto">
                <Tables
                  heading="List Of Counsellor"
                  DATA={Datas}
                  COLUMNS={columns}
                />
              </div>
              <div className="p-4 bg-slate-50 border-t border-slate-100 text-center text-sm text-slate-500 font-medium">
                Total Counsellor: <span className="text-indigo-600 font-bold">{Datas.length}</span>
              </div>
            </div>
        ) : (
            <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
                 <div className="w-24 h-24 bg-indigo-50 text-indigo-200 rounded-full flex items-center justify-center mb-6">
                    <FaChalkboardTeacher className="w-12 h-12" />
                 </div>
                 <h3 className="text-xl font-bold text-slate-700 mb-2">No Counsellor Found</h3>
                 <p className="text-slate-500 max-w-sm mx-auto">
                    Please try again later or contact support.
                 </p>
            </div>
        )}
      </div>
    </div>
  );
};

export default BookCouncillor;
