import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  SingleCounselor,
  getAllBookings,
} from "../../../Redux/features/student/StudentSlice";
import Tables from "../../../components/table/Table";
import Button from "../../../components/Button";
import { BookingsColumns } from "../../../components/commonComponents/student/TableColumns";
import Header from "../../../components/Header";
import { FaCalendarCheck, FaCalendarPlus } from "react-icons/fa";

const Bookings = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const student = useSelector((state) => state?.studentAuth?.studentDetails);

  // Fetch bookings on mount
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await dispatch(getAllBookings(student?.id)).unwrap();
        setData(response?.bookings || []);
      } catch (err) {
        setError(err.message || "Failed to fetch bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [dispatch, student?.id]);

  // Handle view profile click
  const handleViewProfile = (counselor) => {
    dispatch(SingleCounselor(counselor));
    navigate("/student/booking/profile");
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
    () => BookingsColumns(handleViewProfile, calculateAverageRating),
    []
  );

  return (
    <div className="space-y-6 w-full px-4 sm:px-6 lg:px-8 pb-10">
      <Header title="My Bookings" Icon={FaCalendarCheck} />

      <div className="bg-white rounded-3xl shadow-xl shadow-indigo-100/50 border border-slate-100 overflow-hidden">
        {loading ? (
             <div className="flex flex-col items-center justify-center p-20 min-h-[400px]">
                <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
                <p className="text-slate-500 font-medium">Loading bookings...</p>
            </div>
        ) : error ? (
            <div className="text-center text-rose-500 py-12 bg-rose-50 rounded-xl border border-rose-100 m-4">
                <p className="font-semibold">{error}</p>
            </div>
        ) : data?.length > 0 ? (
            <div className="p-2">
              <div className="overflow-x-auto">
                 <Tables heading="My Bookings" DATA={data} COLUMNS={columns} />
              </div>
              <div className="p-4 bg-slate-50 border-t border-slate-100 text-center text-sm text-slate-500 font-medium">
                Total Bookings: <span className="text-indigo-600 font-bold">{data.length}</span>
              </div>
            </div>
        ) : (
             <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
                 <div className="w-24 h-24 bg-indigo-50 text-indigo-200 rounded-full flex items-center justify-center mb-6">
                    <FaCalendarPlus className="w-12 h-12" />
                 </div>
                 <h3 className="text-xl font-bold text-slate-700 mb-2">No Bookings Found</h3>
                 <p className="text-slate-500 max-w-sm mx-auto mb-6">
                    You haven&apos;t booked any counselling sessions yet.
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

export default Bookings;
