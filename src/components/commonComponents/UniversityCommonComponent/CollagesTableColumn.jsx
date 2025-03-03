import { FaUser } from "react-icons/fa6";
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
    Header: "edit",
    accessor: "id",
    Cell: ({ row }) => (
      <button
        onClick={() => handleEditCourse(row.original)}
        className="rounded-xl px-4 py-1 overflow-hidden group bg-zinc-600 relative hover:bg-gradient-to-r hover:from-purple-500 hover:to-purple-400 text-white transition-all ease-out duration-300"
      >
        <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40"></span>
        <span className="relative text-purple-400">Edit</span>
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


