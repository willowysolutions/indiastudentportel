import { useState } from "react";
import icon from "../../../assets/dashboard/councillor.png";
import StarRatings from "react-star-ratings";
import { useDispatch, useSelector } from "react-redux";
import { createReview } from "../../../Redux/features/student/StudentSlice";
import { ToastContainer, toast } from "react-toastify";
import Review from "../bookcouncillor/Review";

const BookedCouncillorProfile = () => {
  const dispatch = useDispatch();

  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [loading, setLoading] = useState(false);

  const selectedCounselor = useSelector(
    (state) => state.student?.selectedCounselor
  );
  const currentStudent = useSelector(
    (state) => state.studentAuth?.studentDetails
  );
  console.log(selectedCounselor, "selectedCounselor");
  console.log(currentStudent, "currentStudent");

  const handleRatingChange = (newRating) => setRating(newRating);

  const handleReviewChange = (event) => setReviewText(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!rating || !reviewText.trim()) {
      toast.error("Please provide a rating and review");
      return;
    }

    try {
      setLoading(true);

      const reviewData = {
        stars_count: rating,
        review: reviewText,
      };

      const response = await dispatch(
        createReview({
          data: reviewData,
          studentid: currentStudent?.id,
          counsellorId: selectedCounselor?.counsellor_id,
        })
      ).unwrap();

      toast.success("Review submitted successfully!");
      setRating(0);
      setReviewText("");
    } catch (error) {
      toast.error(
        error?.message ||
          "Students can review only once and must book this counselor to submit a review."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full p-4">
      <ToastContainer position="top-center" autoClose={4000} />
      {/* Profile Header Section */}
      <div className="bg-[#F5F7F8] rounded-2xl w-full p-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left">
            <h2 className="text-[1.6rem] font-semibold">
              {selectedCounselor?.counsellor?.details?.name || "Counselor Name"}
            </h2>
            <p className="text-zinc-600 text-[1rem]">
              E-mail: {selectedCounselor?.counsellor?.details?.email || "N/A"}
            </p>
            <p className="text-zinc-600 text-[1rem]">
              Contact:{" "}
              {selectedCounselor?.counsellor?.details?.contact || "N/A"}
            </p>
            <p className="text-zinc-600 text-[1rem]">
              Session Mode:{" "}
              {selectedCounselor?.counsellor.session_mode || "N/A"}
            </p>
            <p className="text-zinc-600 text-[1rem]">
              Language: {selectedCounselor?.counsellor?.language || "N/A"}
            </p>
          </div>
          <img
            src={icon}
            alt="Counsellor"
            className="w-[10rem] md:w-[14rem] mt-4 md:mt-0 hover:animate-pulse"
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr,3fr] gap-4 mt-6">
        {/* Left Section: Review Form */}
        <div className="shadow-xl p-4 bg-white rounded-lg">
          <h3 className="text-xl font-semibold text-zinc-600">
            Rate This Counsellor
          </h3>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <StarRatings
              rating={rating}
              starRatedColor="#f1c40f"
              changeRating={handleRatingChange}
              numberOfStars={5}
              starDimension="25px"
              starSpacing="5px"
            />
            <textarea
              className="rounded-md border border-gray-300 p-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Write your thoughts here..."
              value={reviewText}
              onChange={handleReviewChange}
              disabled={loading}
            />
            <button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md shadow-sm"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        </div>

        {/* Right Section: Reviews */}
        <div
          className="lg:col-span-1 bg-white rounded-lg p-4 shadow-lg"
          style={{ maxHeight: "400px", overflowY: "auto" }} // Adjust maxHeight as needed
        >
          <h3 className="text-center text-2xl font-semibold text-zinc-800">
            Reviews
          </h3>
          {selectedCounselor?.counsellor?.reviews?.length > 0 ? (
            selectedCounselor?.counsellor?.reviews.map((review) => (
              <div
                key={review.id}
                className="p-3 border-b border-gray-300 mb-2"
                style={{
                  wordWrap: "break-word",
                  whiteSpace: "normal",
                }}
              >
                <Review review={review} />
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No reviews yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookedCouncillorProfile;
