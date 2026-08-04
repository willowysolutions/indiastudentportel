import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { FaUniversity } from "react-icons/fa";
import { Card, CircularProgress, Typography, Grid } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import icon from "../../assets/dashboard/wepik-export-20240313072348V9B7.png";
import {
  coucellingStatus,
  getCollege_Course,
  getCounsellorSingleCollage,
  getSingleSlots,
} from "../../Redux/features/Counciler/CouncilerSlice";
import { getPDF } from "../../Redux/features/student/StudentSlice";
import downloadPDF from "../../utils/downloadPDF";
import Header from "../../components/Header";
import Table from "../../components/table/Table";
import { RecommendCollegeToStudent } from "../../components/commonComponents/CounsilerCommenComponent/CouncilerColumn";

const STATUS = {
  APPROVED: "approved",
  UNKNOWN: "Unknown",
};

const SloteDetails = () => {
  const [isPdfAvailable, setIsPdfAvailable] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [studentId, slotId] = id.split("-");

  const sloteStudentDetail = useSelector(
    (state) => state.counciler?.SloteProfile?.booking
  );
  const student = sloteStudentDetail?.student;
  const councilerId = useSelector(
    (state) => state?.councilerAuth?.counsillor?.counsellor?.id
  );

  useEffect(() => {
    if (sloteStudentDetail?.completed)
      setIsCompleted(sloteStudentDetail.completed);
  }, [sloteStudentDetail]);

  useEffect(() => {
    (async () => {
      try {
        await dispatch(getSingleSlots({ councilerId, id: slotId }));
      } catch (err) {
        console.error("Error fetching slot details:", err);
      }
    })();
  }, [dispatch, councilerId, slotId]);

  useEffect(() => {
    (async () => {
      try {
        const result = await dispatch(getPDF(studentId));
        setIsPdfAvailable(result.payload?.success || false);
      } catch (err) {
        console.error("Error checking PDF availability:", err);
      }
    })();
  }, [dispatch, studentId]);

  useEffect(() => {
    (async () => {
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
    })();
  }, [dispatch]);

  const handleDownload = async () => {
    try {
      const result = await dispatch(getPDF(studentId));
      if (result.payload?.success) {
        toast.success("Downloading PDF...");
        downloadPDF(result.payload.pdf, "test-result.pdf");
      }
    } catch (err) {
      console.error("Error downloading PDF:", err);
    }
  };

  const handleCounselingStatus = async () => {
    if (!councilerId || !slotId) {
      toast.warn("Missing counseling details.");
      return;
    }

    try {
      const response = await dispatch(
        coucellingStatus({ counsellorId: councilerId, bookingId: slotId })
      ).unwrap();

      if (response?.success || response?.status === "updated") {
        toast.success("Counseling status updated successfully!");
        setIsCompleted(!isCompleted);
      } else {
        toast.error("Failed to update counseling status.");
      }
    } catch (err) {
      console.error("Error updating counseling status:", err);
      toast.error("Failed to update counseling status.");
    }
  };

  const handleViewCollege = (collegename) => {
    dispatch(getCounsellorSingleCollage({ id: collegename.id }));
    navigate(`/counsellor/booking/${id}/${collegename.id}`);
  };

  const columns = useMemo(
    () => RecommendCollegeToStudent(handleViewCollege),
    []
  );

  return (
    <div className="bg-[#F5F7F8] h-auto rounded-2xl w-full">
      <ToastContainer />
      <Header title="Recommend College" Icon={FaUniversity} />
      <div className="flex justify-between items-start mb-3">
        <div className="flex flex-col ml-4">
          <img
            src={icon}
            alt="students log"
            className="w-12 hover:animate-pulse"
          />
          <Typography variant="h5" className="font-semibold">
            {student?.name}
          </Typography>
          <Typography color="textSecondary">{student?.contact}</Typography>
          <Typography color="textSecondary">{student?.email}</Typography>
          <Typography color="textSecondary">
            <span>Message: {sloteStudentDetail?.title}</span>
          </Typography>
          <Typography
            className={`text-white text-center px-4 py-1 rounded w-[20rem] ${
              sloteStudentDetail?.status === STATUS.APPROVED
                ? "bg-green-500"
                : "bg-red-400"
            }`}
          >
            {sloteStudentDetail?.status || STATUS.UNKNOWN}
          </Typography>
        </div>
        <div className="flex flex-col gap-6 m-6">
          {isPdfAvailable && (
            <button
              className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              onClick={handleDownload}
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8l-8 8-8-8"
                />
              </svg>
              Download Result
            </button>
          )}
          <button
            onClick={handleCounselingStatus}
            className={`px-4 py-2 font-semibold rounded-lg shadow-md ${
              isCompleted
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-red-600 text-white hover:bg-red-700"
            }`}
          >
            {isCompleted ? "Counseling Complete" : "Counseling Over"}
          </button>
        </div>
      </div>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            {loading ? (
              <div className="text-center p-4">
                <CircularProgress />
                <Typography variant="subtitle2" mt={2}>
                  Loading colleges...
                </Typography>
              </div>
            ) : error ? (
              <Typography color="error" align="center">
                {error}
              </Typography>
            ) : data.length > 0 ? (
              <Table
                heading="Please Recommend a College to this student"
                DATA={data}
                COLUMNS={columns}
              />
            ) : (
              <Typography align="center">No colleges found.</Typography>
            )}
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default SloteDetails;
