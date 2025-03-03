import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  SingleCounselor,
  getAllBookings,
} from "../../../Redux/features/student/StudentSlice";
import Tables from "../../../components/table/Table";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "../../../components/Button";
import { BookingsColumns } from "../../../components/commonComponents/student/TableColumns";

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

  const renderContent = () => {
    if (loading) {
      return (
        <div className="text-center py-8">
          <CircularProgress />
        </div>
      );
    }

    if (error) {
      return <div className="text-center text-red-500 py-8">{error}</div>;
    }

    if (data?.length > 0) {
      return (
        <div>
          <Tables heading="List Of Counselors" DATA={data} COLUMNS={columns} />
          <div className="p-4 border-t text-sm text-gray-500">
            Total Bookings: {data.length}
          </div>
        </div>
      );
    }

    return (
      <div className="text-center text-gray-500 py-8">
        <div className="flex flex-col items-center justify-center gap-3 p-10">
          <h1 className="font-bold text-red-400 text-center">
            No bookings found!
          </h1>
          <p className="text-center">
            Schedule a session to see your admissions here.
          </p>
          <span onClick={() => navigate("/student/counsillor")}>
            <Button title="Book A Counselor" />
          </span>
        </div>
      </div>
    );
  };

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>{renderContent()}</Card>
      </Grid>
    </Grid>
  );
};

export default Bookings;
