import Tables from "../../../components/table/Table";
import { getCouncillorColumns } from "../../../components/commonComponents/student/TableColumns";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  SingleCounselor,
  getcouncilerBooking,
} from "../../../Redux/features/student/StudentSlice";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CircularProgress from "@mui/material/CircularProgress";
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
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          {isDataLoading ? (
            <div className="text-center py-8">
              <CircularProgress />
            </div>
          ) : error ? (
            <div className="text-center text-red-500 py-8">{error}</div>
          ) : Datas?.length > 0 ? (
            <div>
              <Tables
                heading="List Of Counsellor"
                DATA={Datas}
                COLUMNS={columns}
              />
              <div className="p-4 border-t text-sm text-gray-500">
                Total Counsellor: {Datas.length}
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              No Counsellor found. Please try again later or contact support.
            </div>
          )}
        </Card>
      </Grid>
    </Grid>
  );
};

export default BookCouncillor;
