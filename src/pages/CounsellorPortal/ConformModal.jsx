import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import { approveSlote } from "../../Redux/features/Counciler/CouncilerSlice";

const ConformModal = ({ onClose, bookingId }) => {
  const dispatch = useDispatch();
  const councilerId = useSelector((state) => state?.councilerAuth?.counsillor?.id);

  // Function to confirm the slot
  const confirmSlote = async () => {
    if (councilerId && bookingId) {
      // console.log("Dispatching approveSlote with:", { councilerId, bookingId });
      try {
        const response = await dispatch(approveSlote({ councilerid: councilerId, id: bookingId }));
        console.log("Response from server:", response);
        if (response.error) {
          console.error("Error in approving slot:", response.error);
        } else {
          console.log("Slot confirmed successfully!");
          onClose(); // Close the modal after confirming
        }
      } catch (error) {
        console.error("Error confirming slot:", error);
      }
    } else {
      console.error("CounsellorID or BookingID is missing");
    }
  };

  // Removed the undefined id console log
  // console.log(id,"bookingId was"); // This line is removed

  console.log(bookingId, "index id was"); // Added logging for bookingId
  console.log(councilerId, "CounsellorID was");
  // // Validation schema for course form
  // const courseValidationSchema = yup.object().shape({
  //   name: yup.string().required("Course Name is required"),
  //   duration: yup.string().required("Duration is required"),
  //   courseFee: yup.string().required("Course Fee is required"),
  // });

//   // Form state and methods
//   const { register, handleSubmit, formState: { errors }, reset } = useForm({
//     resolver: yupResolver(courseValidationSchema),
//     defaultValues: {
//       name: course?.name || "shaikh",
//       duration: course?.duration || "",
//       courseFee: course?.fee || "",
//     },
//     enableReinitialize:true
//   });
// console.log(course,'moadal');
//   const handleUpdate = (data) => {
//     // Dispatch editCourse action with updated data
//     dispatch(editCourse({ name: data.name, data: data }));
//     onClose(); // Close the modal
//     reset()
//   };
console.log(onClose,'onclose');
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center px-4 z-50 bg-black/70">
      <div className="bg-gray-100 border  px-5  flex flex-col items-center shadow-inner-black-25 w-full md:w-[50%] lg:w-[30%] justify-center gap-6 hadow-inner-black-25 h-32 rounded-md  md:py-20 py-10 b-slate-700 g-white relative">
        <p className="text-xl font-semibold">Thanks for your conformation</p>
        <p className="text-green-500">Pleace click the confirm </p>
        <button  className="bg-zinc-600 px-2 py- rounded-2xl text-purple-400" onClick={confirmSlote}>Confirm</button>
        <div className="absolute top-2 right-2" onClick={onClose}>
          <button>
            <IoClose size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConformModal;
