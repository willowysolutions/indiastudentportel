import { useSelector } from "react-redux";
import icon from "../../../assets/dashboard/wepik-export-20240313072348V9B7.png";

const StudentsProfile = () => {
  const student = useSelector((state) => state?.admin?.StudentProfile?.student);
  const counsellors = useSelector(
    (state) => state?.admin?.StudentProfile?.counsellors
  );

  return (
    <div className="h-full p-6">
      <div className="bg-blue-100 p-6 rounded-lg shadow-md">
        <div className="text-blue-700">
          <h2 className="text-2xl font-semibold">
            Name : {student?.name || "Name not available"}
          </h2>
        </div>
        {/* Top Section - Student Info */}
        <div className="flex justify-between items-center mb-6 bg-white p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div>
                <strong>Name:</strong> {student?.name || "N/A"}
              </div>
              <div>
                <strong>Email:</strong> {student?.email || "N/A"}
              </div>
              <div>
                <strong>Address:</strong> {student?.address || "N/A"}
              </div>
              <div>
                <strong>Contact:</strong> {student?.contact || "N/A"}
              </div>
            </div>
            <div className="space-y-2">
              <div>
                <strong>Gender:</strong> {student?.gender || "N/A"}
              </div>
              <div>
                <strong>School:</strong> {student?.school || "N/A"}
              </div>
              <div>
                <strong>Class:</strong> {student?.class_name || "N/A"}
              </div>
              <div>
                <strong>Stream:</strong> {student?.stream || "N/A"}
              </div>
            </div>
          </div>
          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <img
              src={icon}
              alt="student icon"
              className="w-32 h-32 rounded-full border-4 border-blue-600"
            />
          </div> */}
        </div>

        {/* Counselor Bookings */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-medium text-blue-600 mb-4">
            Counselor Bookings
          </h3>
          {counsellors?.length > 0 ? (
            <div className="overflow-y-auto max-h-64">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr className="text-left bg-blue-100 text-gray-800">
                    <th className="p-2 border">Counselor</th>
                    <th className="p-2 border">message</th>
                    <th className="p-2 border">Date & Time</th>
                    <th className="p-2 border">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {counsellors?.map((booking, index) => (
                    <tr key={index} className="hover:bg-gray-100 text-gray-700">
                      <td className="p-2 border">
                        {booking?.counsellor_name || "N/A"}
                      </td>
                      <td className="p-2 border">{booking?.title || "N/A"}</td>
                      <td className="p-2 border">
                        {booking?.start
                          ? new Date(booking?.start).toLocaleString()
                          : "N/A"}
                      </td>
                      <td className="p-2 border">{booking?.status || "N/A"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-600">No counselor bookings available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentsProfile;
