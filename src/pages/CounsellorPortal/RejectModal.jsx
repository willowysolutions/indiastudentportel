import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import { editCourse } from "../../Redux/features/University/UniversitySlice";
import { rejectSlote } from "../../Redux/features/Counciler/CouncilerSlice";

const RejectModal = ({ onClose,bookingId}) => {

  const dispatch = useDispatch();
  const councilerid = useSelector((state)=> state?.councilerAuth?.counsillor?.id)


  const handleRejection=()=>{
    dispatch(rejectSlote({ councilerid: councilerid, id:bookingId }))


}
console.log(bookingId,"rejected bookingId");
console.log(councilerid,"rejected councilerid");

  // Validation schema for course form
  const courseValidationSchema = yup.object().shape({
    name: yup.string().required("Course Name is required"),
    duration: yup.string().required("Duration is required"),
    courseFee: yup.string().required("Course Fee is required"),
  });

 
  return (
    <div className="fixed top-0 left-0 w-full p-4 h-full flex justify-center items-center z-50 bg-black/70">
      <div className="bg-gray-100 border  px-5  flex flex-col items-center shadow-inner-black-25 w-full md:w-[50%] lg:w-[30%] justify-center gap-6 hadow-inner-black-25 h-32 rounded-md  md:py-20 py-10 b-slate-700 g-white relative">
        <p className="text-xl font-semibold"></p>
        <p className="text-red-500">Are you sure to reject this booking</p>
        <input type='text' className="ring rounded-md p-2" placeholder="Enter your reason"></input>
        <button className="bg-zinc-600 px-2 py- rounded-2xl text-purple-400" onClick={handleRejection}>Reject</button>
        <div className="absolute top-2 right-2" onClick={onClose}>
          <button>
            <IoClose size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RejectModal;
