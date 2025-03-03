import { FaUserGraduate } from "react-icons/fa";
import Header from "../../../components/Header";
import Table from "../../../components/table/Table";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  ChangeStudentStatus,
  getSingleStudent,
  getStudents,
} from "../../../Redux/features/admin/AdminSlice";
import { Card, CircularProgress, Typography, Grid } from "@mui/material";
import { StudentColumns } from "../../../components/commonComponents/admin/AdminColumns";

const StudentsAdmin = () => {
  const dispatch = useDispatch();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateData, setUpdateData] = useState(false);

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
  }, [dispatch]);

  const navigate = useNavigate();

  const [councillor, setCouncillor] = useState();
  const handleViewProfile = (student) => {
    dispatch(getSingleStudent(student.id));
    setCouncillor(student);
    navigate("/admin/students/profile");
  };

  const handleStatusChange = (id) => {
    dispatch(ChangeStudentStatus(id));
    setUpdateData(true);
  };

  const columns = useMemo(
    () => StudentColumns(handleViewProfile, handleStatusChange),
    []
  );

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          {/* <div className="mb-1">
            <Header title="All Students List" Icon={FaUserGraduate} />
          </div> */}
          {loading ? (
            <div className="text-center">
              <CircularProgress />
            </div>
          ) : error ? (
            <Typography color="error" align="center" variant="subtitle1">
              {error}
            </Typography>
          ) : students?.length > 0 ? (
            <>
              <Table heading="Students Lists" DATA={students} COLUMNS={columns} />
              <Typography
                variant="subtitle2"
                align="center"
                style={{ marginTop: "16px", color: "#555" }}
              >
                Total Students: {students.length}
              </Typography>
            </>
          ) : (
            <Typography align="center" color="textSecondary" variant="subtitle1">
              No students found.
            </Typography>
          )}
        </Card>
      </Grid>
    </Grid>
  );
};

export default StudentsAdmin;