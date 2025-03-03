import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { signupUniversity } from "../../Redux/features/University/AuthUniversityLogin";
import { getStateList } from "../../Redux/features/University/UniversitySlice";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import sideImage from "../../assets/loginPage image.svg";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import imageCompression from "browser-image-compression";

const UniversitySignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [logoPreview, setLogoPreview] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const StateLists = useSelector((state) => state?.university?.stateList);

  useEffect(() => {
    dispatch(getStateList())
      .unwrap()
      .catch((error) => {
        toast.error("Failed to fetch state list. Please try again.");
      });
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
    // affliation:"",
    // location:"",
    // category:"",
    // created_by:"",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name must be at most 50 characters"),
    university_name: Yup.string().required("university name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
    contact: Yup.string()
      .required("Contact number is required")
      .matches(/^\d{10}$/, "Invalid phone number"),
    established_year: Yup.string().required("District is required"),
    accrediction_grade: Yup.string().required("District is required"),
    naac_grade: Yup.string().required("District is required"),
    nirf_ranking: Yup.string().required("District is required"),
    pin_code: Yup.string().required("District is required"),

    state_id: Yup.number().required("State ID is required"),
    district: Yup.string().required("District is required"),
    street: Yup.string().required("street is required"),
    address: Yup.string().required("Address is required"),
    college_details: Yup.string()
      .required("College details are required")
      .min(10, "Details must be at least 10 characters"),
    college_highlights: Yup.string()
      .required("college highlights  are required")
      .min(10, "college highlights must be at least 10 characters"),
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
    if (!file) return true; // Skip if no file is selected
    if (file.size > 6 * 1024 * 1024) {
      toast.error("File size should not exceed 2MB.");
      return false;
    }
    if (!["image/jpeg", "image/png"].includes(file.type)) {
      toast.error("Only JPEG and PNG formats are supported.");
      return false;
    }
    return true;
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

      const signupData = { ...values, logo: base64Logo, image: base64Image };
      const response = await dispatch(signupUniversity(signupData));

      if (response?.payload?.success) {
        toast.success(
          "Registration successful now admin will approve your signup after that you will get access for login"
        );
        navigate("/university/login");
      } else {
        toast.error(
          response?.payload?.message ||
            "Something went wrong, please try again later"
        );
      }
    } catch (error) {
      console.error("Error occurred during registration:", error.message);
      toast.error("Registration failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const navigateNext = () => {
    navigate("../university/login");
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
    { id: "naac_grade", placeholder: "NAAC Grade", type: "text" },
    { id: "nirf_ranking", placeholder: "NIRF Ranking", type: "text" },
    { id: "pin_code", placeholder: "Pincode", type: "text" },
    { id: "state_id", placeholder: "Select State", type: "select" },
    { id: "district", placeholder: "District", type: "text" },
    { id: "street", placeholder: "Street", type: "text" },
    { id: "address", placeholder: "Address", type: "text" },
    { id: "link", placeholder: "College CRM Link", type: "text" },
    // { id: "dummy", placeholder: "", type: "none" },
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
    <div className="flex flex-col md:grid md:grid-cols-2">
      <div className="flex items-center justify-center p-6 md:p-12">
        <div className="px-8 py-6 rounded-md w-full">
          <h2 className="text-[32px] md:text-[45px] font-bold text-center">
            Sign Up College
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
                <div className="mt-4">
                  Upload Logo
                  <input
                    type="file"
                    id="logo"
                    name="logo"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (validateFile(file)) {
                        setLogoPreview(URL.createObjectURL(file));
                        setFieldValue("logo", file);
                      }
                    }}
                    className="block w-full px-2 py-1.5 mt-2"
                  />
                  {logoPreview && (
                    <img
                      src={logoPreview}
                      alt="Logo Preview"
                      className="mt-2 h-16"
                    />
                  )}
                  <ErrorMessage
                    name="logo"
                    component="div"
                    className="text-red-500 text-[15px]"
                  />
                </div>
                <div className="mt-4">
                  Upload College Image
                  <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (validateFile(file)) {
                        setImagePreview(URL.createObjectURL(file));
                        setFieldValue("image", file);
                      }
                    }}
                    className="block w-full px-2 py-1.5 mt-2"
                  />
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Image Preview"
                      className="mt-2 h-16"
                    />
                  )}
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
                  {isSubmitting ? "Signing Up..." : "Sign Up"}
                </button>
                <button
                  type="button"
                  className="text-blue-500 underline text-sm"
                  onClick={navigateNext}
                >
                  Already have an account? Login
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <div className="hidden md:flex items-center">
        <img
          src={sideImage}
          alt="Side Decoration"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};

export default UniversitySignUp;