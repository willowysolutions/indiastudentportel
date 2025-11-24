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
import { allCountries } from "country-telephone-data"; // ⬅ NEW

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
      .catch(() => toast.error("Failed to fetch state list."));
  }, [dispatch]);

  useEffect(() => {
    if (StateLists) setIsLoading(false);
  }, [StateLists]);

  const initialValues = {
    name: "",
    university_name: "",
    email: "",
    password: "",
    country_code: "+91", // ⬅ default India
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
    name: Yup.string().required(),
    university_name: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().min(8).required(),
    country_code: Yup.string().required("Country Code Required"),
    contact: Yup.string()
      .required()
      .matches(/^\d{10}$/, "Invalid phone number"),
    state_id: Yup.number().required(),
    college_details: Yup.string().min(10).required(),
    college_highlights: Yup.string().min(10).required(),
    logo: Yup.mixed().required(),
    image: Yup.mixed().required(),
  });

  const compressImage = async (file) => {
    try {
      return await imageCompression(file, {
        maxSizeMB: 0.2,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
      });
    } catch {
      return file;
    }
  };

  const convertToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const validateFile = (file) => {
    if (!file) return true;
    if (file.size > 6 * 1024 * 1024) return toast.error("Max size 6MB");
    if (!["image/jpeg", "image/png"].includes(file.type))
      return toast.error("Only PNG/JPG allowed");
    return true;
  };

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const compressedLogo = await compressImage(values.logo);
      const compressedImage = await compressImage(values.image);

      const payload = {
        ...values,
        contact: `${values.country_code}${values.contact}`, // ⬅ merge code + number
        logo: await convertToBase64(compressedLogo),
        image: await convertToBase64(compressedImage),
      };

      const response = await dispatch(signupUniversity(payload));

      if (response?.payload?.success) {
        toast.success("Registration submitted. Await admin approval.");
        navigate("/university/login");
      } else toast.error(response?.payload?.message || "Something went wrong");
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

    // ⬇ ADD THIS NEW FIELD BEFORE 'contact'
    { id: "country_code", placeholder: "Country Code", type: "country" },

    { id: "contact", placeholder: "Phone Number", type: "text" },

    { id: "established_year", placeholder: "Established Year", type: "text" },
    { id: "accrediction_grade", placeholder: "e.g., UGC, NAAC", type: "text" },
    { id: "naac_grade", placeholder: "NAAC Grade", type: "text" },
    { id: "nirf_ranking", placeholder: "NIRF Ranking", type: "text" },
    { id: "pin_code", placeholder: "Pincode", type: "text" },
    { id: "state_id", placeholder: "Select State", type: "select" },
    { id: "district", placeholder: "District", type: "text" },
    { id: "street", placeholder: "Street", type: "text" },
    { id: "address", placeholder: "Address", type: "text" },
    { id: "link", placeholder: "CRM Link", type: "text" },
    { id: "college_details", placeholder: "College Details", type: "textarea" },
    { id: "college_highlights", placeholder: "Highlights", type: "textarea" },
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
                    <div key={id}>
                      <div className="border rounded flex items-center px-2 py-1">
                        {/* Country Dropdown */}
                        {type === "country" ? (
                          <Field
                            as="select"
                            name={id}
                            className="w-full outline-none p-2"
                          >
                            {allCountries.map((item) => {
                              const cleanName = item.name.split("(")[0].trim(); // remove extra language text

                              return (
                                <option
                                  key={item.iso2}
                                  value={`+${item.dialCode}`}
                                >
                                  {cleanName} (+{item.dialCode})
                                </option>
                              );
                            })}
                          </Field>
                        ) : id === "state_id" ? (
                          <Field
                            as="select"
                            name={id}
                            className="w-full outline-none p-2"
                          >
                            <option value="">Select State</option>
                            {StateLists?.map((state) => (
                              <option key={state.id} value={state.id}>
                                {state.state}
                              </option>
                            ))}
                          </Field>
                        ) : type === "textarea" ? (
                          <Field
                            as="textarea"
                            name={id}
                            placeholder={placeholder}
                            className="w-full outline-none p-2"
                          />
                        ) : (
                          <Field
                            name={id}
                            placeholder={placeholder}
                            className="w-full outline-none p-2"
                            type={type}
                          />
                        )}

                        {/* Password Eye */}
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
                        className="text-red-500 text-sm"
                      />
                    </div>
                  ))}
                </div>

                {/* Logo Upload */}
                <div>
                  <label>Upload Logo</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (validateFile(e.target.files[0])) {
                        setFieldValue("logo", e.target.files[0]);
                        setLogoPreview(URL.createObjectURL(e.target.files[0]));
                      }
                    }}
                    className="block w-full mt-2"
                  />
                  {logoPreview && (
                    <img
                      src={logoPreview}
                      alt="preview"
                      className="h-16 mt-2"
                    />
                  )}
                </div>

                {/* Image Upload */}
                <div>
                  <label>Upload College Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (validateFile(e.target.files[0])) {
                        setFieldValue("image", e.target.files[0]);
                        setImagePreview(URL.createObjectURL(e.target.files[0]));
                      }
                    }}
                    className="block w-full mt-2"
                  />
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="preview"
                      className="h-16 mt-2"
                    />
                  )}
                </div>

                <button
                  disabled={isSubmitting}
                  className="w-full bg-blue-500 text-white rounded py-2"
                >
                  {isSubmitting ? "Submitting..." : "Sign Up"}
                </button>

                <p
                  className="text-blue-500 text-center cursor-pointer"
                  onClick={() => navigate("/university/login")}
                >
                  Already have an account?
                </p>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      <div className="hidden md:flex items-center">
        <img src={sideImage} className="w-full object-contain" alt="" />
      </div>
    </div>
  );
};

export default UniversitySignUp;
