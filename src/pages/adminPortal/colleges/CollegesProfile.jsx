import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";

const CollegeProfile = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  const data = useSelector((state) => state?.admin?.CollegeProfile?.college);
  console.log(data, "dataa");

  const handleEditCollege = () => {
    navigate(`/admin/colleges/editCollege/${data.id}`, {
      state: { college: data },
    });
  };
  const handleEditCourse = (course) => {
    navigate(`/admin/colleges/editCourse/${course.id}`, {
      state: { course, college: data },
    });
  };
  useEffect(() => {
    if (data) {
      setIsLoading(false);
    } else {
      console.error("No data available for the selected college.");
      setIsLoading(false);
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return (
      <div className="text-center mt-5 text-lg text-gray-500">
        No details available for the selected college.
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        {data?.created_by === "0" && (
          <Button onClick={handleEditCollege}>Edit College</Button>
        )}
      </div>
      {/* College Details */}
      <div className="bg-blue-50 p-6 rounded-lg shadow-md flex flex-col lg:flex-row items-start lg:items-center lg:justify-between">
        <div className="lg:w-3/5 space-y-4">
          <h2 className="text-3xl font-bold text-blue-700">{data?.name}</h2>{" "}
          <p className="text-gray-700">{data?.address}</p>
          <p className="text-gray-600">
            <strong>Location: </strong> {data?.location || "N/A"}
          </p>
          <p className="text-gray-600">
            <strong>Email: </strong> {data?.email || "N/A"}
          </p>
          <p className="text-gray-600">
            <strong>Contact: </strong> {data?.contact || "N/A"}
          </p>
          <p className="text-gray-600">
            <strong>State: </strong> {data?.state?.state || "N/A"}
          </p>
          <p className="text-gray-600">
            <strong>Established Year: </strong>{" "}
            {data?.established_year || "N/A"}
          </p>
          <p className="text-gray-600">
            <strong>NAAC Grade: </strong> {data?.naac_grade || "N/A"}
          </p>
          <p className="text-gray-600">
            <strong>NIRF Ranking: </strong> {data?.nirf_ranking || "N/A"}
          </p>
        </div>

        <div className="lg:w-2/5 flex justify-center">
          <img
            src={data?.image}
            alt={`${data?.name}`}
            className="w-full max-w-xs rounded-lg shadow-md"
          />
        </div>
      </div>

      {/* Courses Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold text-blue-700 mb-4">Courses</h3>
        {data?.courses?.length > 0 ? (
          <div className="overflow-auto max-h-[60vh]">
            <table className="min-w-full bg-white border-collapse">
              <thead className="bg-blue-100 text-left text-gray-700">
                <tr>
                  <th className="border p-2">Course Name</th>
                  <th className="border p-2">Duration</th>
                  <th className="border p-2">Fee</th>
                  <th className="border p-2">Eligibility</th>
                  <th className="border p-2">Program Offered By</th>
                  {data?.created_by === "0" && (
                    <th className="border p-2">Edit</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {data?.courses?.map((course, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="border p-2">{course?.title || "N/A"}</td>
                    <td className="border p-2">
                      {course?.course_duration || "N/A"}
                    </td>
                    <td className="border p-2">
                      {course?.course_fee || "N/A"}
                    </td>
                    <td className="border p-2">
                      {course?.eligibility || "N/A"}
                    </td>
                    <td className="border p-2">
                      {course?.program_offered_by || "N/A"}
                    </td>
                    {data?.created_by === "0" && (
                      <td className="border p-2">
                        <Button onClick={() => handleEditCourse(course)}>
                          Edit
                        </Button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600">
            No courses available for this college.
          </p>
        )}
      </div>
    </div>
  );
};

export default CollegeProfile;
