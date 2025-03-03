import { toast, ToastContainer } from "react-toastify";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { submitRecommendation } from "../../Redux/features/Counciler/CouncilerSlice";
import Header from "../../components/Header";
import { FaUniversity } from "react-icons/fa";

const RecommendCollegeProfile = () => {
  
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);

  const data = useSelector(
    (state) => state.counciler.CounsellorSingleCollage.college
  );
  const studentDetails = useSelector(
    (state) => state.counciler?.SloteProfile?.booking
  );

  const handleAssign = async (course) => {
    try {
      await dispatch(
        submitRecommendation({
          studentId: studentDetails.student_id,
          courseData: {
            college_id: course.college_id,
            course_id: course.id,
          },
        })
      );
      toast.success("Course recommended successfully!");
    } catch (error) {
      console.error("Error recommending course:", error);
      toast.error("Failed to recommend course");
    }
  };

  useEffect(() => {
    console.log("Data in Redux:", data);
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
    <div className="bg-[#F5F7F8] h-auto rounded-2xl w-full">
      <ToastContainer />
      <Header title={data?.university_name} Icon={FaUniversity} />
      {/* Courses Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        {data?.courses?.length > 0 ? (
          <div className="overflow-auto max-h-[60vh]">
            <table className="min-w-full bg-white border-collapse">
              <thead className="bg-blue-100 text-left text-gray-700">
                <tr>
                  <th className="border p-2">Course Name</th>
                  <th className="border p-2">Duration</th>
                  <th className="border p-2">Fee</th>
                  <th className="border p-2">Program Offered By</th>
                  <th className="border p-2">Recommend Course</th>
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
                      {course?.program_offered_by || "N/A"}
                    </td>
                    <td className="border p-2">
                      <button
                        onClick={() => handleAssign(course)}
                        className="m-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out"
                      >
                        Recommend
                      </button>{" "}
                    </td>
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

export default RecommendCollegeProfile;
