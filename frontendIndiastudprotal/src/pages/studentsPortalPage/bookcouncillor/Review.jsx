import { useState } from "react";
import icon from "../../../assets/dashboard/wepik-export-20240313072348V9B7.png";
import StarRatings from "react-star-ratings";

const Review = ({ review }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const words = (review?.review ?? "").split(/\s+/);
  const shouldTruncate = words.length > 50;
  const displayedText =
    isExpanded || !shouldTruncate
      ? review?.review ?? ""
      : words.slice(0, 50).join(" ") + "...";
  const createdDate = new Date(review.created_at);
  const formattedDateTime = createdDate.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return (
    <article
      key={review.id}
      className="p-4 bg-white rounded-lg shadow-none mb-4"
    >
      {/* Review Header (Profile Image and User Info) */}
      <div className="flex items-center mb-4 space-x-4">
        <img
          className="w-12 h-12 rounded-full border-2 border-gray-300 p-1"
          src={icon}
          alt={review?.student?.name ?? "Unknown"}
        />
        <div>
          <p className="text-lg font-semibold text-black">
            {review?.student?.name ?? "Unknown Student"}
          </p>
          <time
            dateTime={review?.created_at}
            className="block text-sm text-gray-500"
          >
            {formattedDateTime}
          </time>
        </div>
      </div>

      {/* Star Rating */}
      <div className="mb-2">
        <StarRatings
          rating={Number(review?.stars_count ?? 0)}
          starRatedColor="#f1c40f"
          numberOfStars={5}
          name="rating"
          starDimension="20px"
          starSpacing="1px"
          svgIconViewBox="0 0 51 48"
        />
      </div>

      {/* Review Text */}
      <p className="text-gray-600 mb-4 overflow-hidden text-ellipsis">
        {displayedText}
      </p>

      {/* Read More / Read Less Button */}
      {shouldTruncate && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          {isExpanded ? "Read Less" : "Read More"}
        </button>
      )}
    </article>
  );
};

export default Review;
