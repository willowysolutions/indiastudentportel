import { Card, CircularProgress, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Table from "../../components/table/Table";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { CounsellorColumns } from "../../components/commonComponents/CounsilerCommenComponent/CouncilerColumn";
import { useDispatch, useSelector } from "react-redux";
import {
  getSlotes,
  approveSlote,
  rejectSlote,
} from "../../Redux/features/Counciler/CouncilerSlice";

const Bookings = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [sloteData, setSloteData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const councilerId = useSelector(
    (state) => state?.councilerAuth?.counsillor?.counsellor?.id
  );

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        setLoading(true);
        const { payload } = await dispatch(getSlotes(councilerId));
        setSloteData(payload.bookings);
      } catch (err) {
        setError(err.message || "Failed to fetch bookings");
      } finally {
        setLoading(false);
      }
    };
    fetchSlots();
  }, [dispatch, councilerId]);

  const handleViewSlot = (slot) => {
    navigate(`/counsellor/booking/${slot.student_id}-${slot.id}`);
  };

  const handleStatusChange = (bookingId, newStatus) => {
    setSloteData((prevData) =>
      prevData.map((slot) =>
        slot.id === bookingId ? { ...slot, status: newStatus } : slot
      )
    );
    const action = newStatus === "approved" ? approveSlote : rejectSlote;
    dispatch(action({ councilerId, bookingId }));
  };

  const columns = useMemo(
    () => CounsellorColumns(handleViewSlot, handleStatusChange),
    []
  );

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          {loading ? (
            <div className="text-center p-4">
              <CircularProgress />
              <Typography variant="subtitle2" color="textSecondary" mt={2}>
                Loading bookings...
              </Typography>
            </div>
          ) : error ? (
            <Typography color="error" align="center" variant="subtitle1">
              {error}
            </Typography>
          ) : sloteData.length > 0 ? (
            <>
              <Table
                heading="List of Bookings"
                DATA={sloteData}
                COLUMNS={columns}
              />
              <Typography
                variant="subtitle2"
                align="center"
                style={{ marginTop: "16px", color: "#555" }}
              >
                Total Bookings: {sloteData.length}
              </Typography>
            </>
          ) : (
            <Typography
              align="center"
              color="textSecondary"
              variant="subtitle1"
            >
              No bookings found. Please add a new booking to see it here.
            </Typography>
          )}
        </Card>
      </Grid>
    </Grid>
  );
};

export default Bookings;
