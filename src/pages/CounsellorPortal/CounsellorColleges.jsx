import { Card, CircularProgress, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { FaSchool } from "react-icons/fa";
import { useEffect, useMemo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Header from "../../components/Header";
import Table from "../../components/table/Table";
import { CounsellorCollegesColumn } from "../../components/commonComponents/CounsilerCommenComponent/CouncilerColumn";
import { getAdminSingleCollege } from "../../Redux/features/admin/AdminSlice";
import { getCollege_Course } from "../../Redux/features/Counciler/CouncilerSlice";

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
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          {/* Header Section */}
          {/* <div className="mb-1">
            <Header title="Colleges" Icon={FaSchool} />
          </div> */}

          {/* Content Section */}
          {loading ? (
            <div className="text-center">
              <CircularProgress />
            </div>
          ) : error ? (
            <Typography color="error" align="center" variant="subtitle1">
              {error}
            </Typography>
          ) : data.length > 0 ? (
            <>
              <Table heading={"Colleges List"} DATA={data} COLUMNS={columns} />
              <Typography
                variant="subtitle2"
                align="center"
                style={{ marginTop: "16px", color: "#555" }}
              >
                Total Colleges: {data.length}
              </Typography>
            </>
          ) : (
            <Typography
              align="center"
              color="textSecondary"
              variant="subtitle1"
            >
              No colleges found. Add some colleges to see them listed here.
            </Typography>
          )}
        </Card>
      </Grid>
    </Grid>
  );
};

export default CollegesCounsellors;

