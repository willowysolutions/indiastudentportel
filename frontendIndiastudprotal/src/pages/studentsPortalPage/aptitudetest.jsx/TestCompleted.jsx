import React from "react";
import Button from "../../../components/Button";
import { useNavigate } from "react-router-dom";

const TestCompleted = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center gap-3 p-10">
      <h1 className="font-bold text-red-600 text-center">
        You have already completed an aptitude test!
      </h1>
      <h1 className="text-center">
        Do you want to learn what career areas and education options are most
        suitable for you?
      </h1>
      <h1 className="text-2xl text-blue-600 text-center">
        Click on the button to set up a call with the Counselor.
      </h1>
      <span onClick={() => navigate("/student/counsillor")}>
        <Button title="Set up a call" />
      </span>
      <p className="text-center">
        After completing a full session with a counselor, you can download your
        test report.
      </p>
    </div>
  );
};

export default TestCompleted;
