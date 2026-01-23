import React, { useEffect, useState } from "react";
import Input from "../../components/commonComponents/Input";
import Header from "../../components/Header";
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
import { FaBookOpen, FaPlusCircle, FaMoneyBillWave, FaClock, FaGraduationCap } from "react-icons/fa";

// Validation schema for the course form
const courseValidationSchema = yup.object().shape({
  course_id: yup.string().required("Course Name is required"),
  title: yup.string().required("Title is required"),
  course_duration: yup.string().required("Duration is required"),
  course_fee: yup.string().required("Course Fee is required"),
  courses_and_fees: yup.string().required("Courses & fees details are required"),
  eligibility: yup.string().required("Eligibility criteria is required"),
  highlights: yup.string().required("Course highlights are required"),
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
    formState: { errors, isSubmitting },
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
    },
  });

  const onSubmitCourse = async (data) => {
    try {
      if (!college_id) {
        toast.error("College ID not found. Please login again.");
        return;
      }
      
      const courseData = {
        college_id: college_id,
        course_id: data.course_id.toString(),
        title: data.title.trim(),
        course_duration: data.course_duration.trim(),
        course_fee: data.course_fee.toString(),
        streem: data.streem.toString(),
        program_offered_by: data.program_offered_by.toString(),
        courses_and_fees: data.courses_and_fees.trim(),
        eligibility: data.eligibility.trim(),
        highlights: data.highlights.trim(),
      };

      await dispatch(postCourse(courseData)).unwrap();
      toast.success("Course added successfully!");
      reset();
    } catch (error) {
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
    <div className="min-h-screen p-6 font-poppins">
      <ToastContainer />
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <Header title="Manage Courses" Icon={FaBookOpen} description="Add new courses to your university curriculum." />

        {/* Form Container */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">
            <form onSubmit={handleSubmit(onSubmitCourse)} className="space-y-6">
                
                <h2 className="text-base font-bold text-slate-800 border-b border-slate-50 pb-3 mb-5 flex items-center gap-2">
                    <span className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg"><FaBookOpen size={14}/></span>
                    Course Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Course Selection */}
                    <div className="flex flex-col">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 ml-0.5">Select Course <span className="text-rose-500">*</span></label>
                        <select
                            {...register("course_id")}
                            className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-slate-700 text-sm appearance-none"
                        >
                            <option value="">-- Choose a Course --</option>
                            {CourseNameLists?.map((course) => (
                            <option key={course.id} value={course.id}>
                                {course.title}
                            </option>
                            ))}
                        </select>
                        <ErrorMessage error={errors.course_id} />
                    </div>

                    {/* Specialization */}
                    <div className="flex flex-col">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 ml-0.5">Specialization Title <span className="text-rose-500">*</span></label>
                        <input
                            type="text"
                            placeholder="e.g. Computer Science"
                            {...register("title")}
                            className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-slate-700 text-sm"
                        />
                         <ErrorMessage error={errors.title} />
                    </div>

                    {/* Duration */}
                    <div className="flex flex-col">
                         <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 ml-0.5">Duration <span className="text-rose-500">*</span></label>
                         <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs"><FaClock /></span>
                            <input
                                type="text"
                                placeholder="e.g. 4 Years"
                                {...register("course_duration")}
                                className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-slate-700 text-sm"
                            />
                         </div>
                         <ErrorMessage error={errors.course_duration} />
                    </div>

                    {/* Fees */}
                    <div className="flex flex-col">
                         <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 ml-0.5">Course Fee <span className="text-rose-500">*</span></label>
                         <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs"><FaMoneyBillWave /></span>
                            <input
                                type="text"
                                placeholder="e.g. 50000"
                                {...register("course_fee")}
                                className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-slate-700 text-sm"
                            />
                         </div>
                         <ErrorMessage error={errors.course_fee} />
                    </div>

                     {/* Stream */}
                     <div className="flex flex-col">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 ml-0.5">Stream</label>
                        <input
                            type="text"
                            placeholder="e.g. Engineering"
                            {...register("streem")}
                            className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-slate-700 text-sm"
                        />
                         <ErrorMessage error={errors.streem} />
                    </div>

                    {/* Program By */}
                    <div className="flex flex-col">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 ml-0.5">Program Offered By</label>
                        <input
                            type="text"
                            placeholder="University Name"
                            {...register("program_offered_by")}
                            className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-slate-700 text-sm"
                        />
                         <ErrorMessage error={errors.program_offered_by} />
                    </div>
                </div>
                
                <h2 className="text-base font-bold text-slate-800 border-b border-slate-50 pb-3 mb-5 mt-6 flex items-center gap-2">
                    <span className="p-1 bg-emerald-50 text-emerald-600 rounded-lg"><FaGraduationCap size={14}/></span>
                    Detailed Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Courses & Fees */}
                    <div className="md:col-span-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 ml-0.5 block">About Courses & Fees <span className="text-rose-500">*</span></label>
                        <textarea
                            {...register("courses_and_fees")}
                            rows="3"
                            placeholder=" detailed breakdown of the course structure and fee components..."
                            className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-slate-700 text-sm resize-y min-h-[80px]"
                        />
                        <ErrorMessage error={errors.courses_and_fees} />
                    </div>

                    {/* Eligibility */}
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 ml-0.5 block">Eligibility Criteria <span className="text-rose-500">*</span></label>
                        <textarea
                            {...register("eligibility")}
                            rows="3"
                            placeholder="Minimum marks, required subjects, etc..."
                            className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-slate-700 text-sm resize-y min-h-[80px]"
                        />
                        <ErrorMessage error={errors.eligibility} />
                    </div>

                    {/* Highlights */}
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 ml-0.5 block">Course Highlights <span className="text-rose-500">*</span></label>
                        <textarea
                            {...register("highlights")}
                            rows="3"
                            placeholder="Unique features, placements, labs, etc..."
                            className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-slate-700 text-sm resize-y min-h-[80px]"
                        />
                        <ErrorMessage error={errors.highlights} />
                    </div>
                </div>

                <div className="pt-5 border-t border-slate-100">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full md:w-auto md:min-w-[180px] bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-6 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mx-auto text-sm"
                    >
                        {isSubmitting ? (
                            <>
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                Saving...
                            </>
                        ) : (
                            <>
                                <FaPlusCircle className="text-lg" />
                                Save Course
                            </>
                        )}
                    </button>
                </div>

            </form>
        </div>
      </div>
    </div>
  );
};

const ErrorMessage = ({ error }) => {
    if (!error) return null;
    return <p className="text-rose-500 text-xs mt-1 font-medium">{error.message}</p>;
};

export default AddCourse;
