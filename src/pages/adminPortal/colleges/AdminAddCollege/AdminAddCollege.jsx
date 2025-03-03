import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import imageCompression from "browser-image-compression";
import { getStateList } from "../../../../Redux/features/University/UniversitySlice";
import { postAdminColleges } from "../../../../Redux/features/admin/AdminSlice";
import { ToastContainer } from "react-toastify";

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
    { id: "name", placeholder: "College", type: "text" },
    { id: "university_name", placeholder: "University Name", type: "text" },
    { id: "email", placeholder: "Email", type: "email" },
    {
      id: "password",
      placeholder: "Password",
      type: showPassword ? "text" : "password",
    },
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
    { id: "link", placeholder: "College CRM Link", type: "text" },
  ];

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <ToastContainer />
      <div className="bg-white p-6 md:p-12 rounded-lg shadow-lg w-full max-w-4xl">
        <div className="px-8 py-6 rounded-md w-full">
          <h2 className="text-[32px] md:text-[45px] font-bold text-center">
            Add Admin College
          </h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ setFieldValue, isSubmitting }) => (
              <Form className="space-y-6 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {formFields.map(({ id, placeholder, type }) => (
                    <div key={id} className="flex flex-col">
                      <div className="border-[1px] border-gray-300 rounded-md gap-2 flex items-center mt-2">
                        {id === "state_id" ? (
                          <Field
                            as="select"
                            id={id}
                            name={id}
                            className="block w-full px-2 border-0 py-1.5 focus:outline-none ring-0 placeholder:text-gray-400 sm:text-sm sm:leading-6"
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
                        ) : type === "textarea" ? (
                          <Field
                            as="textarea"
                            id={id}
                            name={id}
                            required
                            className="block w-full px-2 border-0 py-1.5 focus:outline-none ring-0 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                            placeholder={placeholder}
                          />
                        ) : (
                          <Field
                            id={id}
                            name={id}
                            type={type}
                            required
                            className="block w-full px-2 border-0 py-1.5 focus:outline-none ring-0 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                            placeholder={placeholder}
                          />
                        )}
                        {id === "password" &&
                          (showPassword ? (
                            <FaEyeSlash
                              className="cursor-pointer"
                              onClick={() => setShowPassword(false)}
                            />
                          ) : (
                            <FaEye
                              className="cursor-pointer"
                              onClick={() => setShowPassword(true)}
                            />
                          ))}
                      </div>
                      <ErrorMessage
                        name={id}
                        component="div"
                        className="text-red-500 text-[15px]"
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-4">
                  <div className="flex-1">
                    <label htmlFor="logo" className="block mb-2 font-medium">
                      Upload Logo
                    </label>
                    <input
                      type="file"
                      id="logo"
                      name="logo"
                      accept="image/*"
                      onChange={(e) =>
                        handleFileUpload(e, setFieldValue, "logo")
                      }
                      className="block w-full px-2 py-1.5 border rounded-md"
                    />
                  </div>
                  <div className="flex-shrink-0">
                    {logoPreview && (
                      <img
                        src={logoPreview}
                        alt="Logo Preview"
                        className="w-20 h-20 object-contain border rounded-md"
                      />
                    )}
                  </div>
                  <ErrorMessage
                    name="logo"
                    component="div"
                    className="text-red-500 text-[15px]"
                  />
                </div>

                <div className="mt-4 flex items-center gap-4">
                  {/* Image Upload Section */}
                  <div className="flex-1">
                    <label htmlFor="image" className="block mb-2 font-medium">
                      Upload College Image
                    </label>
                    <input
                      type="file"
                      id="image"
                      name="image"
                      accept="image/*"
                      onChange={(e) =>
                        handleFileUpload(e, setFieldValue, "image")
                      }
                      className="block w-full px-2 py-1.5 border rounded-md"
                    />
                  </div>
                  <div className="flex-shrink-0">
                    {imagePreview && (
                      <img
                        src={imagePreview}
                        alt="Image Preview"
                        className="w-20 h-20 object-contain border rounded-md"
                      />
                    )}
                  </div>
                  <ErrorMessage
                    name="image"
                    component="div"
                    className="text-red-500 text-[15px]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-md mt-4"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Add College..." : "Add College"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default AdminAddCollege;
