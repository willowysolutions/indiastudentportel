import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { IoClose } from "react-icons/io5";
import { editCourse } from "../../Redux/features/University/UniversitySlice";

const EditCourseModal = ({ onClose, course }) => {
  const dispatch = useDispatch();
  
  // Validation schema for course form
  const courseValidationSchema = yup.object().shape({
    course_name: yup.string().required("Course Name is required"),
    course_duration: yup.string().required("Duration is required"),
    course_fee: yup.string().required("Course Fee is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(courseValidationSchema),
    defaultValues: {
      course_name: course?.course_name || "",
      course_duration: course?.course_duration || "",
      course_fee: course?.course_fee || "",
    },
    enableReinitialize: true,
  });


  const handleUpdate = async (data) => {
    const response = await dispatch(editCourse({ id:course.college_id, data:data }));
    if (response) {
      onClose();
      reset();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-y-auto font-poppins relative animate-fadeIn">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-5 flex justify-between items-center text-white">
            <h2 className="text-xl font-bold">Edit Course</h2>
            <button 
                onClick={onClose}
                className="text-white/80 hover:text-white hover:bg-white/20 rounded-full p-2 transition-all"
            >
                <IoClose size={24} />
            </button>
        </div>

        <div className="p-8">
            <form onSubmit={handleSubmit(handleUpdate)} className="space-y-6">
                
                <div className="space-y-5">
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-slate-700 mb-2">Course Name</label>
                        <input
                            type="text"
                            {...register("course_name")}
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-slate-700"
                        />
                         <p className="text-rose-500 text-xs mt-1">{errors.course_name?.message}</p>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-slate-700 mb-2">Duration</label>
                        <input
                            type="text"
                            {...register("course_duration")}
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-slate-700"
                        />
                         <p className="text-rose-500 text-xs mt-1">{errors.course_duration?.message}</p>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-slate-700 mb-2">Course Fee</label>
                        <input
                            type="text"
                            {...register("course_fee")}
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-slate-700"
                        />
                         <p className="text-rose-500 text-xs mt-1">{errors.course_fee?.message}</p>
                    </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-8 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:scale-[1.02] active:scale-95 transition-all"
                    >
                        Update
                    </button>
                </div>

            </form>
        </div>
      </div>
    </div>
  );
};

export default EditCourseModal;
