import {
  Card,
  CircularProgress,
  Typography,
  Grid,
  Button,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState, useMemo } from "react";
import {
  getAllColleges,
  ChangeCollegeStatus,
  getAdminSingleCollege,
} from "../../../Redux/features/admin/AdminSlice";
import Table from "../../../components/table/Table";
import { AdminCollegesColumn } from "../../../components/commonComponents/admin/AdminColumns";

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
  const handleViewProfile = (college) => {
    dispatch(getAdminSingleCollege(college.id));
    navigate("/admin/colleges/profile");
  };

  // Change college status
  const handleStatusChange = async (id) => {
    dispatch(ChangeCollegeStatus(id));
  };

  // Navigate to Add Course with collegeId
  const handleAddCourse = (collegeId) => {
    navigate("/admin/colleges/adminAddCourse", { state: { collegeId } });
  };

  const columns = useMemo(
    () =>
      AdminCollegesColumn(
        handleViewProfile,
        handleStatusChange,
        handleAddCourse
      ),
    []
  );

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          {loading ? (
            <div className="text-center">
              <CircularProgress />
            </div>
          ) : error ? (
            <Typography color="error" align="center" variant="subtitle1">
              {error}
            </Typography>
          ) : data?.length > 0 ? (
            <>
              <Box display="flex" justifyContent="end" gap={2} mt={2} mr={7}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={() => navigate("importExcel")}
                  sx={{
                    textTransform: "none",
                    boxShadow: 2,
                    padding: "10px 20px",
                    fontWeight: 600,
                    borderRadius: 2,
                    "&:hover": {
                      backgroundColor: "#1565c0",
                    },
                  }}
                >
                  Import Excel
                </Button>
              </Box>
              <Box display="flex" justifyContent="end" gap={2} mt={2} mr={7}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={() => navigate("adminAddCollege")}
                  sx={{
                    textTransform: "none",
                    boxShadow: 2,
                    padding: "10px 20px",
                    fontWeight: 600,
                    borderRadius: 2,
                    "&:hover": {
                      backgroundColor: "#1565c0",
                    },
                  }}
                >
                  Add College
                </Button>
              </Box>
              <Table heading="Colleges" DATA={data} COLUMNS={columns} />
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
              No colleges found.
            </Typography>
          )}
        </Card>
      </Grid>
    </Grid>
  );
};

export default CollegesAdmin;
