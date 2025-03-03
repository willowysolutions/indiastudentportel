import React, { useState } from "react";
import Input from "../../components/commonComponents/CollegeEditInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import { UpdateCollege } from "../../Redux/features/University/UniversitySlice";
import Button2 from "../../components/Button2";

const EditModal = ({ onClose, college }) => {
  const dispatch = useDispatch();

  // Validation schema for college form
  const collegeValidationSchema = yup.object().shape({
    college: yup.string(),
    mobile: yup
      .string(),
      // .matches( "Mobile must be 10 digits"),
      // /^[0-9]{10}$/
    address: yup.string(),
    affliation: yup.string(),
    email: yup.string().email("Invalid email"),
    pin: yup.string(),
    street: yup.string(),
    state: yup.string(),
  });

   // Validation schema for course form
   const courseValidationSchema = yup.object().shape({
    course_name: yup.string().required('Course Name is required'),
    course_duration: yup.string().required('Duration is required'),
    course_fee: yup.string().required('Course Fee is required'),
  });

   // Course form state and methods
   const {
    register: registerCourse,
    handleSubmit: handleSubmitCourse,
    formState: { errors: courseErrors },
    reset: resetCourse,
  } = useForm({
    resolver: yupResolver(courseValidationSchema) // Use yupResolver for course form
  });


console.log(college,'cooolllaaaggege');
const editingCollege=college
// const editingCollege = useSelector((state) => state.collegeData);
// console.log(editingCollege,'MODAL');

// console.log(editingCollege,'eeeee');
  // Form state and methods
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(collegeValidationSchema),
    defaultValues: {
      name:editingCollege?.name || "", // Check if college.college exists
      contact: editingCollege?.contact || "",
      address: editingCollege?.address || "",
      affliation:editingCollege?.affliation || "",
      email: editingCollege?.email || "",
      pin_code: editingCollege?.pin_code || "",
      street: editingCollege?.street || "",
      state:editingCollege?.state || "",
      university_id:editingCollege.university_id
      
    }
  });

  const [courses,setCourses]=useState([])

  const [isVisibleCourseForm, setIsVisibleCourseForm] = useState(false);

  // Function to toggle the visibility
  const toggleVisibility = () => {
    setIsVisibleCourseForm(!isVisibleCourseForm);
  };

  const onSubmitCourse = (data) => {
    setCourses([...courses, data]);
    resetCourse();
  };


  const handleUpdate = (data) => {
    console.log(data,'gggggg');
    // Dispatch editCollege action with updated data and college ID
    data.courses = courses;
    dispatch(UpdateCollege({id:college.id,data:data}));

    console.log(data,'daata');
    onClose(); // Close the modal
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 bg-black/70">
      <div className="bg-white border p-5 flex-row md:py-20 py-10 b-slate-700 g-white relative">
        <form id="editCollegeForm" className="flex flex-col" onSubmit={handleSubmit(handleUpdate)}>
          <div className=" flex md:gap-14 lg:gap-2 b-yellow-300 flex-col">
            <div className="flex flex-row gap-10">
              <Input
                type="text"
                id="name"
                label="College Name"
                register={register}
                errors={errors}
              />
              <Input
                type="text"
                id="contact"
                label="Mobile"
                register={register}
                errors={errors}
              />
              <Input
                type="text"
                id="address"
                label="Address"
                register={register}
                errors={errors}
              />
            </div>
            <div className="flex flex-row gap-10">
              <Input
                type="text"
                id="affliation"
                label="Affiliation"
                register={register}
                errors={errors}
              />
              <Input
                type="email"
                id="email"
                label="Email"
                register={register}
                errors={errors}
              />
              <Input
                type="text"
                id="pin_code"
                label="Pin code"
                register={register}
                errors={errors}
              />
            </div>
            <div className="flex flex-row gap-10">
              <Input
                type="text"
                id="street"
                label="Street"
                register={register}
                errors={errors}
              />
              <Input
                type="text"
                id="state"
                label="State"
                register={register}
                errors={errors}
              />
            </div>
          </div>
          <div className="py-4 flex flex-col gap-4">
            <div className="flex flex-col b-slate-600 gap-4">
             
              <div className="flex w-fu b-red-400 gap-10 lg:pr-40">
                <button
                  className="flex gap-2 items-center rounded-3xl px-6 py-1 overflow-hidden group bg-[F5F5FA] bottom-[300px] hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-400 text-violet-400 text-[.8rem] font-bold shadow-lg shadow-gray-400 transition-all ease-out duration-300"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
         </form>
         <div className="flex w-fu b-red-400 gap-10 lg:pr-40">
                {/* <button onClick={toggleVisibility}
                  className="flex gap-2 items-center rounded-3xl px-6 py-1 overflow-hidden group bg-[F5F5FA] bottom-[300px] hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-400 text-violet-400 text-[.8rem] font-bold shadow-lg shadow-gray-400 transition-all ease-out duration-300"
                >
                  Add More colleges
                </button> */}
              </div>
              {isVisibleCourseForm && (
       <form
          onSubmit={handleSubmitCourse(onSubmitCourse)}
          className="w-full max-w-3xl mx-auto  mt-8"
        >
          <div className="flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4">
              <Input
                type={"text"}
                id={"course_name"}
                label={"Course"}
                register={registerCourse}
                errors={courseErrors}
              />
            </div>
            <div className="w-full md:w-1/2 px-4">
              <Input
                type={"text"}
                id={"course_duration"}
                label={"Duration"}
                register={registerCourse}
                errors={courseErrors}
              />
            </div>
            <div className="w-full md:w-1/2 px-4">
              <Input
                type={"text"}
                id={"course_fee"}
                label={"Course Fee"}
                register={registerCourse}
                errors={courseErrors}
              />
            </div>
            <div className="w-full px-4 mt-4">
              <button
                type="submit"
                  className="flex gap-2 items-center rounded-3xl px-6 py-1 overflow-hidden group bg-[F5F5FA] bottom-[300px] hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-400 text-violet-400 text-[.8rem] font-bold shadow-lg shadow-gray-400 transition-all ease-out duration-300"
              >
                Add Course
              </button>
            </div>
          </div>
        </form>
              )}
        <div className="absolute top-2 right-2" onClick={onClose}>
          <button>
            <IoClose size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;