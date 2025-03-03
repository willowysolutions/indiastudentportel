import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Input from "./Input";
import { UpdateAdminCourse } from "../../Redux/features/admin/AdminSlice";
import { getCourseName } from "../../Redux/features/University/UniversitySlice";

// Validation schema for the course form
const courseValidationSchema = yup.object().shape({
  course_id: yup.string().required("Course Name is required"),
  title: yup.string().required("Title is required"),
  course_duration: yup.string().required("Duration is required"),
  course_fee: yup.string().required("Course Fee is required"),
  streem: yup.string().required("Stream is required"),
  program_offered_by: yup.string().required("Programs Offered By is required"),
  courses_and_fees: yup.string().required("Courses & Fees are required"),
  eligibility: yup.string().required("Eligibility is required"),
  highlights: yup.string().required("Highlights are required"),
});

const EditCourse = () => {
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { course, college } = location.state || {};
  const CourseNameLists = useSelector((state) => state?.university?.courseName);
  console.log(course, "courseee data");
  console.log(college, "collegeee data");
  console.log(CourseNameLists, "CourseNameLists");

  // Fetch course names if not already fetched
  useEffect(() => {
    if (!CourseNameLists) {
      dispatch(getCourseName())
        .unwrap()
        .then(() => setIsLoading(false))
        .catch(() => {
          toast.error("Failed to fetch course names.");
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [CourseNameLists, dispatch]);

  // Form state and methods
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(courseValidationSchema),
    defaultValues: {
      course_id: course?.course_id || "",
      title: course?.title || "",
      course_duration: course?.course_duration || "",
      course_fee: course?.course_fee || "",
      streem: course?.streem || "",
      program_offered_by: course?.program_offered_by || "",
      courses_and_fees: course?.courses_and_fees || "",
      eligibility: course?.eligibility || "",
      highlights: course?.highlights || "",
    },
  });

  // Reset form fields after data is loaded
  useEffect(() => {
    if (course) {
      reset({
        course_id: course.course_id || "",
        title: course.title || "",
        course_duration: course.course_duration || "",
        course_fee: course.course_fee || "",
        streem: course.streem || "",
        program_offered_by: course.program_offered_by || "",
        courses_and_fees: course.courses_and_fees || "",
        eligibility: course.eligibility || "",
        highlights: course.highlights || "",
      });
    }
  }, [course, reset]);

  // Form submission handler
  const onSubmitCourse = async (data) => {
    if (!college?.id) {
      toast.error("College ID not found. Please login again.");
      return;
    }

    const courseData = {
      ...data,
      college_id: college?.id,
      // course_id: course?.course_id,
    };

    try {
      await dispatch(
        UpdateAdminCourse({ id: course?.id, data: courseData })
      ).unwrap();
      toast.success("Course updated successfully!");
      reset();
      navigate(-1);
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        "Error updating course. Please try again.";
      toast.error(errorMessage);
    }
  };
  const courseOptions = useMemo(() => {
    return CourseNameLists?.map((courseOption) => (
      <option key={courseOption.id} value={courseOption.id}>
        {courseOption.title}
      </option>
    ));
  }, [CourseNameLists]);
  return (
    <div>
      <div className="flex-row md:py-20 py-10 bg-white">
        <h2 className="text-[32px] md:text-[45px] font-bold text-center">
          Edit Course
        </h2>
        <form
          id="EditCourseForm"
          onSubmit={handleSubmit(onSubmitCourse)}
          className="w-full max-w-3xl mx-auto px-4"
        >
          <div className="flex flex-wrap -mx-4">
            {/* Course Selection */}
            <div className="w-full md:w-1/2 px-4">
              <select
                {...register("course_id")}
                className="w-full px-3 py-2 border border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Course</option>
                {courseOptions}
              </select>
              {errors.course_id && (
                <span className="text-red-500 text-xs">
                  {errors.course_id.message}
                </span>
              )}
            </div>
            <div className="w-full md:w-1/2 px-4">
              <Input
                id="title"
                placeholder="Specialization"
                register={register}
                errors={errors}
              />
            </div>
            <div className="w-full md:w-1/2 px-4">
              <Input
                id="course_duration"
                placeholder="Duration"
                register={register}
                errors={errors}
              />
            </div>
            <div className="w-full md:w-1/2 px-4">
              <Input
                id="course_fee"
                placeholder="Course Fee"
                register={register}
                errors={errors}
              />
            </div>
            <div className="w-full md:w-1/2 px-4">
              <Input
                id="streem"
                placeholder="Stream"
                register={register}
                errors={errors}
              />
            </div>
            <div className="w-full md:w-1/2 px-4">
              <Input
                id="program_offered_by"
                placeholder="Programs Offered By"
                register={register}
                errors={errors}
              />
            </div>
            {/* Textareas */}
            <div className="w-full px-4">
              <textarea
                {...register("courses_and_fees")}
                className="w-full px-3 py-2 border border-blue-500 rounded-lg"
                rows="2"
                placeholder="Enter Courses & Fees details..."
              />
              {errors.courses_and_fees && (
                <span className="text-red-500 text-xs">
                  {errors.courses_and_fees.message}
                </span>
              )}
            </div>
            <div className="w-full px-4">
              <textarea
                {...register("eligibility")}
                className="w-full px-3 py-2 border border-blue-500 rounded-lg"
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
              <textarea
                {...register("highlights")}
                className="w-full px-3 py-2 border border-blue-500 rounded-lg"
                rows="2"
                placeholder="Enter Highlights..."
              />
              {errors.highlights && (
                <span className="text-red-500 text-xs">
                  {errors.highlights.message}
                </span>
              )}
            </div>
            {/* Submit Button */}
            <div className="w-full px-4 mt-4">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCourse;
