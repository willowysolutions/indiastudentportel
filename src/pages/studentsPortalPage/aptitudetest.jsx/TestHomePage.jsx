import React from "react";
import Button from "../../../components/Button";

const TestHomePage = ({ onStartTest }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-8">
      <div className="font-semibold pt-2">Hello there!</div>
      <div className="pt-2">
        Looks like you are ready to understand more about your Vocational
        Personality!
      </div>
      <div className="pt-2">
        The Test you are going to take is based on Holland's test - which is one
        of the best Career assessments out there! There will be 33 statements in
        the test with a Yes / no response. Please pick what you think is most
        suited for you. Do not overthink - go with your gut feeling. All
        questions are compulsory, and there is no right or wrong answer.
      </div>
      <div className="pt-2">
        Are you excited to understand more about yourself and careers suitable
        for you? Go on then! Click on "Take Test" when you are ready.
      </div>
      <div className="mt-6 flex justify-center">
        <div onClick={onStartTest}>
          <Button title="Take Test" />
        </div>
      </div>
    </div>
  );
};

export default TestHomePage;