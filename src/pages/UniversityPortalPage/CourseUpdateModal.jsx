import React from "react";
import Input from "../../components/commonComponents/CollegeEditInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { IoClose } from "react-icons/io5";
import { editCourse } from "../../Redux/features/University/UniversitySlice";

const EditCourseModal = ({ onClose, course }) => {
  const dispatch = useDispatch();
console.log(course,'coooo');
  // console.log(course,'.......');
  // Validation schema for course form
  const courseValidationSchema = yup.object().shape({
    course_name: yup.string().required("Course Name is required"),
    course_duration: yup.string().required("Duration is required"),
    course_fee: yup.string().required("Course Fee is required"),
  });

  // Form state and methods
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
    console.log(data, "updatedl");

    // Dispatch editCourse action with updated data
    const response = await dispatch(editCourse({ id:course.college_id, data:data }));
    if (response) {
      onClose(); // Close the modal
      reset();
    }
  };
  console.log(onClose, "onclose");
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 bg-black/70">
      <div className="bg-white border p-5 flex- md:py-20 py-10 b-slate-700 g-white relative">
        <form
          id="editCourseForm"
          className="flex flex-col"
          onSubmit={handleSubmit(handleUpdate)}
        >
          <div className="flex flex-col gap-10">
            <Input
              type="text"
              id="course_name" // Remove the extra space before "course_name"
              label="Course Name"
              register={register}
              errors={errors}
            />
            <Input
              type="text"
              id="course_duration"
              label="Duration"
              register={register}
              errors={errors}
            />
            <Input
              type="text"
              id="course_fee"
              label="Course Fee"
              register={register}
              errors={errors}
            />
          </div>
          <div className="flex w-fu b-red-400 gap-10 lg:pr-40">
            <button
              type="submit"
              className="flex gap-2 items-center rounded-3xl px-6 py-1 overflow-hidden group bg-[F5F5FA] w-max hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-400 text-violet-400 text-[.8rem] font-bold shadow-lg shadow-gray-400 transition-all ease-out duration-300"
            >
              Update
            </button>
          </div>
        </form>
        <div className="absolute top-2 right-2" onClick={onClose}>
          <button>
            <IoClose size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCourseModal;
