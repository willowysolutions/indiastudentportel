import { FaChalkboardTeacher } from "react-icons/fa";
import Header from "../../../components/Header";
import Table from "../../../components/table/Table";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminCouncillorColumns } from "../../../components/commonComponents/admin/AdminColumns";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  ChangeCounselorStatus,
  getAllCounciler,
  getSingleCounciler,
} from "../../../Redux/features/admin/AdminSlice";
import { Card, CircularProgress, Typography, Grid } from "@mui/material";

const CounsillorAdmin = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [councillor, setCouncillor] = useState();

  useEffect(() => {
    const fetchCounsellors = async () => {
      try {
        setLoading(true);
        const res = await dispatch(getAllCounciler());
        setData(res.payload.counsellors);
      } catch (error) {
        setError(error.message || "Failed to fetch Counsellor.");
      } finally {
        setLoading(false);
      }
    };
    fetchCounsellors();
  }, [dispatch]);

  const navigate = useNavigate();

  const handleViewProfile = (collegename) => {
    dispatch(getSingleCounciler(collegename.id));
    setCouncillor(collegename);
    navigate("/admin/councillors/profile");
  };

  const handleStatusChange = (id) => {
    dispatch(ChangeCounselorStatus(id));
  };

  const columns = useMemo(
    () => AdminCouncillorColumns(handleViewProfile, handleStatusChange),
    []
  );

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          {/* <div className="mb-1">
            <Header title="Counsellors" Icon={FaChalkboardTeacher} />
          </div> */}
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
              <Table heading="Counsellor" DATA={data} COLUMNS={columns} />
              <Typography
                variant="subtitle2"
                align="center"
                style={{ marginTop: "16px", color: "#555" }}
              >
                Total Counsellor: {data.length}
              </Typography>
            </>
          ) : (
            <Typography align="center" color="textSecondary" variant="subtitle1">
              No Counsellor found.
            </Typography>
          )}
        </Card>
      </Grid>
    </Grid>
  );
};

export default CounsillorAdmin;
