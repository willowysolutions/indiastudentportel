import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import imageCompression from "browser-image-compression";
import { ToastContainer } from "react-toastify";
import {
  getStateList,
  UpdateCollege,
} from "../../Redux/features/University/UniversitySlice";
import { UpdateAdminCollege } from "../../Redux/features/admin/AdminSlice";

const EditCollege = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [logoPreview, setLogoPreview] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const college = location.state?.college;
  console.log(college, "collegeee");

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
    name: college.name,
    university_name: college.university_name,
    email: college.email,
    contact: college.contact,
    established_year: college.established_year,
    accrediction_grade: college.accrediction_grade,
    naac_grade: college.naac_grade,
    nirf_ranking: college.nirf_ranking,
    pin_code: college.pin_code,
    state_id: college.state_id,
    district: college.location,
    street: college.street,
    address: college.address,
    link: college.link,
    college_details: college.college_details,
    college_highlights: college.college_highlights,
    logo: college.logo,
    image: college.image,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name must be at most 50 characters"),
    university_name: Yup.string().required("University name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    contact: Yup.string()
      .required("Contact number is required")
      .matches(/^\d{10}$/, "Invalid phone number"),
    established_year: Yup.string().required("Established year is required"),
    accrediction_grade: Yup.string().required("Accredition grade is required"),
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
    if (!(file instanceof File)) {
      return file; // Return the original file if not a valid File object
    }
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
      if (!(file instanceof File)) {
        reject(new Error("The file is not an instance of File"));
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
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
    if (file && file instanceof File && validateFile(file)) {
      const previewURL = URL.createObjectURL(file);
      if (type === "logo") {
        setLogoPreview(previewURL);
      }
      if (type === "image") {
        setImagePreview(previewURL);
      }
      setFieldValue(type, file);
    } else {
      toast.error("Invalid file format or size.");
    }
  };
  const handleSubmit = async (values) => {
    try {
      const collegeId = college?.id;
      const logoFile = values.logo instanceof File ? values.logo : null;
      const imageFile = values.image instanceof File ? values.image : null;
      const compressedLogo = logoFile ? await compressImage(logoFile) : null;
      const compressedImage = imageFile ? await compressImage(imageFile) : null;

      const base64Logo = compressedLogo
        ? await convertToBase64(compressedLogo)
        : values.logo;
      const base64Image = compressedImage
        ? await convertToBase64(compressedImage)
        : values.image;
      const payload = {
        ...values,
        logo: base64Logo,
        image: base64Image,
      };
      await dispatch(
        UpdateAdminCollege({ id: collegeId, college: payload })
      ).unwrap();
      toast.success("College updated successfully!");
      navigate("/colleges");
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update college.");
    }
  };

  const formFields = [
    { id: "name", placeholder: "College", type: "text" },
    { id: "university_name", placeholder: "University Name", type: "text" },
    { id: "email", placeholder: "Email", type: "email" },
    { id: "contact", placeholder: "Contact", type: "text" },
    { id: "established_year", placeholder: "Established Year", type: "text" },
    {
      id: "accrediction_grade",
      placeholder: "e.g., UGC, NAAC, AICTE",
      type: "text",
    },
    {
      id: "naac_grade",
      placeholder: "Select NAAC Grade",
      type: "select",
      options: ["B", "B+", "A", "A+", "A++"],
    },
    { id: "nirf_ranking", placeholder: "NIRF Ranking", type: "text" },
    { id: "pin_code", placeholder: "Pincode", type: "text" },
    { id: "state_id", placeholder: "Select State", type: "select" },
    { id: "district", placeholder: "District", type: "text" },
    { id: "street", placeholder: "Street", type: "text" },
    { id: "address", placeholder: "Address", type: "text" },
    { id: "link", placeholder: "College CRM Link", type: "text" },
    {
      id: "college_details",
      placeholder: "Describe College Details",
      type: "textarea",
    },
    {
      id: "college_highlights",
      placeholder: "Describe College Highlights",
      type: "textarea",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <ToastContainer />
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto relative animate-fadeIn">
         {/* Header */}
        <div className="bg-slate-50 px-8 py-6 border-b border-slate-200 flex justify-between items-center">
             <h2 className="text-xl font-bold text-slate-800">Edit College</h2>
             <button 
                onClick={() => navigate("/university/collegeProfile")}
                className="text-slate-400 hover:text-rose-500 transition-colors"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
        
        <div className="p-8">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue, isSubmitting }) => (
              <Form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {formFields.map(({ id, placeholder, type, options }) => (
                    <div key={id} className="flex flex-col">
                       <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 ml-0.5">{placeholder}</label>
                      <div className="relative">
                        {id === "state_id" ? (
                          <Field
                            as="select"
                            id={id}
                            name={id}
                            className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-slate-700 text-sm appearance-none"
                          >
                            <option value="">Select State</option>
                            {StateLists && StateLists.length > 0 ? (
                              StateLists.map((state) => (
                                <option key={state.id} value={state.id}>
                                  {state.state}
                                </option>
                              ))
                            ) : (
                              <option value="" disabled>
                                {isLoading
                                  ? "Loading states..."
                                  : "No states available"}
                              </option>
                            )}
                          </Field>
                        ) : type === "select" ? (
                           <Field
                            as="select"
                            id={id}
                            name={id}
                            className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-slate-700 text-sm appearance-none"
                          >
                            <option value="">{placeholder}</option>
                            {options.map((opt) => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </Field>
                        ) : type === "textarea" ? (
                          <Field
                            as="textarea"
                            id={id}
                            name={id}
                            required
                            rows="3"
                             className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-slate-700 text-sm min-h-[80px]"
                            placeholder={placeholder}
                          />
                        ) : (
                          <Field
                            id={id}
                            name={id}
                            type={type}
                            required
                             className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-slate-700 text-sm"
                            placeholder={placeholder}
                          />
                        )}
                      </div>
                      <ErrorMessage
                        name={id}
                        component="div"
                        className="text-rose-500 text-xs mt-1"
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex flex-col gap-6">
                  {/* Logo Upload Section */}
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <label htmlFor="logo" className="block mb-2 font-medium">
                        Upload Logo
                      </label>
                    </div>
                    <div className="flex-shrink-0">
                      {logoPreview || college.logo ? (
                        <img
                          src={logoPreview || college.logo}
                          alt="Logo Preview"
                          onClick={() =>
                            document.getElementById("logo").click()
                          }
                          className="w-20 h-20 object-contain border rounded-md cursor-pointer hover:opacity-75 transition-all"
                          title="Click to update logo"
                        />
                      ) : (
                        <div
                          onClick={() =>
                            document.getElementById("logo").click()
                          }
                          className="w-20 h-20 flex items-center justify-center border rounded-md bg-gray-100 cursor-pointer hover:bg-gray-200 transition-all"
                          title="Click to upload logo"
                        >
                          <span className="text-gray-500 text-sm">No Logo</span>
                        </div>
                      )}
                      <input
                        type="file"
                        id="logo"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          handleFileUpload(e, setFieldValue, "logo")
                        }
                      />
                    </div>
                    <ErrorMessage
                      name="logo"
                      component="div"
                      className="text-red-500 text-[15px]"
                    />
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <label htmlFor="image" className="block mb-2 font-medium">
                        Upload College Image
                      </label>
                    </div>
                    <div className="flex-shrink-0">
                      {imagePreview || college.image ? (
                        <img
                          src={imagePreview || college.image}
                          alt="Image Preview"
                          onClick={() =>
                            document.getElementById("image").click()
                          }
                          className="w-20 h-20 object-contain border rounded-md cursor-pointer hover:opacity-75 transition-all"
                          title="Click to update image"
                        />
                      ) : (
                        <div
                          onClick={() =>
                            document.getElementById("image").click()
                          }
                          className="w-20 h-20 flex items-center justify-center border rounded-md bg-gray-100 cursor-pointer hover:bg-gray-200 transition-all"
                          title="Click to upload image"
                        >
                          <span className="text-gray-500 text-sm">
                            No Image
                          </span>
                        </div>
                      )}
                      <input
                        type="file"
                        id="image"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          handleFileUpload(e, setFieldValue, "image")
                        }
                      />
                    </div>
                    <ErrorMessage
                      name="image"
                      component="div"
                      className="text-red-500 text-[15px]"
                    />
                  </div>
                  <div className="md:col-span-2 flex justify-end pt-6 border-t border-slate-100">
                     <button
                        onClick={() => navigate("/university/collegeProfile")}
                         type="button"
                        className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-all mr-3 text-sm"
                    >
                        Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-all shadow-md active:scale-95 text-sm"
                    >
                      {isSubmitting ? "Updating..." : "Update College"}
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
      </div>
      </div>
    </div>
  );
};

export default EditCollege;
