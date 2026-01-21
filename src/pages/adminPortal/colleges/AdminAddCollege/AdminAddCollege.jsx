import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { FaEye, FaEyeSlash, FaCloudUploadAlt, FaUniversity, FaArrowLeft } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import imageCompression from "browser-image-compression";
import { getStateList } from "../../../../Redux/features/University/UniversitySlice";
import { postAdminColleges } from "../../../../Redux/features/admin/AdminSlice";

const AdminAddCollege = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [logoPreview, setLogoPreview] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const StateLists = useSelector((state) => state?.university?.stateList);

  useEffect(() => {
    dispatch(getStateList());
  }, [dispatch]);

  useEffect(() => {
    if (StateLists) {
      setIsLoading(false);
    }
  }, [StateLists]);

  const initialValues = {
    name: "",
    university_name: "",
    email: "",
    password: "",
    contact: "",
    established_year: "",
    accrediction_grade: "",
    naac_grade: "",
    nirf_ranking: "",
    pin_code: "",
    state_id: "",
    district: "",
    street: "",
    address: "",
    link: "",
    college_details: "",
    college_highlights: "",
    logo: null,
    image: null,
    activeStatus: "false",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name must be at most 50 characters"),
    university_name: Yup.string().required("University name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
    contact: Yup.string()
      .required("Contact number is required")
      .matches(/^\d{10}$/, "Invalid phone number"),
    established_year: Yup.string().required("Established year is required"),
    accrediction_grade: Yup.string().required("Accrediction grade is required"),
    naac_grade: Yup.string().required("NAAC grade is required"),
    nirf_ranking: Yup.string().required("NIRF ranking is required"),
    pin_code: Yup.string().required("Pincode is required"),
    state_id: Yup.number().required("State ID is required"),
    district: Yup.string().required("District is required"),
    street: Yup.string().required("Street is required"),
    address: Yup.string().required("Address is required"),
    college_details: Yup.string()
      .required("College details are required")
      .min(10, "Details must be at least 10 characters"),
    college_highlights: Yup.string()
      .required("College highlights are required")
      .min(10, "Highlights must be at least 10 characters"),
    logo: Yup.mixed().required("Logo is required"),
    image: Yup.mixed().required("Image is required"),
  });

  const compressImage = async (file) => {
    const options = {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 1024,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(file, options);
      return compressedFile;
    } catch (error) {
      console.error("Image compression error:", error);
      return file;
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const validateFile = (file) => {
    if (!file) return true;
    if (file.size > 6 * 1024 * 1024) {
      toast.error("File size should not exceed 6MB.");
      return false;
    }
    if (!["image/jpeg", "image/png"].includes(file.type)) {
      toast.error("Only JPEG and PNG formats are supported.");
      return false;
    }
    return true;
  };
  const handleFileUpload = async (e, setFieldValue, type) => {
    const file = e.target.files[0];
    if (validateFile(file)) {
      const previewURL = URL.createObjectURL(file);
      if (type === "logo") setLogoPreview(previewURL);
      if (type === "image") setImagePreview(previewURL);
      setFieldValue(type, file);
    }
  };
  const onSubmit = async (values, { setSubmitting }) => {
    try {
      let base64Logo = null;
      let base64Image = null;

      if (values.logo) {
        const compressedLogo = await compressImage(values.logo);
        base64Logo = await convertToBase64(compressedLogo);
      }

      if (values.image) {
        const compressedImage = await compressImage(values.image);
        base64Image = await convertToBase64(compressedImage);
      }

      const AdminCollegesData = {
        ...values,
        logo: base64Logo,
        image: base64Image,
      };
      const response = await dispatch(postAdminColleges(AdminCollegesData));

      if (response?.payload?.success) {
        toast.success(
          "College Registration successful! You can now add courses to this college."
        );
        setTimeout(() => {
          navigate("/admin/colleges");
        }, 2000);
      } else {
        toast.error(
          response?.payload?.message ||
            "Something went wrong, please try again later"
        );
      }
    } catch (error) {
      console.error("Error occurred during registration:", error.message);
      toast.error("College Registration failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const formFields = [
    { id: "name", placeholder: "College Name", label: "College Name", type: "text" },
    { id: "university_name", placeholder: "University Name", label: "University Name", type: "text" },
    { id: "email", placeholder: "Email Address", label: "Email", type: "email" },
    {
      id: "password",
      placeholder: "Password",
      label: "Password",
      type: showPassword ? "text" : "password",
    },
    { id: "contact", placeholder: "Contact Number", label: "Contact", type: "text" },
    { id: "established_year", placeholder: "Established Year", label: "Established Year", type: "text" },
    {
      id: "accrediction_grade",
      placeholder: "e.g., UGC, NAAC, AICTE",
      label: "Accreditation",
      type: "text",
    },
    {
      id: "naac_grade",
      placeholder: "Select NAAC Grade",
      label: "NAAC Grade",
      type: "select",
      options: ["B", "B+", "A", "A+", "A++"],
    },
    { id: "nirf_ranking", placeholder: "NIRF Ranking", label: "NIRF Ranking", type: "text" },
    { id: "pin_code", placeholder: "Pincode", label: "Pincode", type: "text" },
    { id: "state_id", placeholder: "Select State", label: "State", type: "select" },
    { id: "district", placeholder: "District", label: "District", type: "text" },
    { id: "street", placeholder: "Street", label: "Street", type: "text" },
    { id: "address", placeholder: "Full Address", label: "Address", type: "text" },
    { id: "link", placeholder: "College CRM Link", label: "CRM Link", type: "text" },
     {
      id: "college_details",
      placeholder: "Describe College Details",
      label: "College Details",
      type: "textarea",
    },
    {
      id: "college_highlights",
      placeholder: "Describe College Highlights",
      label: "College Highlights",
      type: "textarea",
    },
  ];

  return (
    <div className="min-h-screen p-6 font-poppins">
      <ToastContainer />
      <div className="bg-white/90 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl w-full overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
             <button 
                onClick={() => navigate('/admin/colleges')}
                className="flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-4 text-sm font-medium"
             >
                <FaArrowLeft /> Back to Colleges
             </button>
             <h2 className="text-3xl font-bold flex items-center gap-3">
                <FaUniversity className="text-blue-200" />
                Add New College
             </h2>
             <p className="text-blue-100 mt-2">Enter the details below to register a new college in the system.</p>
        </div>

        <div className="p-8 md:p-12">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ setFieldValue, isSubmitting }) => (
              <Form className="space-y-8">
                
                {/* Image Upload Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="bg-slate-50 p-6 rounded-xl border border-dashed border-slate-300 hover:border-blue-400 transition-colors">
                        <label className="block mb-4 font-semibold text-slate-700">College Logo</label>
                        <div className="flex items-center gap-6">
                             <div className="w-24 h-24 bg-white rounded-lg shadow-sm border border-slate-200 flex items-center justify-center overflow-hidden">
                                 {logoPreview ? (
                                     <img src={logoPreview} alt="Logo" className="w-full h-full object-contain" />
                                 ) : (
                                     <FaCloudUploadAlt className="text-4xl text-slate-300" />
                                 )}
                             </div>
                             <div className="flex-1">
                                 <input
                                    type="file"
                                    id="logo"
                                    name="logo"
                                    accept="image/*"
                                    onChange={(e) => handleFileUpload(e, setFieldValue, "logo")}
                                    className="block w-full text-sm text-slate-500
                                      file:mr-4 file:py-2 file:px-4
                                      file:rounded-full file:border-0
                                      file:text-sm file:font-semibold
                                      file:bg-blue-50 file:text-blue-700
                                      hover:file:bg-blue-100 transition-all cursor-pointer"
                                 />
                                 <ErrorMessage name="logo" component="div" className="text-rose-500 text-xs mt-2" />
                             </div>
                        </div>
                     </div>

                     <div className="bg-slate-50 p-6 rounded-xl border border-dashed border-slate-300 hover:border-blue-400 transition-colors">
                        <label className="block mb-4 font-semibold text-slate-700">College Cover Image</label>
                        <div className="flex items-center gap-6">
                             <div className="w-32 h-24 bg-white rounded-lg shadow-sm border border-slate-200 flex items-center justify-center overflow-hidden">
                                 {imagePreview ? (
                                     <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                 ) : (
                                     <FaCloudUploadAlt className="text-4xl text-slate-300" />
                                 )}
                             </div>
                             <div className="flex-1">
                                 <input
                                    type="file"
                                    id="image"
                                    name="image"
                                    accept="image/*"
                                    onChange={(e) => handleFileUpload(e, setFieldValue, "image")}
                                    className="block w-full text-sm text-slate-500
                                      file:mr-4 file:py-2 file:px-4
                                      file:rounded-full file:border-0
                                      file:text-sm file:font-semibold
                                      file:bg-blue-50 file:text-blue-700
                                      hover:file:bg-blue-100 transition-all cursor-pointer"
                                 />
                                 <ErrorMessage name="image" component="div" className="text-rose-500 text-xs mt-2" />
                             </div>
                        </div>
                     </div>
                </div>

                {/* Form Fields Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {formFields.map(({ id, placeholder, label, type, options }) => (
                    <div key={id} className={`flex flex-col ${type === 'textarea' ? 'md:col-span-3' : ''}`}>
                      <label htmlFor={id} className="mb-1.5 text-sm font-semibold text-slate-700 ml-1">
                          {label} <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        {type === "select" ? (
                          <Field
                            as="select"
                            id={id}
                            name={id}
                            className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-slate-400 text-slate-700 appearance-none"
                          >
                            <option value="">Select {label}</option>
                            {id === "state_id" ? (
                                StateLists && StateLists.length > 0 ? (
                                  StateLists.map((state) => (
                                    <option key={state.id} value={state.id}>{state.state}</option>
                                  ))
                                ) : (
                                  <option value="" disabled>{isLoading ? "Loading..." : "No states available"}</option>
                                )
                            ) : (
                                options?.map((opt) => (
                                    <option key={opt} value={opt}>{opt}</option>
                                ))
                            )}
                          </Field>
                        ) : type === "textarea" ? (
                          <Field
                            as="textarea"
                            id={id}
                            name={id}
                            rows="4"
                            className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-slate-400 text-slate-700 resize-none"
                            placeholder={placeholder}
                          />
                        ) : (
                          <Field
                            id={id}
                            name={id}
                            type={type}
                            className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-slate-400 text-slate-700"
                            placeholder={placeholder}
                          />
                        )}
                        
                        {/* Password Toggle */}
                        {id === "password" && (
                             <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer hover:text-blue-500 transition-colors" onClick={() => setShowPassword(!showPassword)}>
                                 {showPassword ? <FaEyeSlash /> : <FaEye />}
                             </div>
                        )}
                      </div>
                      <ErrorMessage name={id} component="div" className="text-rose-500 text-xs mt-1 ml-1" />
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-100">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                          <>
                             <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                             Processing...
                          </>
                      ) : (
                          <>
                            <FaUniversity className="text-lg" />
                            Register College
                          </>
                      )}
                    </button>
                </div>

              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default AdminAddCollege;
