import React from "react";

const TestQuestion = ({
  currentQuestion,
  currentQuestionIndex,
  totalQuestions,
  timeLeft,
  formatTime,
  answers,
  onOptionChange,
  onNextQuestion,
  onSubmitQuiz,
  isAnswerSelected,
  loadingMessage,
}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-8 relative">
      <div className="absolute top-4 right-4 text-xl font-semibold">
        {formatTime(timeLeft)}
      </div>
      <div className="text-xl font-semibold my-4">
        <span className="mr-2">{currentQuestionIndex + 1}.</span>
        {currentQuestion.question}
      </div>
      {["Yes", "No"].map((option, index) => (
        <label
          key={index}
          className="flex items-center gap-2 mb-2 cursor-pointer"
        >
          <input
            type="radio"
            value={option}
            checked={answers[currentQuestion.id] === option}
            onChange={() => onOptionChange(option)}
            className="form-radio text-blue-600 rounded-full"
            disabled={timeLeft === 0}
          />
          {option}
        </label>
      ))}
      <div className="absolute bottom-5 right-5">
        {currentQuestionIndex < totalQuestions - 1 ? (
          <button
            onClick={onNextQuestion}
            className="py-2 px-4 bg-blue-500 text-white rounded-md"
            disabled={!isAnswerSelected || timeLeft === 0}
          >
            Next
          </button>
        ) : (
          <button
            onClick={onSubmitQuiz}
            className={`py-2 px-4 ${
              loadingMessage ? "bg-gray-500 animate-pulse" : "bg-green-500"
            } text-white rounded-md`}
            disabled={!isAnswerSelected || timeLeft === 0}
          >
            {loadingMessage ? "Submitting..." : "Submit"}
          </button>
        )}
      </div>
    </div>
  );
};

export default TestQuestion;
