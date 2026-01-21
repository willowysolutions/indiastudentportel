import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { IoClose } from "react-icons/io5";
import { UpdateCollege } from "../../Redux/features/University/UniversitySlice";
import { FaGraduationCap, FaPhone, FaMapMarkerAlt, FaEnvelope, FaUniversity } from "react-icons/fa";

const EditModal = ({ onClose, college }) => {
  const dispatch = useDispatch();

  // Validation schema for college form
  const collegeValidationSchema = yup.object().shape({
    name: yup.string().required("College name is required"),
    contact: yup.string().required("Contact number is required"),
    address: yup.string().required("Address is required"),
    affliation: yup.string().required("Affiliation is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    pin_code: yup.string().required("Pin code is required"),
    street: yup.string().required("Street is required"),
    state: yup.string().required("State is required"),
  });



   // Course form state and methods
  //  const {
  //   register: registerCourse,
  //   handleSubmit: handleSubmitCourse,
  //   formState: { errors: courseErrors },
  //   reset: resetCourse,
  // } = useForm({
  //   resolver: yupResolver(courseValidationSchema) // Use yupResolver for course form
  // });

  const editingCollege = college;

  // Form state and methods
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(collegeValidationSchema),
    defaultValues: {
      name: editingCollege?.name || "",
      contact: editingCollege?.contact || "",
      address: editingCollege?.address || "",
      affliation: editingCollege?.affliation || "",
      email: editingCollege?.email || "",
      pin_code: editingCollege?.pin_code || "",
      street: editingCollege?.street || "",
      state: editingCollege?.state || "",
      university_id: editingCollege?.university_id
    }
  });




  // const onSubmitCourse = (data) => {
  //   setCourses([...courses, data]);
  //   resetCourse();
  // };

  const handleUpdate = (data) => {
    // Dispatch editCollege action with updated data and college ID
    data.courses = [];
    dispatch(UpdateCollege({id: college.id, data: data}))
      .unwrap()
      .then(() => {
        onClose();
      })
      .catch((err) => {
        console.error("Failed to update college", err);
      });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto font-poppins relative animate-fadeIn">
        
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 flex justify-between items-center text-white">
            <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                    <FaGraduationCap className="text-2xl" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold">Edit College Details</h2>
                    <p className="text-blue-100 text-sm">Update information for {college?.name}</p>
                </div>
            </div>
            <button 
                onClick={onClose}
                className="text-white/80 hover:text-white hover:bg-white/20 rounded-full p-2 transition-all"
            >
                <IoClose size={24} />
            </button>
        </div>

        <div className="p-8">
            <form onSubmit={handleSubmit(handleUpdate)} className="space-y-8">
                
                {/* Basic Info Section */}
                <div>
                    <h3 className="text-lg font-bold text-slate-800 border-b border-slate-200 pb-3 mb-6 flex items-center gap-2">
                        <FaUniversity className="text-indigo-500" />
                        Basic Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-slate-700 mb-2">College Name <span className="text-rose-500">*</span></label>
                            <input
                                type="text"
                                {...register("name")}
                                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-slate-700 placeholder:text-slate-400"
                                placeholder="Enter college name"
                            />
                            <p className="text-rose-500 text-xs mt-1">{errors.name?.message}</p>
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-slate-700 mb-2">Affiliation <span className="text-rose-500">*</span></label>
                            <input
                                type="text"
                                {...register("affliation")}
                                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-slate-700 placeholder:text-slate-400"
                                placeholder="e.g. AICTE, UGC"
                            />
                             <p className="text-rose-500 text-xs mt-1">{errors.affliation?.message}</p>
                        </div>
                    </div>
                </div>

                {/* Contact Info Section */}
                <div>
                     <h3 className="text-lg font-bold text-slate-800 border-b border-slate-200 pb-3 mb-6 flex items-center gap-2">
                        <FaPhone className="text-indigo-500" />
                        Contact Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div className="flex flex-col">
                            <label className="text-sm font-semibold text-slate-700 mb-2">Email Address <span className="text-rose-500">*</span></label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"><FaEnvelope /></span>
                                <input
                                    type="email"
                                    {...register("email")}
                                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-slate-700 placeholder:text-slate-400"
                                    placeholder="college@example.com"
                                />
                            </div>
                             <p className="text-rose-500 text-xs mt-1">{errors.email?.message}</p>
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-slate-700 mb-2">Mobile Number <span className="text-rose-500">*</span></label>
                             <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"><FaPhone className="rotate-90" /></span>
                                <input
                                    type="text"
                                    {...register("contact")}
                                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-slate-700 placeholder:text-slate-400"
                                    placeholder="Enter contact number"
                                />
                            </div>
                             <p className="text-rose-500 text-xs mt-1">{errors.contact?.message}</p>
                        </div>
                    </div>
                </div>

                {/* Address Section */}
                <div>
                    <h3 className="text-lg font-bold text-slate-800 border-b border-slate-200 pb-3 mb-6 flex items-center gap-2">
                        <FaMapMarkerAlt className="text-indigo-500" />
                        Location
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="flex flex-col md:col-span-3">
                            <label className="text-sm font-semibold text-slate-700 mb-2">Address <span className="text-rose-500">*</span></label>
                            <textarea
                                {...register("address")}
                                rows="2"
                                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-slate-700 placeholder:text-slate-400 resize-none"
                                placeholder="Complete street address"
                            />
                             <p className="text-rose-500 text-xs mt-1">{errors.address?.message}</p>
                        </div>

                         <div className="flex flex-col">
                            <label className="text-sm font-semibold text-slate-700 mb-2">Street <span className="text-rose-500">*</span></label>
                            <input
                                type="text"
                                {...register("street")}
                                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-slate-700 placeholder:text-slate-400"
                            />
                             <p className="text-rose-500 text-xs mt-1">{errors.street?.message}</p>
                        </div>

                         <div className="flex flex-col">
                            <label className="text-sm font-semibold text-slate-700 mb-2">State <span className="text-rose-500">*</span></label>
                            <input
                                type="text"
                                {...register("state")}
                                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-slate-700 placeholder:text-slate-400"
                            />
                             <p className="text-rose-500 text-xs mt-1">{errors.state?.message}</p>
                        </div>

                         <div className="flex flex-col">
                            <label className="text-sm font-semibold text-slate-700 mb-2">Pin Code <span className="text-rose-500">*</span></label>
                            <input
                                type="text"
                                {...register("pin_code")}
                                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-slate-700 placeholder:text-slate-400"
                            />
                             <p className="text-rose-500 text-xs mt-1">{errors.pin_code?.message}</p>
                        </div>
                    </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex items-center justify-end gap-4 pt-6 border-t border-slate-100">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 hover:text-slate-800 transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-8 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {isSubmitting ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                Updating...
                            </>
                        ) : (
                            "Update College"
                        )}
                    </button>
                </div>

            </form>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
