import { FaEdit, FaUser } from "react-icons/fa";
import { FaUserClock } from "react-icons/fa";

export const coursesColumns = (handleEditCourse) => [
  {
    Header: "Course Name",
    accessor: "course_name",
  },
  {
    Header: "Title",
    accessor: "title",
  },
  {
    Header: "Duration (Years)",
    accessor: "course_duration",
  },
  {
    Header: "Course Fee",
    accessor: "course_fee",
    Cell: ({ value }) => `₹${value}`,
  },
  {
    Header: "Edit",
    accessor: "id",
    Cell: ({ row }) => (
      <button
        onClick={() => handleEditCourse(row.original)}
        className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors duration-200"
        title="Edit Course"
      >
        <FaEdit className="text-xl" />
      </button>
    ),
  },
];


export const collegeCollumn= (handleViewCollege,handleEdit,handleDelete ) =>  [
  {
    Header: 'No',
    accessor: 'id',
  },
  {
    Header: 'College',
    accessor: 'name',
  },
  {
    Header: 'Place',
    accessor: 'street',
  },
 
    
    {
      Header: 'View Profile',
      accessor: 'viewprofile',
      Cell: ({ row }) => (
        <button 
          onClick={() => handleViewCollege(row.original)} 
          className="flex gap-2 items-center rounded-3xl  px-4 py-1 overflow-hidden group bg-[F5F5FA] relative hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-400 text-violet-400 text-[.8rem] font-bold shadow-lg shadow-gray-400  transition-all ease-out duration-300"
        >
          View
        </button>
      ),
    },

    {
      Header: 'EDIT',
      accessor: 'edit',
      Cell: ({ row }) => (
        <button 
          onClick={() => handleEdit(row.original)} 
          className="flex gap-2 items-center rounded-3xl  px-4 py-1 overflow-hidden group bg-[F5F5FA] relative hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-400 text-violet-400 text-[.8rem] font-bold shadow-lg shadow-gray-400  transition-all ease-out duration-300"
        >
          Edit
        </button>
      ),
    },

    {
      Header: 'Delete',
      accessor: 'delete',
      Cell: ({ row }) => (
        <button 
          onClick={() =>handleDelete (row.original)} 
          className="flex gap-2 items-center rounded-3xl  px-4 py-1 overflow-hidden group bg-[F5F5FA] relative hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-400 text-violet-400 text-[.8rem] font-bold shadow-lg shadow-gray-400  transition-all ease-out duration-300"
        >
          Delete
        </button>
      ),
    },
  ];


