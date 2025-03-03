import { useState } from "react";
import icon from "../../../assets/dashboard/councillor.png";
import Review from "./Review";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

const CouncillorProfile = () => {
  const selectedCounsellor = useSelector(
    (state) => state?.student?.selectedCounselor
  );
  const currentStudent = useSelector(
    (state) => state?.studentAuth?.studentDetails
  );

  return (
    <div className="h-full p-4">
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar
        newestOnTop
      />

      {/* Profile Header */}
      <div className="bg-gray-100 rounded-2xl w-full p-6 shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-6">
          <div className="text-center md:text-left space-y-2">
            <h1 className="text-2xl font-semibold">
              {selectedCounsellor?.details?.name}
            </h1>
            <p className="text-gray-600">
              Email: {selectedCounsellor?.details?.email}
            </p>
            <p className="text-gray-600">
              Contact: {selectedCounsellor?.details?.contact}
            </p>
            <p className="text-gray-600">
              Session Mode: {selectedCounsellor?.session_mode}
            </p>
            <p className="text-gray-600">
              Language: {selectedCounsellor?.language}
            </p>
          </div>
          <img
            src={icon}
            alt="Counsellor"
            className="w-32 md:w-44 mt-4 md:mt-0 hover:scale-105 transition-transform"
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Reviews Section */}
        <div className="lg:col-span-3 bg-white rounded-lg p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 text-center">
            Reviews
          </h3>
          {selectedCounsellor?.reviews?.length > 0 ? (
            <div className="space-y-4">
              {selectedCounsellor.reviews.map((review) => (
                <div
                  key={review.id}
                  className="p-4 bg-gray-50 rounded-md shadow-md"
                  style={{
                    wordBreak: "break-word", // Ensures long text wraps
                    whiteSpace: "normal", // Prevents truncation
                  }}
                >
                  <Review review={review} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">No reviews yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CouncillorProfile;
