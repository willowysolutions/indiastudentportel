import { useState, useEffect, useRef } from "react";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { FiEye, FiPlus } from "react-icons/fi";

// Custom hook to handle clicking outside dropdown
function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

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
      return "bg-emerald-500 shadow-emerald-200/50";
    case "0":
      return "bg-rose-500 shadow-rose-200/50";
    default:
      return "bg-slate-400 shadow-slate-200/50";
  }
};

const StatusDropdown = ({ currentStatus, setCurrentStatus, handleStatusChange, rowId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();
  useOnClickOutside(ref, () => setIsOpen(false));

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleSelect = (status, e) => {
    e.stopPropagation();
    const newStatus = status === "Approve" ? 1 : 0;
    handleStatusChange(rowId);
    setCurrentStatus(newStatus);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={ref}>
      <div
        className={`cursor-pointer text-center rounded-full px-3 py-1 flex items-center justify-between gap-1.5 text-white text-[10px] uppercase tracking-wider font-bold shadow-md transition-all hover:opacity-90 active:scale-95 ${getStatusColor(
          currentStatus
        )}`}
        onClick={toggleDropdown}
      >
        <span>{currentStatus == 0 ? "Reject" : "Approve"}</span>
        <IoIosArrowDropdownCircle size={14} />
      </div>
      {isOpen && (
        <div className="absolute right-0 z-[100] mt-2 w-32 origin-top-right rounded-lg bg-white shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none animate-in fade-in zoom-in-95 duration-200">
          <div className="py-1">
            {["Approve", "Reject"].map((status) => (
              <div
                key={status}
                className={`block px-4 py-2 text-xs font-medium cursor-pointer transition-colors ${
                  (status === "Approve" && currentStatus == 1) || (status === "Reject" && currentStatus == 0)
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
                onClick={(e) => handleSelect(status, e)}
              >
                {status}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const StudentColumns = (handleViewProfile, handleStatusChange) => [
  {
    Header: "No",
    accessor: (row, rowIndex) => rowIndex + 1,
    id: "rowIndex",
    Cell: ({ value }) => <span className="text-slate-500 font-mono text-xs">{value}</span>
  },
  {
    Header: "Student Name",
    accessor: "name",
    Cell: ({ value }) => <span className="font-semibold text-slate-700">{value}</span>
  },
  {
    Header: "E-mail",
    accessor: "email",
    Cell: ({ value }) => <span className="text-slate-500 text-xs">{value}</span>
  },
  {
    Header: "Number",
    accessor: "contact",
    Cell: ({ value }) => <span className="text-slate-500 text-xs font-mono">{value}</span>
  },
  {
    Header: "Standard", // Fixed typo "Standerd"
    accessor: "class_name",
    Cell: ({ value }) => <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-50 text-indigo-700">{value}</span>
  },
  {
    Header: "Status",
    id: "status",
    Cell: ({ row }) => {
      const [currentStatus, setCurrentStatus] = useState(getInitialStatus(row));
      return (
        <StatusDropdown 
          currentStatus={currentStatus} 
          setCurrentStatus={setCurrentStatus} 
          handleStatusChange={handleStatusChange} 
          rowId={row.original.id}
        />
      );
    },
  },
  {
    Header: "View",
    id: "view",
    Cell: ({ row }) => (
      <button
        onClick={() => handleViewProfile(row.original)}
        className="p-1.5 rounded-md text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200"
        title="View Details"
      >
        <FiEye size={18} />
      </button>
    ),
  },
];

export const AdminCouncillorColumns = (handleViewProfile, handleStatusChange) => [
  {
    Header: "No",
    accessor: (_, rowIndex) => rowIndex + 1,
    id: "rowIndex",
    Cell: ({ value }) => <span className="text-slate-500 font-mono text-xs">{value}</span>
  },
  {
    Header: "Name",
    accessor: "details.name",
    Cell: ({ value }) => <span className="font-semibold text-slate-700">{value}</span>
  },
  {
    Header: "Email",
    accessor: "details.email",
    Cell: ({ value }) => <span className="text-slate-500 text-xs">{value}</span>
  },
  {
    Header: "Contact",
    accessor: "details.contact",
    Cell: ({ value }) => <span className="text-slate-500 text-xs font-mono">{value}</span>
  },
  {
    Header: "Rating",
    accessor: "average_rating",
    Cell: ({ value }) => (
      <span className="flex items-center gap-1 text-xs font-medium text-amber-500">
        <span>★</span> {value || "N/A"}
      </span>
    )
  },
  {
    Header: "Status",
    id: "status",
    Cell: ({ row }) => {
      const [currentStatus, setCurrentStatus] = useState(getInitialStatus(row));
      return (
        <StatusDropdown 
          currentStatus={currentStatus} 
          setCurrentStatus={setCurrentStatus} 
          handleStatusChange={handleStatusChange} 
          rowId={row.original.id}
        />
      );
    },
  },
  {
    Header: "View",
    id: "view",
    Cell: ({ row }) => (
      <button
        onClick={() => handleViewProfile(row.original)}
        className="p-1.5 rounded-md text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200"
        title="View Details"
      >
        <FiEye size={18} />
      </button>
    ),
  },
];

export const AdminCollegesColumn = (handleViewProfile, handleStatusChange, handleAddCourse) => [
  {
    Header: "No",
    accessor: (row, rowIndex) => rowIndex + 1,
    id: "rowIndex",
    Cell: ({ value }) => <span className="text-slate-500 font-mono text-xs">{value}</span>
  },
  {
    Header: "College",
    accessor: "name",
    Cell: ({ value }) => (
      <div className="whitespace-normal break-words min-w-[200px] font-medium text-slate-700 leading-tight">
        {value}
      </div>
    ),
  },
  {
    Header: "Email",
    accessor: "email",
    Cell: ({ value }) => <span className="text-slate-500 text-xs">{value}</span>
  },
  {
    Header: "Contact",
    accessor: "contact",
    Cell: ({ value }) => <span className="text-slate-500 text-xs font-mono">{value}</span>
  },
  {
    Header: "Location",
    accessor: "location",
    Cell: ({ value }) => <span className="text-slate-600 text-xs truncate max-w-[150px] block">{value}</span>
  },
  {
    Header: "Creator",
    accessor: "created_by",
    Cell: ({ row }) => (
      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${row.original.created_by === "0" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"}`}>
        {row.original.created_by === "0" ? "Admin" : "College"}
      </span>
    ),
  },
  {
    Header: "Action",
    id: "add_course",
    Cell: ({ row }) =>
      row.original.created_by === "0" ? (
        <button
          onClick={() => handleAddCourse(row.original)}
          className="flex items-center gap-1 rounded-md px-2 py-1 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 hover:text-emerald-700 transition-all duration-200"
          title="Add Course"
        >
          <FiPlus size={14} />
          <span className="text-xs font-medium">Add</span>
        </button>
      ) : null,
  },
  {
    Header: "Status",
    id: "status",
    Cell: ({ row }) => {
      const [currentStatus, setCurrentStatus] = useState(getInitialStatus(row));
      return (
        <StatusDropdown 
          currentStatus={currentStatus} 
          setCurrentStatus={setCurrentStatus} 
          handleStatusChange={handleStatusChange} 
          rowId={row.original.user.id}
        />
      );
    },
  },
  {
    Header: "View",
    id: "view",
    Cell: ({ row }) => (
      <button
        onClick={() => handleViewProfile(row.original)}
        className="p-1.5 rounded-md text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200"
        title="View Details"
      >
        <FiEye size={18} />
      </button>
    ),
  },
];

export const AdmissionColumn = (handleViewProfile) => [
  {
    Header: "No",
    accessor: (_, rowIndex) => rowIndex + 1,
    id: "rowIndex",
    Cell: ({ value }) => <span className="text-slate-500 font-mono text-xs">{value}</span>
  },
  {
    Header: "Admission ID",
    accessor: "id",
    Cell: ({ value }) => <span className="font-mono text-xs text-slate-600">#{value}</span>
  },
  {
    Header: "Student Name",
    accessor: "student_name",
    Cell: ({ value }) => <span className="font-semibold text-slate-700">{value}</span>
  },
  {
    Header: "View",
    id: "view",
    Cell: ({ row }) => (
      <button
        onClick={() => handleViewProfile(row.original)}
        className="p-1.5 rounded-md text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200"
        title="View Details"
      >
        <FiEye size={18} />
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


