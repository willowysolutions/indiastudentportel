import { useSelector } from "react-redux";
import icon from "../../../assets/dashboard/councillor.png";

const CounsillorProfile = () => {
  const data = useSelector(
    (state) => state?.admin?.CounsilerProfile?.counsellor
  );

  const completedBookings = data?.bookings;

  return (
    <div className="h-full p-4 bg-gray-100">
      {/* Profile Header */}
      <div className="bg-white h-auto rounded-xl p-4 shadow-md">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Profile Info */}
          <div className="flex flex-col justify-start mb-4 md:mb-0">
            <div className="text-[1.6rem] font-semibold">
              {data?.details.name}
            </div>
            <div className="text-gray-700 text-[1rem] mt-2">
              <span className="font-medium">E-mail:</span>{" "}
              {data?.details?.email}
            </div>
            <div className="text-gray-700 text-[1rem] mt-1">
              <span className="font-medium">Contact:</span>{" "}
              {data?.details?.contact}
            </div>
            <div className="text-gray-700 text-[1rem] mt-1">
              <span className="font-medium">Session Mode:</span>{" "}
              {data?.session_mode}
            </div>
            <div className="text-gray-700 text-[1rem] mt-1">
              <span className="font-medium">Language:</span>{" "}
              {data?.language || "Not Specified"}
            </div>
          </div>

          {/* Profile Stats */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-md text-center">
            <div className="text-gray-600 font-medium">Total Sessions</div>
            <div className="text-gray-800 text-[1.5rem] font-semibold my-2">
              {data?.bookings?.length || 0}
            </div>
            <div className="text-gray-600">
              <span className="font-medium">Average Rating:</span>{" "}
              {data?.average_rating || 0}
            </div>
          </div>

          {/* Profile Image */}
          <div className="mt-4 md:mt-0">
            <img
              src={icon}
              alt="Counselor"
              className="w-32 h-32 rounded-full object-cover hover:animate-pulse"
            />
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="mt-6 bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-4 text-xl font-semibold text-gray-800">
          Counselor Sessions
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-600">
            {/* Table Header */}
            <thead className="bg-gray-100 text-gray-800">
              <tr>
                <th className="px-6 py-3">Student ID</th>
                <th className="px-6 py-3">Student Name</th>
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">Start Time</th>
                <th className="px-6 py-3">End Time</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {completedBookings?.length > 0 ? (
                completedBookings.map((session) => (
                  <tr
                    key={session.id}
                    className="bg-white border-b hover:bg-gray-50"
                  >
                    <td className="px-6 py-3">{session.student_id || "N/A"}</td>
                    <td className="px-6 py-3">
                      {session.student_name || "Unknown"}
                    </td>
                    <td className="px-6 py-3">{session.title || "No Title"}</td>
                    <td className="px-6 py-3">
                      {session.start
                        ? new Date(session.start).toLocaleString()
                        : "Not Available"}
                    </td>
                    <td className="px-6 py-3">
                      {session.end
                        ? new Date(session.end).toLocaleString()
                        : "Not Available"}
                    </td>
                    <td className="px-6 py-3 capitalize">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-lg ${
                          session.status === "approved"
                            ? "bg-green-100 text-green-800"
                            : session.status === "rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {session.status || "Unknown"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-3 text-center text-gray-500"
                  >
                    No sessions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CounsillorProfile;
