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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative animate-fadeIn">
        {/* Header */}
        <div className="bg-slate-50 px-8 py-6 border-b border-slate-200 flex justify-between items-center">
             <h2 className="text-xl font-bold text-slate-800">Edit Course</h2>
             <button 
                onClick={() => navigate(-1)}
                className="text-slate-400 hover:text-rose-500 transition-colors"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
        <form
          id="EditCourseForm"
          onSubmit={handleSubmit(onSubmitCourse)}
          className="p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Course Selection */}
            <div className="flex flex-col">
               <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 ml-0.5">Select Course</label>
               <select
                {...register("course_id")}
                className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-slate-700 text-sm appearance-none"
              >
                <option value="">Select Course</option>
                {courseOptions}
              </select>
              {errors.course_id && (
                <span className="text-rose-500 text-xs mt-1">
                  {errors.course_id.message}
                </span>
              )}
            </div>
            <div className="flex flex-col">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 ml-0.5">Specialization</label>
                <input
                    id="title"
                    type="text"
                    {...register("title")}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-slate-700 text-sm"
                    placeholder="Specialization"
                />
                <p className="text-rose-500 text-xs mt-1">{errors.title?.message}</p>
            </div>
            <div className="flex flex-col">
                 <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 ml-0.5">Duration</label>
                 <input
                    id="course_duration"
                    type="text"
                    {...register("course_duration")}
                     className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-slate-700 text-sm"
                    placeholder="Duration"
                />
                 <p className="text-rose-500 text-xs mt-1">{errors.course_duration?.message}</p>
            </div>
            <div className="flex flex-col">
                 <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 ml-0.5">Course Fee</label>
                 <input
                    id="course_fee"
                    type="text"
                    {...register("course_fee")}
                     className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-slate-700 text-sm"
                    placeholder="Course Fee"
                />
                 <p className="text-rose-500 text-xs mt-1">{errors.course_fee?.message}</p>
            </div>
            <div className="flex flex-col">
                 <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 ml-0.5">Stream</label>
                 <input
                    id="streem"
                    type="text"
                    {...register("streem")}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-slate-700 text-sm"
                    placeholder="Stream"
                />
                 <p className="text-rose-500 text-xs mt-1">{errors.streem?.message}</p>
            </div>
            <div className="flex flex-col md:col-span-2">
                 <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 ml-0.5">Programs Offered By</label>
                 <input
                    id="program_offered_by"
                    type="text"
                    {...register("program_offered_by")}
                     className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-slate-700 text-sm"
                    placeholder="Programs Offered By"
                />
                 <p className="text-rose-500 text-xs mt-1">{errors.program_offered_by?.message}</p>
            </div>
            {/* Textareas */}
            <div className="flex flex-col md:col-span-2">
               <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 ml-0.5">Courses & Fees</label>
              <textarea
                {...register("courses_and_fees")}
                className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-slate-700 text-sm min-h-[80px]"
                rows="3"
                placeholder="Enter Courses & Fees details..."
              />
              {errors.courses_and_fees && (
                <span className="text-rose-500 text-xs mt-1">
                  {errors.courses_and_fees.message}
                </span>
              )}
            </div>
            <div className="flex flex-col md:col-span-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 ml-0.5">Eligibility Criteria</label>
              <textarea
                {...register("eligibility")}
                className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-slate-700 text-sm min-h-[80px]"
                rows="3"
                placeholder="Explain Eligibility Criteria..."
              />
              {errors.eligibility && (
                <span className="text-rose-500 text-xs mt-1">
                  {errors.eligibility.message}
                </span>
              )}
            </div>
            <div className="flex flex-col md:col-span-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 ml-0.5">Highlights</label>
              <textarea
                {...register("highlights")}
                className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-slate-700 text-sm min-h-[80px]"
                rows="3"
                placeholder="Enter Highlights..."
              />
              {errors.highlights && (
                <span className="text-rose-500 text-xs mt-1">
                  {errors.highlights.message}
                </span>
              )}
            </div>
            {/* Submit Button */}
            <div className="md:col-span-2 flex justify-end pt-4 border-t border-slate-100">
               <button
                  onClick={() => navigate(-1)}
                   type="button"
                  className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-all mr-3 text-sm"
              >
                  Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-all shadow-md active:scale-95 text-sm"
              >
                Update Course
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  );
};

export default EditCourse;
