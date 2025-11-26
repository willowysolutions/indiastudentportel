import React, { useEffect, useState, useMemo } from "react";
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
import { Country, State } from "country-state-city";

const UniversitySignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [logoPreview, setLogoPreview] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState("IN"); // Default to India
  const [filteredStates, setFilteredStates] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const StateLists = useSelector((state) => state?.university?.stateList);

  // Get all countries
  const allCountriesList = Country.getAllCountries();

  // Create a comprehensive mapping of ISO codes to dial codes
  // This maps country-state-city ISO codes to country-telephone-data dial codes
  const countryCodeMap = useMemo(() => {
    const map = {};
    
    // First, create direct ISO2 to dial code mapping
    allCountries.forEach((country) => {
      if (country.iso2 && country.dialCode) {
        map[country.iso2.toUpperCase()] = `+${country.dialCode}`;
      }
    });
    
    // Then, create a mapping from country-state-city countries to dial codes
    // by matching ISO codes
    allCountriesList.forEach((cscCountry) => {
      if (cscCountry.isoCode) {
        const iso2 = cscCountry.isoCode.toUpperCase();
        // Check if we have a dial code for this ISO code
        const phoneCountry = allCountries.find((pc) => 
          pc.iso2 && pc.iso2.toUpperCase() === iso2
        );
        if (phoneCountry && phoneCountry.dialCode) {
          map[iso2] = `+${phoneCountry.dialCode}`;
        }
      }
    });
    
    return map;
  }, []);

  // Helper function to get country code from ISO code
  const getCountryCode = (isoCode) => {
    if (!isoCode) return "+91"; // Default to +91 if no ISO code
    
    // Normalize to uppercase for comparison
    const normalizedIso = isoCode.toUpperCase();
    
    // Direct lookup from map
    const code = countryCodeMap[normalizedIso];
    if (code) {
      return code;
    }
    
    console.warn(`Country code not found for ISO: ${isoCode}`);
    return "+91"; // Default to +91 if not found
  };

  // Update states when country changes
  useEffect(() => {
    if (selectedCountry) {
      const states = State.getStatesOfCountry(selectedCountry);
      setFilteredStates(states || []);
    } else {
      setFilteredStates([]);
    }
  }, [selectedCountry]);

  // Initialize states for default country (India) on mount
  useEffect(() => {
    const states = State.getStatesOfCountry("IN");
    setFilteredStates(states || []);
  }, []);

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
    country: "IN", // Default to India (ISO code)
    country_code: "+91", // ⬅ default India
    contact: "",
    established_year: "",
    accrediction_grade: "",
    naac_grade: "",
    nirf_ranking: "",
    pin_code: "",
    state: "", // Changed from state_id to state to store state name
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
    country: Yup.string().required("Country is required"),
    country_code: Yup.string().required("Country Code Required"),
    contact: Yup.string()
      .required()
      .matches(/^\d{10}$/, "Invalid phone number"),
    state: Yup.string().required("State is required"),
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
    // Country selection dropdown
    { id: "country", placeholder: "Select Country", type: "country_select" },
    // State field right after country
    { id: "state", placeholder: "Select State", type: "state_select" },
    { id: "contact", placeholder: "Phone Number", type: "phone" },
    { id: "established_year", placeholder: "Established Year", type: "text" },
    { id: "accrediction_grade", placeholder: "e.g., UGC, NAAC", type: "text" },
    { id: "naac_grade", placeholder: "NAAC Grade", type: "text" },
    { id: "nirf_ranking", placeholder: "NIRF Ranking", type: "text" },
    { id: "pin_code", placeholder: "Pincode", type: "text" },
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
            {({ setFieldValue, values, isSubmitting }) => (
              <Form className="space-y-6 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {formFields.map(({ id, placeholder, type }) => (
                    <div key={id}>
                      <div className="border rounded flex items-center px-2 py-1">
                        {/* Country Selection Dropdown */}
                        {type === "country_select" ? (
                          <Field
                            as="select"
                            name={id}
                            className="w-full outline-none p-2"
                            onChange={(e) => {
                              const selectedIsoCode = e.target.value;
                              setFieldValue(id, selectedIsoCode);
                              setSelectedCountry(selectedIsoCode);
                              
                              // Auto-set country code based on selected country
                              if (selectedIsoCode) {
                                const countryCode = getCountryCode(selectedIsoCode);
                                setFieldValue("country_code", countryCode);
                              } else {
                                setFieldValue("country_code", "+91");
                              }
                              
                              // Reset state when country changes
                              setFieldValue("state", "");
                            }}
                          >
                            <option value="">Select Country</option>
                            {allCountriesList.map((country) => (
                              <option key={country.isoCode} value={country.isoCode}>
                                {country.name}
                              </option>
                            ))}
                          </Field>
                        ) : id === "state" || type === "state_select" ? (
                          <Field
                            as="select"
                            name={id}
                            className="w-full outline-none p-2"
                            disabled={!selectedCountry}
                          >
                            <option value="">Select State</option>
                            {filteredStates.map((state) => (
                              <option key={state.isoCode} value={state.name}>
                                {state.name}
                              </option>
                            ))}
                          </Field>
                        ) : type === "phone" ? (
                          <div className="flex items-center w-full">
                            <span className="px-2 py-2 text-gray-600 border-r border-gray-300">
                              {values.country_code || "+91"}
                            </span>
                            <Field
                              name={id}
                              placeholder={placeholder}
                              className="flex-1 outline-none p-2 border-0"
                              type="text"
                            />
                          </div>
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
