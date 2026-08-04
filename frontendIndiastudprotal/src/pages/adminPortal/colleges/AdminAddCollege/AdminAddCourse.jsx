import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCourseName } from "../../../../Redux/features/University/UniversitySlice";
import { postAdminCourse } from "../../../../Redux/features/admin/AdminSlice";
import { FaBookOpen, FaPlusCircle, FaClock, FaMoneyBillWave, FaUniversity, FaArrowLeft, FaInfoCircle } from "react-icons/fa";

// Validation schema for the course form
const courseValidationSchema = yup.object().shape({
  course_id: yup.string().required("Course Name is required"),
  title: yup.string().required("Title is required"),
  course_duration: yup.string().required("Duration is required"),
  course_fee: yup.string().required("Course Fee is required"),
  streem: yup.string().required("Stream is required"),
  program_offered_by: yup.string().required("Programs Offered by is required"),
  courses_and_fees: yup.string().required("Courses & Fees are required"),
  eligibility: yup.string().required("Eligibility is required"),
  highlights: yup.string().required("Highlights are required"),
});

const AdminAddCourse = () => {
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { collegeId } = location.state || {};

  const CourseNameLists = useSelector((state) => state?.university?.courseName);
  
  useEffect(() => {
    if (!collegeId) {
    //   console.error("College ID is not defined");
      toast.error("No college selected. Redirecting...");
      setTimeout(() => navigate(-1), 2000);
    }
  }, [collegeId, navigate]);

  // Fetch course names on mount
  useEffect(() => {
    if (!CourseNameLists) {
      dispatch(getCourseName())
        .unwrap()
        .then(() => setIsLoading(false))
        .catch(() => toast.error("Failed to fetch course names."));
    } else {
      setIsLoading(false);
    }
  }, [CourseNameLists, dispatch]);

  // Form state and methods
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

  // Form submission handler
  const onSubmitCourse = async (data) => {
    if (!collegeId) {
      toast.error("College ID not found. Please login again.");
      return;
    }

    const courseData = {
      ...data,
      college_id: collegeId.id,
    };
    
    try {
      await dispatch(postAdminCourse(courseData)).unwrap();
      toast.success("Course added successfully!");
      reset();
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        "Error adding course. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen p-6 font-poppins">
      <ToastContainer />
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl overflow-hidden relative">
             <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-teal-600 to-cyan-600 opacity-90"></div>
             <div className="relative z-10 p-8 text-white">
                 <button 
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-4 text-sm font-medium"
                 >
                    <FaArrowLeft /> Back
                 </button>
                 <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-bold flex items-center gap-3">
                            <FaBookOpen className="text-teal-200" />
                            Add Course to College
                        </h1>
                        <p className="text-teal-100 mt-2 text-lg">
                            {collegeId?.name ? `Adding course for ${collegeId.name}` : "Expand the curriculum by adding new courses."}
                        </p>
                    </div>
                    <div className="hidden md:block">
                        <FaUniversity className="text-8xl text-white/20" />
                    </div>
                 </div>
             </div>
        </div>

        {/* Form Container */}
        <div className="bg-white/90 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl p-8 md:p-10">
            <form onSubmit={handleSubmit(onSubmitCourse)} className="space-y-8">
                
                <h2 className="text-xl font-bold text-slate-800 border-b border-slate-200 pb-4 mb-6">
                    Course Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Course Selection */}
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-slate-700 mb-2">Select Course <span className="text-rose-500">*</span></label>
                        <select
                            {...register("course_id")}
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none transition-all text-slate-700 appearance-none"
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
                        <label className="text-sm font-semibold text-slate-700 mb-2">Specialization Title <span className="text-rose-500">*</span></label>
                        <input
                            type="text"
                            placeholder="e.g. Computer Science"
                            {...register("title")}
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none transition-all text-slate-700"
                        />
                         <ErrorMessage error={errors.title} />
                    </div>

                    {/* Duration */}
                    <div className="flex flex-col">
                         <label className="text-sm font-semibold text-slate-700 mb-2">Duration <span className="text-rose-500">*</span></label>
                         <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"><FaClock /></span>
                            <input
                                type="text"
                                placeholder="e.g. 4 Years"
                                {...register("course_duration")}
                                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none transition-all text-slate-700"
                            />
                         </div>
                         <ErrorMessage error={errors.course_duration} />
                    </div>

                    {/* Fees */}
                    <div className="flex flex-col">
                         <label className="text-sm font-semibold text-slate-700 mb-2">Course Fee <span className="text-rose-500">*</span></label>
                         <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"><FaMoneyBillWave /></span>
                            <input
                                type="text"
                                placeholder="e.g. 50000"
                                {...register("course_fee")}
                                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none transition-all text-slate-700"
                            />
                         </div>
                         <ErrorMessage error={errors.course_fee} />
                    </div>

                     {/* Stream */}
                     <div className="flex flex-col">
                        <label className="text-sm font-semibold text-slate-700 mb-2">Stream <span className="text-rose-500">*</span></label>
                        <input
                            type="text"
                            placeholder="e.g. Engineering"
                            {...register("streem")}
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none transition-all text-slate-700"
                        />
                         <ErrorMessage error={errors.streem} />
                    </div>

                    {/* Program By */}
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-slate-700 mb-2">Program Offered By <span className="text-rose-500">*</span></label>
                        <input
                            type="text"
                            placeholder="University Name"
                            {...register("program_offered_by")}
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none transition-all text-slate-700"
                        />
                         <ErrorMessage error={errors.program_offered_by} />
                    </div>
                </div>
                
                <h2 className="text-xl font-bold text-slate-800 border-b border-slate-200 pb-4 mb-6 mt-8 flex items-center gap-2">
                    <FaInfoCircle className="text-teal-500" /> Detailed Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Courses & Fees */}
                    <div className="md:col-span-2">
                        <label className="text-sm font-semibold text-slate-700 mb-2 block">About Courses & Fees <span className="text-rose-500">*</span></label>
                        <textarea
                            {...register("courses_and_fees")}
                            rows="4"
                            placeholder="Detailed breakdown of the course structure and fee components..."
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none transition-all text-slate-700 resize-y min-h-[100px]"
                        />
                        <ErrorMessage error={errors.courses_and_fees} />
                    </div>

                    {/* Eligibility */}
                    <div>
                        <label className="text-sm font-semibold text-slate-700 mb-2 block">Eligibility Criteria <span className="text-rose-500">*</span></label>
                        <textarea
                            {...register("eligibility")}
                            rows="4"
                            placeholder="Minimum marks, required subjects, etc..."
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none transition-all text-slate-700 resize-y min-h-[100px]"
                        />
                        <ErrorMessage error={errors.eligibility} />
                    </div>

                    {/* Highlights */}
                    <div>
                        <label className="text-sm font-semibold text-slate-700 mb-2 block">Course Highlights <span className="text-rose-500">*</span></label>
                        <textarea
                            {...register("highlights")}
                            rows="4"
                            placeholder="Unique features, placements, labs, etc..."
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none transition-all text-slate-700 resize-y min-h-[100px]"
                        />
                        <ErrorMessage error={errors.highlights} />
                    </div>
                </div>

                <div className="pt-6 border-t border-slate-100">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full md:w-auto md:min-w-[200px] bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mx-auto"
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
    return <span className="text-rose-500 text-xs mt-1 font-medium block">{error.message}</span>;
};

export default AdminAddCourse;
