import { Button } from "@material-tailwind/react";
import StarRatings from "react-star-ratings";

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
        className="rounded-xl px-4 py-1 group relative bg-yellow-500 hover:bg-yellow-600 transition-all ease-out duration-300"
      >
        <span className="relative text-white">View</span>
      </button>
    ),
  },
  {
    Header: "Check Availability",
    accessor: "checkavailability",
    Cell: ({ row }) => (
      <button
        onClick={() => handleCheckAvailability(row.original)}
        className="rounded-xl px-4 py-1 group relative bg-blue-500 hover:bg-blue-600 transition-all ease-out duration-300"
      >
        <span className="relative text-white">Availability</span>
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
      let statusColor =
        value === "success"
          ? "green"
          : value === "reject"
          ? "orange"
          : value === "pending"
          ? "gray"
          : "black";

      return <span style={{ color: statusColor }}>{value}</span>;
    },
  },
  {
    Header: "View Profile",
    accessor: "viewprofile",
    Cell: ({ row }) => (
      <button
        onClick={() => handleViewProfile(row.original)}
        className="rounded-xl px-4 py-1 group relative bg-yellow-500 hover:bg-yellow-600 transition-all ease-out duration-300"
      >
        <span className="relative text-white">View</span>
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
      <Button onClick={() => ConnectCollege(row.original)} className="">
        Admission
      </Button>
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
      let statusColor = value === "success" ? "green" : "orange";
      return <span style={{ color: statusColor }}>{value}</span>;
    },
  },
  {
    Header: "View",
    id: "view",
    Cell: ({ row }) => (
      <button
        onClick={() => handleViewProfile(row.original)}
        className="rounded-xl px-4 py-1 overflow-hidden group bg-zinc-600 relative hover:bg-gradient-to-r hover:from-purple-500 hover:to-purple-400 text-white transition-all ease-out duration-300"
      >
        <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40"></span>
        <span className="relative text-purple-400">View</span>
      </button>
    ),
  },
];
