import { useState } from "react";
import { IoIosArrowDropdownCircle } from "react-icons/io";

const getInitialStatus = (row) => {
  return (
    row.original?.details?.active_status ??
    row.original?.active_status ??
    row.original?.user?.active_status
  );
};

const getStatusColor = (status) => {
  const normalizedStatus = String(status);
  switch (normalizedStatus) {
    case "1":
      return "bg-green-400";
    case "0":
      return "bg-red-400";
    default:
      return "bg-gray-400";
  }
};

export const StudentColumns = (handleViewProfile, handleStatusChange) => [
  {
    Header: "No",
    accessor: (row, rowIndex) => rowIndex + 1,
    id: "rowIndex",
  },
  {
    Header: "Student Name",
    accessor: "name",
  },
  {
    Header: "E-mail",
    accessor: "email",
  },
  {
    Header: "Number",
    accessor: "contact",
  },
  {
    Header: "Standerd",
    accessor: "class_name",
  },
  {
    Header: "Status",
    id: "status",
    Cell: ({ row }) => {
      const [isOpen, setIsOpen] = useState(false);
      const [currentStatus, setCurrentStatus] = useState(getInitialStatus(row));
      const toggleDropdown = () => setIsOpen(!isOpen);

      return (
        <div className="relative">
          <div
            className={`cursor-pointer text-center rounded-full px-2 py-1 flex items-center justify-between text-white ${getStatusColor(
              currentStatus
            )}`}
            onClick={toggleDropdown}
          >
            {currentStatus == 0 ? "Reject" : "Approve"}{" "}
            <IoIosArrowDropdownCircle />
          </div>
          {isOpen && (
            <div className="absolute z-10 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100">
              <div className="py-1">
                {["Approve", "Reject"].map((status) => (
                  <div
                    key={status}
                    className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      const newStatus = status === "Approve" ? 1 : 0;
                      handleStatusChange(row.original.id);
                      setCurrentStatus(newStatus);
                      setIsOpen(false);
                    }}
                  >
                    {status}
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
    Header: "View",
    id: "view",
    Cell: ({ row }) => (
      <button
        onClick={() => handleViewProfile(row.original)}
        className="rounded-xl px-4 py-1 group relative bg-blue-500 hover:bg-blue-600 transition-all ease-out duration-300"
      >
        <span className="relative text-white">View</span>
      </button>
    ),
  },
];

export const AdminCouncillorColumns = (
  handleViewProfile,
  handleStatusChange
) => [
  {
    Header: "No",
    accessor: (_, rowIndex) => rowIndex + 1,
    id: "rowIndex",
  },
  {
    Header: "Name",
    accessor: "details.name",
  },
  {
    Header: "Email",
    accessor: "details.email",
  },
  {
    Header: "Contact",
    accessor: "details.contact",
  },
  {
    Header: "Average Rating",
    accessor: "average_rating",
  },
  {
    Header: "Status",
    id: "status",
    Cell: ({ row }) => {
      const [isOpen, setIsOpen] = useState(false);
      const [currentStatus, setCurrentStatus] = useState(getInitialStatus(row));
      const toggleDropdown = () => setIsOpen(!isOpen);

      return (
        <div className="relative">
          <div
            className={`cursor-pointer text-center rounded-full px-2 py-1 flex items-center justify-between text-white ${getStatusColor(
              currentStatus
            )}`}
            onClick={toggleDropdown}
          >
            {currentStatus == 0 ? "Reject" : "Approve"}{" "}
            <IoIosArrowDropdownCircle />
          </div>
          {isOpen && (
            <div className="absolute z-10 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100">
              <div className="py-1">
                {["Approve", "Reject"].map((status) => (
                  <div
                    key={status}
                    className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      const newStatus = status === "Approve" ? 1 : 0;
                      handleStatusChange(row.original.id);
                      setCurrentStatus(newStatus); // Update local state
                      setIsOpen(false);
                    }}
                  >
                    {status}
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
    Header: "View",
    id: "view",
    Cell: ({ row }) => (
      <button
        onClick={() => handleViewProfile(row.original)}
        className="rounded-xl px-4 py-1 group relative bg-blue-500 hover:bg-blue-600 transition-all ease-out duration-300"
      >
        <span className="relative text-white">View</span>
      </button>
    ),
  },
];

export const AdminCollegesColumn = (
  handleViewProfile,
  handleStatusChange,
  handleAddCourse
) => [
  {
    Header: "No",
    accessor: (row, rowIndex) => rowIndex + 1,
    id: "rowIndex",
  },
  {
    Header: "College",
    accessor: "name",
    Cell: ({ value }) => (
      <div className="whitespace-normal break-words min-w-[200px]">
        {value}
      </div>
    ),
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
    Header: "Location",
    accessor: "location",
  },
  {
    Header: "Created by",
    accessor: "created_by",
    Cell: ({ row }) => (row.original.created_by === "0" ? "Admin" : "College"),
  },
  {
    Header: "Add Course",
    id: "add_course",
    Cell: ({ row }) =>
      row.original.created_by === "0" ? (
        <button
          onClick={() => handleAddCourse(row.original)}
          className="rounded-xl px-4 py-1 group relative bg-green-700 hover:bg-green-600 transition-all ease-out duration-300"
        >
          <span className="relative text-white">Add</span>
        </button>
      ) : null,
  },
  {
    Header: "Status",
    id: "status",
    Cell: ({ row }) => {
      const [isOpen, setIsOpen] = useState(false);
      const [currentStatus, setCurrentStatus] = useState(getInitialStatus(row));
      const toggleDropdown = () => setIsOpen(!isOpen);
      return (
        <div className="relative">
          <div
            className={`cursor-pointer text-center rounded-full px-2 py-1 flex items-center justify-between text-white ${getStatusColor(
              currentStatus
            )}`}
            onClick={toggleDropdown}
          >
            {currentStatus == 0 ? "Reject" : "Approve"}{" "}
            <IoIosArrowDropdownCircle />
          </div>
          {isOpen && (
            <div className="absolute z-10 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100">
              <div className="py-1">
                {["Approve", "Reject"].map((status) => (
                  <div
                    key={status}
                    className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      const newStatus = status === "Approve" ? 1 : 0;
                      handleStatusChange(row.original.user.id);
                      setCurrentStatus(newStatus);
                      setIsOpen(false);
                    }}
                  >
                    {status}
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
    Header: "Views",
    id: "view",
    Cell: ({ row }) => (
      <button
        onClick={() => handleViewProfile(row.original)}
        className="rounded-xl px-4 py-1 group relative bg-blue-500 hover:bg-blue-600 transition-all ease-out duration-300"
      >
        <span className="relative text-white">View</span>
      </button>
    ),
  },
];

export const AdmissionColumn = (handleViewProfile) => [
  {
    Header: "No",
    accessor: (_, rowIndex) => rowIndex + 1,
    id: "rowIndex", // Necessary for columns that are not directly tied to data fields
  },
  {
    Header: "Admission ID",
    accessor: "id", // Assumes your data structure has an 'admissionId' field
  },
  {
    Header: "Student Name",
    accessor: "student_name", // Assumes your data structure has a 'studentName' field
  },
  {
    Header: "View",
    id: "view", // id is necessary because accessor isn't used
    // Cell property to render a button or link
    Cell: ({ row }) => (
      <button
        onClick={() => handleViewProfile(row.original)}
        className="rounded-xl px-4 py-1 group relative bg-blue-500 hover:bg-blue-600 transition-all ease-out duration-300"
      >
        <span className="relative text-white">View</span>
      </button>
    ),
  },
];

// export const UniversityColumns = (handleViewProfile, handleStatusChange) => [
//   {
//     Header: "No",
//     accessor: (_, rowIndex) => rowIndex + 1,
//     id: "rowIndex", // Necessary for accessors that don't directly match data keys
//   },
//   {
//     Header: "College Name",
//     accessor: "details.name",
//   },
//   {
//     Header: "State",
//     accessor: "state_id",
//   },
//   {
//     Header: "Status",
//     id: "status",
//     Cell: ({ row }) => {
//       const [isOpen, setIsOpen] = useState(false);
//       const toggleDropdown = () => setIsOpen(!isOpen);

//       return (
//         <div className="relative">
//           <div
//             className={`cursor-pointer text-center rounded-full px-2 py-1 flex items-center justify-between text-white ${getStatusColor(
//               row.original.details.active_status
//             )}`}
//             onClick={toggleDropdown}
//           >
//             {row.original.details.active_status == 0 ? "Reject" : "Approve"}{" "}
//             <IoIosArrowDropdownCircle />
//           </div>
//           {isOpen && (
//             <div className="absolute z-10 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100">
//               <div className="py-1">
//                 {["Approve", "Reject"].map((status) => (
//                   <div
//                     key={status}
//                     className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
//                     onClick={() => {
//                       handleStatusChange(row.original.id);
//                       setIsOpen();
//                     }}
//                   >
//                     {status}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       );
//     },
//   },
//   {
//     Header: "View",
//     id: "view",
//     Cell: ({ row }) => (
//       <button
//         onClick={() => handleViewProfile(row.original)}
//         className="rounded-xl px-4 py-1 overflow-hidden group bg-zinc-600 relative hover:bg-gradient-to-r hover:from-purple-500 hover:to-purple-400 text-white transition-all ease-out duration-300"
//       >
//         <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40"></span>
//         <span className="relative text-purple-400">View</span>
//       </button>
//     ),
//   },
// ];


