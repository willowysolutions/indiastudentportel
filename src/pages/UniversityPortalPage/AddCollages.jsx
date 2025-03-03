import React, { useEffect, useState } from "react";
import Input from "../../components/commonComponents/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getCourseName,
  postCourse,
} from "../../Redux/features/University/UniversitySlice";
// Validation schema for the course form
const courseValidationSchema = yup.object().shape({
  course_id: yup.string().required("Course Name is required"),
  title: yup.string().required("Title is required"),
  course_duration: yup.string().required("Duration is required"),
  course_fee: yup.string().required("Course Fee is required"),
  courses_and_fees: yup.string().required("courses & fees are required"),
  eligibility: yup.string().required("eligibility are required"),
  highlights: yup.string().required("college info are required"),
});

const AddCourse = () => {
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  const college_id = useSelector(
    (state) => state?.universityAuth?.university.id
  );
  const CourseNameLists = useSelector((state) => state?.university?.courseName);

  useEffect(() => {
    dispatch(getCourseName());
  }, [dispatch]);

  useEffect(() => {
    if (CourseNameLists) {
      setIsLoading(false);
    }
  }, [CourseNameLists]);

  // Course form state and methods
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(courseValidationSchema),
    defaultValues: {
      course_id: "",
      title: "",
      course_duration: "",
      course_fee: "",
      streem: "",
      program_offered_by: "",
      courses_and_fees: "",
      eligibility: "",
      highlights: "",
      // college_info: "",
      // details: "",
    },
  });

  const onSubmitCourse = async (data) => {
    try {
      // Ensure college_id exists before submitting
      if (!college_id) {
        toast.error("College ID not found. Please login again.");
        return;
      }
      // Format the data properly
      const courseData = {
        college_id: college_id,
        course_id: data.course_id.toString(), // Convert to string if needed
        title: data.title.trim(),
        course_duration: data.course_duration.trim(),
        course_fee: data.course_fee.toString(), // Convert to string if needed
        streem: data.streem.toString(), // Convert to string if needed
        program_offered_by: data.program_offered_by.toString(), // Convert to string if needed
        courses_and_fees: data.courses_and_fees.trim(),
        eligibility: data.eligibility.trim(),
        highlights: data.highlights.trim(),
      };

      // Dispatch and wait for the result
      const result = await dispatch(postCourse(courseData)).unwrap();
      // If successful, show success message and reset form
      toast.success("Course added successfully!");
      reset();
    } catch (error) {
      // Handle specific error cases
      if (error.response?.status === 400) {
        toast.error("Invalid data. Please check your inputs.");
      } else if (error.response?.status === 401) {
        toast.error("Unauthorized. Please login again.");
      } else {
        toast.error(error?.message || "Error adding course. Please try again.");
      }
      console.error("Error submitting course:", error);
    }
  };

  return (
    <div>
      <div className="flex-row md:py-20 py-10 bg-gray-10 bg-white">
        <form
          id="AddCourseForm"
          onSubmit={handleSubmit(onSubmitCourse)}
          className="w-full max-w-3xl mx-auto px-4"
        >
          <div className="flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4">
              <select
                {...register("course_id")}
                className="w-full px-3 py-2 border border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Course</option>
                {CourseNameLists?.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.title}
                  </option>
                ))}
              </select>
              {errors.course_id && (
                <span className="text-red-500 text-xs">
                  {errors.course_id.message}
                </span>
              )}
            </div>
            <div className="w-full md:w-1/2 px-4">
              <Input
                type="text"
                id="title"
                label="Specialization"
                register={register}
                errors={errors}
              />
            </div>
            <div className="w-full md:w-1/2 px-4">
              <Input
                type="text"
                id="course_duration"
                label="Duration"
                register={register}
                errors={errors}
              />
            </div>
            <div className="w-full md:w-1/2 px-4">
              <Input
                type="text"
                id="course_fee"
                label="Course Fee"
                register={register}
                errors={errors}
              />
            </div>{" "}
            <div className="w-full md:w-1/2 px-4">
              <Input
                type="text"
                id="streem"
                label="Stream"
                register={register}
                errors={errors}
              />
            </div>
            <div className="w-full md:w-1/2 px-4">
              <Input
                type="text"
                id="program_offered_by"
                label="Programs Offered by"
                register={register}
                errors={errors}
              />
            </div>
            <div className="w-full px-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                About Courses & Fees
              </label>
              <textarea
                {...register("courses_and_fees")}
                className="w-full px-3 py-2 border border-blue-500  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="2"
                placeholder="Enter Courses & Fees details..."
              />
              {errors.courses_and_fees && (
                <span className="text-red-500 text-xs">
                  {errors.courses_and_fees.message}
                </span>
              )}
            </div>{" "}
            <div className="w-full px-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Eligibility
              </label>
              <textarea
                {...register("eligibility")}
                className="w-full px-3 py-2 border border-blue-500  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="2"
                placeholder="Explain Eligibility Criteria..."
              />
              {errors.eligibility && (
                <span className="text-red-500 text-xs">
                  {errors.eligibility.message}
                </span>
              )}
            </div>
            <div className="w-full px-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Highlights
              </label>
              <textarea
                {...register("highlights")}
                className="w-full px-3 py-2 border border-blue-500  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="2"
                placeholder="Enter Highlights About courses..."
              />
              {errors.highlights && (
                <span className="text-red-500 text-xs">
                  {errors.highlights.message}
                </span>
              )}
            </div>{" "}
            <div className="w-full px-4 mt-4">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Save
              </button>
              <ToastContainer />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;
