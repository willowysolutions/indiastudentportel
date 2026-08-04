import test from "../../../assets/dashboard/test.png";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllQuestions,
  getPdfResult,
  getResults,
  submitTest,
  uploadPDF,
} from "../../../Redux/features/student/StudentSlice";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { updateStudent } from "../../../Redux/features/student/AuthStudentSlice";
import TestResult from "./TestResult";
import TestCompleted from "./TestCompleted";
import TestHomePage from "./TestHomePage";
import TestQuestion from "./TestQuestion";
import LoadingUi from "./LoadingUi";

const AptitudeTest = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const student = useSelector((state) => state?.studentAuth?.studentDetails);
  const questions = useSelector((state) => state.student.questions) || [];

  const [view, setView] = useState(student?.pdf ? "Taken" : "Rules");
  const [submitResult, setSubmitResult] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds
  const [timerActive, setTimerActive] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(false);

  let isAnswerSelected =
    questions.length > 0 &&
    answers[questions[currentQuestionIndex]?.id] !== undefined;

  useEffect(() => {
    console.log("Fetching all questions...");
    dispatch(getAllQuestions())
      .then(() => console.log("Questions fetched successfully."))
      .catch((err) => console.error("Error fetching questions:", err));
  }, [dispatch]);

  useEffect(() => {
    if (!timerActive) return;
    console.log("Starting timer...");
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          console.log("Time is up.");
          setView("TimeOver");
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [timerActive]);

  const handleOptionChange = (selectedOption) => {
    console.log("Option selected:", selectedOption);
    setAnswers({
      ...answers,
      [questions[currentQuestionIndex].id]: selectedOption,
    });
  };

  const handleNextQuestion = () => {
    console.log("Current question index:", currentQuestionIndex);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      console.log("Moved to next question.");
    } else {
      console.log("Submitting quiz...");
      handleSubmitQuiz();
    }
  };

  const handleSubmitQuiz = async () => {
    const data = {
      studentid: student?.student_id,
      name: student?.name,
      className: student?.class_name,
      email: student?.email,
      school: student?.school,
      gender: student?.gender,
      Stream: student?.stream,
      testresult: answers,
    };

    try {
      console.log("Submitting test data:", data);
      setLoadingMessage(true); // Show loader
      const resultAction = await dispatch(submitTest(data));
      const resultData = resultAction.payload;
      console.log("Test submission result:", resultData);

      const resultRes = await dispatch(getResults(student?.student_id));
      const fetchedResults = resultRes.payload;
      setSubmitResult(fetchedResults);
      console.log("Fetched results:", fetchedResults);

      if (fetchedResults?.interestreportlink) {
        console.log(
          "Fetching PDF from interest report link:",
          fetchedResults.interestreportlink
        );
        const pdfResultAction = await dispatch(
          getPdfResult(fetchedResults.interestreportlink)
        );
        const pdfData = pdfResultAction.payload;
        console.log("Fetched PDF data:", pdfData);

        console.log("Uploading PDF...");
        const uploadResult = await dispatch(
          uploadPDF({
            studentId: student?.id,
            pdf: pdfData,
          })
        ).unwrap();

        if (uploadResult.success) {
          console.log("PDF uploaded successfully:", uploadResult);
          await dispatch(updateStudent({ ...student, pdf: pdfData }));
          toast.success("PDF uploaded successfully!");
        } else {
          console.error("PDF upload failed:", uploadResult);
          toast.error("PDF upload failed. Please try again.");
          setView("Retest");
        }
      } else {
        console.warn("Interest report link not available.");
        toast.warning("Interest report link is missing.");
      }
    } catch (error) {
      console.error("Error in submitting quiz or handling PDF:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoadingMessage(false); // Hide loader
    }
  };

  const handleStartTest = () => {
    console.log("Test started.");
    setView("Questions");
    setTimerActive(true);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  if (!questions || questions.length === 0) {
    console.log("No questions available yet.");
    return <div>Loading questions...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="h-full">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {loadingMessage && <LoadingUi />} {/* Show loader when loading */}
      {submitResult ? (
        <TestResult submitResult={submitResult} />
      ) : (
        <div className="grid bg-white grid-cols-1 lg:grid-cols-2 gap-4 p-1">
          <div className="hidden lg:flex items-center justify-center">
            <img src={test} alt="Question paper" className="w-full" />
          </div>
          {view === "Taken" && <TestCompleted />}
          {view === "Rules" && <TestHomePage onStartTest={handleStartTest} />}
          {view === "Questions" && currentQuestion && (
            <TestQuestion
              currentQuestion={currentQuestion}
              currentQuestionIndex={currentQuestionIndex}
              totalQuestions={questions.length}
              timeLeft={timeLeft}
              formatTime={formatTime}
              answers={answers}
              onOptionChange={handleOptionChange}
              onNextQuestion={handleNextQuestion}
              onSubmitQuiz={handleSubmitQuiz}
              isAnswerSelected={isAnswerSelected}
              loadingMessage={loadingMessage}
            />
          )}
          {view === "TimeOver" && (
            <div className="bg-white shadow-lg rounded-lg p-8 flex items-center justify-center">
              <div className="text-2xl font-semibold text-red-600">
                Time Over
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AptitudeTest;
