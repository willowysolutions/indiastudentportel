import { IoIosArrowDropup } from "react-icons/io";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
const getStatusColor = (status) => {
  switch (status) {
    case "approved":
      return "bg-green-500";
    case "rejected":
      return "bg-red-500";
    default:
      return "bg-yellow-500";
  }
};
export const CounsellorColumns = (handleViewSlot, handleStatusChange) => [
  {
    Header: "No",
    accessor: (row, rowIndex) => rowIndex + 1,
    id: "rowIndex",
  },
  {
    Header: "Student Name",
    accessor: "student.name",
  },
  {
    Header: "Number",
    accessor: "student.contact",
  },
  {
    Header: "Standerd",
    accessor: "student.class_name",
  },
  {
    Header: "Date and Time",
    accessor: "start",
  },

  {
    Header: "Status",
    id: "status",
    Cell: ({ row }) => {
      const [isOpen, setIsOpen] = useState(false);
      const [currentStatus, setCurrentStatus] = useState(row.original.status);

      const toggleDropdown = () => setIsOpen((prev) => !prev);

      const handleStatusClick = async (newStatus) => {
        setCurrentStatus(newStatus);
        setIsOpen(false);
        handleStatusChange(row.original.id, newStatus);
      };

      return (
        <div className="relative">
          <div
            className={`cursor-pointer text-center rounded-full px-2 py-1 flex items-center justify-between text-white ${getStatusColor(
              currentStatus
            )}`}
            onClick={toggleDropdown}
          >
            {currentStatus === "rejected"
              ? "Rejected"
              : currentStatus === "approved"
              ? "Approved"
              : "Pending"}
            <IoIosArrowDropup />
          </div>
          {isOpen && (
            <div
              className="absolute z-50 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100"
              style={{ bottom: "100%", marginBottom: "4px" }}
            >
              <div className="py-1">
                {["approved", "rejected"].map((status) => (
                  <div
                    key={status}
                    className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleStatusClick(status)}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    },
  },

  {
    // Custom cell for view profile button
    Header: "View Profile",
    accessor: "viewprofile",
    Cell: ({ row }) => (
      <button
        onClick={() => handleViewSlot(row.original)}
        className="text-blue-600 hover:text-blue-800 transition-colors duration-200 p-2 rounded-full hover:bg-blue-50"
        title="View Profile"
      >
        <FaEye size={18} />
      </button>
    ),
  },
];

export const RecommendCollegeToStudent = (handleViewCollege) => [
  {
    Header: "No",
    accessor: (row, rowIndex) => rowIndex + 1,
    id: "rowIndex",
  },
  {
    Header: "College",
    accessor: "name",
  },
  {
    Header: "Affiliation",
    accessor: "university_name",
  },
  {
    Header: "Location",
    accessor: "location",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Contact",
    accessor: "contact",
  },
  {
    Header: "View Profile",
    accessor: "viewprofile",
    Cell: ({ row }) => (
      <button
        onClick={() => handleViewCollege(row.original)}
        className="text-blue-600 hover:text-blue-800 transition-colors duration-200 p-2 rounded-full hover:bg-blue-50"
        title="View Details"
      >
        <FaEye size={18} />
      </button>
    ),
  },
];
export const CounsellorCollegesColumn = (handleViewProfile) => [
  {
    Header: "No",
    accessor: (row, rowIndex) => rowIndex + 1,
    id: "rowIndex", // since we're not using an accessor from data, provide an id
  },
  {
    Header: "College",
    accessor: "name", // accessor is the "key" in the data
  },
  {
    Header: "Affiliation",
    accessor: "university_name",
    Cell: ({ value }) => (
      <div className="whitespace-normal min-w-[200px] break-words">
        {value}
      </div>
    ),
  },
  {
    Header: "Location",
    accessor: "location",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Contact",
    accessor: "contact",
  },
  {
    Header: "IMAGE",
    accessor: "image",
    Cell: ({ value }) => (
       <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100">
         {value ? <img src={value} alt="College" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">N/A</div>}
       </div>
    )
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


export const CounsellorAllRecommendColumn = (handleViewProfile) => [
  {
    Header: "No",
    accessor: (row, rowIndex) => rowIndex + 1,
    id: "rowIndex", // since we're not using an accessor from data, provide an id
  },
  {
    Header: "College",
    accessor: "name", // accessor is the "key" in the data
  },
  {
    Header: "Affiliation",
    accessor: "university_name", // accessor is the "key" in the data
  },
  {
    Header: "Location",
    accessor: "address",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Contact",
    accessor: "contact",
  },
];

