import { FaWpforms } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleCollege } from "../../../Redux/features/University/UniversitySlice";
import Header from "../../../components/Header";
import Tables from "../../../components/table/Table";
import { getAllRecommendedColleges } from "../../../Redux/features/student/StudentSlice";
import { Card, CircularProgress, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Button from "../../../components/Button";
import { CollegesColumns } from "../../../components/commonComponents/student/TableColumns";

const AllrecommendedColleges = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const student = useSelector((state) => state?.studentAuth?.studentDetails);
  const recommendations = useSelector(
    (state) => state.student.recommendedColleges?.recommendations || []
  );
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        await dispatch(getAllRecommendedColleges()).unwrap();
      } catch (err) {
        setError(err.message || "Failed to fetch recommendations");
      } finally {
        setLoading(false);
      }
    };
    fetchRecommendations();
  }, [dispatch]);

  const handleViewDetails = (college) => {
    dispatch(getSingleCollege(college.course_id));
    navigate(`/bookings/recommended/${college.course_id}`);
  };
  const ConnectCollege = (college) => {
    if (college?.link) {
      // Redirect to the provided link
      window.open(college.link, "_blank"); // Opens the link in a new tab
    } else {
      console.warn("No link available for this college.");
    }
  };
  const columns = useMemo(
    () => CollegesColumns(navigate, handleViewDetails, ConnectCollege),
    [navigate]
  );

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          {/* <div className="mb-1">
            <Header title="All Recommended Colleges" Icon={FaWpforms} />
          </div> */}
          {loading ? (
            <div className="text-center">
              <CircularProgress />
            </div>
          ) : error ? (
            <Typography color="error" align="center" variant="subtitle1">
              {error}
            </Typography>
          ) : recommendations?.length > 0 ? (
            <>
              <Tables
                heading="All Recommended Colleges"
                DATA={recommendations}
                COLUMNS={columns}
              />
              <Typography
                variant="subtitle2"
                align="center"
                style={{ marginTop: "16px", color: "#555" }}
              >
                Total Recommendations: {recommendations.length}
              </Typography>
            </>
          ) : (
            <Typography
              align="center"
              color="textSecondary"
              variant="subtitle1"
            >
              <div className="flex flex-col items-center justify-center gap-3 p-10">
                <h1 className="font-bold text-red-400 text-center">
                  No recommendations found !
                </h1>
                <h1 className="text-center">
                  No recommendations found. Schedule a Counsellor session to get
                  personalized recommendations.
                </h1>
                <span onClick={() => navigate("/student/counsillor")}>
                  <Button title="Book A Counsellor" />
                </span>
              </div>{" "}
            </Typography>
          )}
        </Card>
      </Grid>
    </Grid>
  );
};
export default AllrecommendedColleges;
