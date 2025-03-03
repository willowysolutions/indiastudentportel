import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCourse } from "../../Redux/features/University/UniversitySlice";
import { Card, CircularProgress, Typography, Grid } from "@mui/material";
import Tables from "../../components/table/Table";
import Header from "../../components/Header";
import { FaWpforms } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { coursesColumns } from "../../components/commonComponents/UniversityCommonComponent/CollagesTableColumn";

const CoursesList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { courses } = useSelector((state) => state.university);
  console.log(courses, "coursescourses");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        await dispatch(getCourse()).unwrap();
      } catch (err) {
        setError(err.message || "Failed to fetch Course");
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [dispatch]);

  const handleEditCourse = (course) => {
    navigate(`/university/editCourse/${course.id}`, {
      state: { course },
    });
  };

  const columns = useMemo(() => coursesColumns(handleEditCourse));

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
          ) : courses?.length > 0 ? (
            <>
              <Tables
                heading="Courses Offered"
                DATA={courses}
                COLUMNS={columns}
              />
              <Typography
                variant="subtitle2"
                align="center"
                style={{ marginTop: "16px", color: "#555" }}
              >
                Total Courses: {courses.length}
              </Typography>
            </>
          ) : (
            <Typography
              align="center"
              color="textSecondary"
              variant="subtitle1"
            >
              No courses found.
            </Typography>
          )}
        </Card>
      </Grid>
    </Grid>
  );
};

export default CoursesList;
