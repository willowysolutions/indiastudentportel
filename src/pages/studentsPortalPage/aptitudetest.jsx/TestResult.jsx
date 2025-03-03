import React from "react";
import Button from "../../../components/Button";
import { useNavigate } from "react-router-dom";

const TestResult = ({ submitResult }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 flex items-center justify-center">
      <div className="flex flex-col gap-2 justify-center items-center">
        <div className="text-center">
          <h1 className="font-semibold text-[22px] p-2">
            Thank you for taking the test! Your Vocational Personality Code is :{" "}
            <span className="font-bold text-[25px]">
              {submitResult?.RAISECCode.replace("-", " and ")}
            </span>
          </h1>
        </div>
        <div className="w-full">
          <div className="flex w-full justify-evenly">
            <img
              src={`/images/${submitResult?.RAISECCode.split("-")[0]}.jpg`}
              className="w-[20%] object-contain"
              alt="social"
            />
            <img
              src={`/images/${submitResult?.RAISECCode.split("-")[1]}.jpg`}
              className="w-[20%] object-contain"
              alt="enterprising"
            />
          </div>
        </div>
        <div className="text-center">
          <p className="font-semibold text-xl p-2">{submitResult?.message}</p>
        </div>
        <h1 className="text-center">
          Do you want to learn what career areas and education options are most
          suitable for you?
        </h1>
        <h1 className="text-2xl text-blue-600">
          Click on the button to set up a call with the Counselor.
        </h1>
        <span onClick={() => navigate("/student/counsillor")}>
          <Button title="Set up a call" />
        </span>
      </div>
    </div>
  );
};

export default TestResult;
