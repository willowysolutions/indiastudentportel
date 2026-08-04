import StarRatings from "react-star-ratings";
import { FaEye, FaCalendarCheck, FaExternalLinkAlt } from "react-icons/fa";

export const getCouncillorColumns = (
  handleViewProfile,
  handleCheckAvailability,
  calculateAverageRating
) => [
  {
    Header: "Counsellor Name",
    accessor: "details.name",
  },
  {
    Header: "E-mail",
    accessor: "details.email",
  },
  {
    Header: "Number",
    accessor: "details.contact",
  },
  {
    Header: "Languages Spoken",
    accessor: "language",
  },
  {
    Header: "Session Mode",
    accessor: "session_mode",
  },
  {
    Header: "Ratings",
    accessor: "reviews",
    Cell: ({ row }) => {
      const averageRating = calculateAverageRating(row.original.reviews);
      return (
        <StarRatings
          rating={parseFloat(averageRating)}
          starRatedColor="#f9ee00"
          numberOfStars={5}
          starDimension="20px"
          starSpacing="1px"
        />
      );
    },
  },
  {
    Header: "View Profile",
    accessor: "viewprofile",
    Cell: ({ row }) => (
      <button
        onClick={() => handleViewProfile(row.original)}
        className="text-blue-600 hover:text-blue-800 transition-colors duration-200 p-2 rounded-full hover:bg-blue-50"
        title="View Profile"
      >
        <FaEye size={18} />
      </button>
    ),
  },
  {
    Header: "Check Availability",
    accessor: "checkavailability",
    Cell: ({ row }) => (
      <button
        onClick={() => handleCheckAvailability(row.original)}
        className="text-blue-600 hover:text-blue-800 transition-colors duration-200 p-2 rounded-full hover:bg-blue-50"
        title="Check Availability"
      >
        <FaCalendarCheck size={18} />
      </button>
    ),
  },
];
export const BookingsColumns = (handleViewProfile, calculateAverageRating) => [
  {
    Header: "Counseller Name",
    accessor: "counsellor.details.name",
  },
  {
    Header: "Time",
    accessor: "start",
  },
  {
    Header: "Language",
    accessor: "counsellor.language",
  },
  {
    Header: "Ratings",
    accessor: "reviews",
    Cell: ({ row }) => {
      const averageRating = calculateAverageRating(
        row.original.counsellor.reviews
      );
      return (
        <StarRatings
          rating={parseFloat(averageRating)}
          starRatedColor="#f9ee00"
          numberOfStars={5}
          starDimension="20px"
          starSpacing="1px"
        />
      );
    },
  },
  {
    Header: "Status",
    accessor: "status",
    Cell: ({ value }) => {
      let statusColor = "black";
      let statusBg = "bg-gray-100";
      
      switch(value?.toLowerCase()) {
        case "success":
        case "approved": 
          statusColor = "text-green-700";
          statusBg = "bg-green-100";
          break;
        case "reject":
        case "rejected":
          statusColor = "text-red-700";
          statusBg = "bg-red-100";
          break;
        case "pending":
          statusColor = "text-amber-700";
          statusBg = "bg-amber-100";
          break;
        default:
          statusColor = "text-gray-700";
          statusBg = "bg-gray-100";
      }

      return (
        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${statusBg} ${statusColor}`}>
          {value}
        </span>
      );
    },
  },
  {
    Header: "View Profile",
    accessor: "viewprofile",
    Cell: ({ row }) => (
      <button
        onClick={() => handleViewProfile(row.original)}
        className="text-blue-600 hover:text-blue-800 transition-colors duration-200 p-2 rounded-full hover:bg-blue-50"
        title="View Profile"
      >
        <FaEye size={18} />
      </button>
    ),
  },
];

export const CollegesColumns = (
  navigate,
  handleViewDetails,
  ConnectCollege
) => [
  {
    Header: "College Name",
    accessor: "college_name",
  },
  {
    Header: "Course Name",
    accessor: "course_name",
  },
  {
    Header: "Specialization",
    accessor: "title",
  },
  {
    Header: "Duration (Years)",
    accessor: "course_duration",
  },
  {
    Header: "Course Fee",
    accessor: "course_fee",
    Cell: ({ value }) => `₹${value}`, // Format the fee with currency symbol
  },
  {
    Header: "Recommended Date",
    accessor: "created_at",
    Cell: ({ value }) => new Date(value).toLocaleDateString(), // Format the date
  },
  {
    Header: "Direct Admission",
    accessor: "link",
    Cell: ({ row }) => (
      <button
        onClick={() => ConnectCollege(row.original)}
        className="text-blue-600 hover:text-blue-800 transition-colors duration-200 p-2 rounded-full hover:bg-blue-50"
        title="Direct Admission"
      >
        <FaExternalLinkAlt size={16} />
      </button>
    ),
  },
  // {
  //   Header: "",
  //   accessor: "id",
  //   Cell: ({ row }) => (
  //     <span onClick={() => handleViewDetails(row.original)} className=""></span>
  //   ),
  // },
];

export const AdmissionColumns = (navigate, handleViewProfile) => [
  {
    Header: "ID",
    accessor: "id", // accessor is the "key" in the data
  },
  {
    Header: "Admission No",
    accessor: `admn`,
  },
  {
    Header: "Name",
    accessor: "student_name",
  },
  {
    Header: "Course",
    accessor: "course.course_name",
  },
  {
    Header: "Status",
    accessor: "status",
    // Optional: You can add a Cell renderer if you want to customize how the data is displayed
    Cell: ({ value }) => {
      // Example: Custom rendering based on the status value
      let statusColor = "text-orange-700";
      let statusBg = "bg-orange-100";

      if (value === "success" || value === "approved") {
         statusColor = "text-green-700";
         statusBg = "bg-green-100";
      }

      return (
        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${statusBg} ${statusColor}`}>
          {value || "N/A"}
        </span>
      );
    },
  },
  {
    Header: "View",
    id: "view",
    Cell: ({ row }) => (
      <button
        onClick={() => handleViewProfile(row.original)}
        className="text-blue-600 hover:text-blue-800 transition-colors duration-200 p-2 rounded-full hover:bg-blue-50"
        title="View Details"
      >
        <FaEye size={18} />
      </button>
    ),
  },
];
