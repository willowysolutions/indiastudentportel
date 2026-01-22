import { useEffect, useState, useMemo } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { signupUniversity } from "../../Redux/features/University/AuthUniversityLogin";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import sideImage from "../../assets/loginPage image.svg";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import imageCompression from "browser-image-compression";
import { allCountries } from "country-telephone-data"; 
import { Country, State } from "country-state-city";

const UniversitySignUp = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [logoPreview, setLogoPreview] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState("IN"); // Default to India
  const [filteredStates, setFilteredStates] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get all countries
  const allCountriesList = Country.getAllCountries();

  // Create a comprehensive mapping of ISO codes to dial codes
  const countryCodeMap = useMemo(() => {
    const map = {};
    
    // First, create direct ISO2 to dial code mapping
    allCountries.forEach((country) => {
      if (country.iso2 && country.dialCode) {
        map[country.iso2.toUpperCase()] = `+${country.dialCode}`;
      }
    });
    
    // Then, create a mapping from country-state-city countries to dial codes
    allCountriesList.forEach((cscCountry) => {
      if (cscCountry.isoCode) {
        const iso2 = cscCountry.isoCode.toUpperCase();
        const phoneCountry = allCountries.find((pc) => 
          pc.iso2 && pc.iso2.toUpperCase() === iso2
        );
        if (phoneCountry && phoneCountry.dialCode) {
          map[iso2] = `+${phoneCountry.dialCode}`;
        }
      }
    });
    
    return map;
  }, [allCountriesList]);

  // Helper function to get country code from ISO code
  const getCountryCode = (isoCode) => {
    if (!isoCode) return "+91"; // Default to +91 if no ISO code
    
    const normalizedIso = isoCode.toUpperCase();
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
    name: Yup.string().required("Name is required"),
    university_name: Yup.string().required("University Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
    country: Yup.string().required("Country is required"),
    country_code: Yup.string().required("Country Code Required"),
    contact: Yup.string()
      .required("Phone number is required")
      .matches(/^\d{10}$/, "Invalid phone number"),
    state: Yup.string().required("State is required"),
    college_details: Yup.string().min(10, "Details must be at least 10 chars").required("College details required"),
    college_highlights: Yup.string().min(10, "Highlights must be at least 10 chars").required("College highlights required"),
    logo: Yup.mixed().required("Logo is required"),
    image: Yup.mixed().required("College image is required"),
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
      setLoading(true);
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
      } else {
         toast.error(response?.payload?.message || "Something went wrong");
         setLoading(false);
      }
    } catch (error) {
      toast.error("An error occurred during registration.");
      setLoading(false);
    } finally {
      setSubmitting(false);
    }
  };

  const formFields = [
    { id: "name", label: "College Name", placeholder: "Enter college name", type: "text" },
    { id: "university_name", label: "University Name", placeholder: "Enter university name", type: "text" },
    { id: "email", label: "Email Address", placeholder: "admin@university.edu", type: "email" },
    {
      id: "password",
      label: "Password",
      placeholder: "Create a password",
      type: showPassword ? "text" : "password",
    },
    // Country selection dropdown
    { id: "country", label: "Country", placeholder: "Select Country", type: "country_select" },
    // State field right after country
    { id: "state", label: "State", placeholder: "Select State", type: "state_select" },
    { id: "contact", label: "Phone Number", placeholder: "Enter phone number", type: "phone" },
    { id: "established_year", label: "Established Year", placeholder: "YYYY", type: "text" },
    { id: "accrediction_grade", label: "Accreditation", placeholder: "e.g., UGC, NAAC", type: "text" },
    { id: "naac_grade", label: "NAAC Grade", placeholder: "e.g., A++, A+", type: "text" },
    { id: "nirf_ranking", label: "NIRF Ranking", placeholder: "e.g., 25", type: "text" },
    { id: "pin_code", label: "Pincode", placeholder: "Enter pincode", type: "text" },
    { id: "district", label: "District", placeholder: "Enter district", type: "text" },
    { id: "street", label: "Street", placeholder: "Enter street name", type: "text" },
    { id: "address", label: "Full Address", placeholder: "Enter full address", type: "text" },
    { id: "link", label: "CRM Link", placeholder: "Optional CRM Link", type: "text" },
    { id: "college_details", label: "College Details", placeholder: "Describe the college...", type: "textarea" },
    { id: "college_highlights", label: "College Highlights", placeholder: "Key highlights...", type: "textarea" },
  ];

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* LEFT SECTION - Signup Form */}
      <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 bg-white">
        <ToastContainer position="top-right" autoClose={3000} />
        
        <div className="w-full max-w-2xl">
           <div className="mb-10 text-center lg:text-left">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Register University
            </h1>
            <p className="text-base text-gray-600">
              Create an institutional account to manage your presence
            </p>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ setFieldValue, values, isSubmitting }) => (
              <Form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {formFields.map(({ id, label, placeholder, type }) => (
                    <div key={id} className={type === "textarea" || id === "address" ? "md:col-span-2" : ""}>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {label}
                      </label>
                      <div className="relative">
                        {/* Country Selection Dropdown */}
                        {type === "country_select" ? (
                          <Field
                            as="select"
                            name={id}
                            className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                            onChange={(e) => {
                              const selectedIsoCode = e.target.value;
                              setFieldValue(id, selectedIsoCode);
                              setSelectedCountry(selectedIsoCode);
                              
                              if (selectedIsoCode) {
                                const countryCode = getCountryCode(selectedIsoCode);
                                setFieldValue("country_code", countryCode);
                              } else {
                                setFieldValue("country_code", "+91");
                              }
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
                            className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
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
                          <div className="flex">
                            <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-100 text-gray-500 text-sm">
                              {values.country_code || "+91"}
                            </span>
                            <Field
                              name={id}
                              placeholder={placeholder}
                              className="w-full rounded-r-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                              type="text"
                            />
                          </div>
                        ) : type === "textarea" ? (
                          <Field
                            as="textarea"
                            name={id}
                            placeholder={placeholder}
                            rows="4"
                            className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all resize-none"
                          />
                        ) : (
                          <Field
                            name={id}
                            placeholder={placeholder}
                            className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                            type={type}
                          />
                        )}

                        {/* Password Eye */}
                        {id === "password" && (
                           <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500 hover:text-gray-700 transition-colors"
                          >
                            {showPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
                          </button>
                        )}
                      </div>

                      <ErrorMessage
                        name={id}
                        component="div"
                        className="mt-1 text-sm text-red-600"
                      />
                    </div>
                  ))}
                </div>

                {/* File Uploads */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4">
                  {/* Logo Upload */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">University Logo</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-500 transition-colors">
                      <div className="space-y-1 text-center">
                        {logoPreview ? (
                            <div className="relative">
                                <img src={logoPreview} alt="Logo preview" className="mx-auto h-24 object-contain" />
                                <button 
                                    type="button"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setFieldValue("logo", null);
                                        setLogoPreview(null);
                                    }}
                                    className="text-xs text-red-500 mt-2 hover:underline"
                                >
                                    Remove
                                </button>
                            </div>
                        ) : (
                            <div className="flex text-sm text-gray-600 flex-col items-center">
                                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <label htmlFor="logo-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                                    <span>Upload a file</span>
                                    <input id="logo-upload" name="logo" type="file" className="sr-only" accept="image/*"
                                        onChange={(e) => {
                                            if (validateFile(e.target.files[0])) {
                                                setFieldValue("logo", e.target.files[0]);
                                                setLogoPreview(URL.createObjectURL(e.target.files[0]));
                                            }
                                        }}
                                    />
                                </label>
                            </div>
                        )}
                      </div>
                    </div>
                     <ErrorMessage name="logo" component="div" className="mt-1 text-sm text-red-600" />
                  </div>

                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">College Image</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-500 transition-colors">
                      <div className="space-y-1 text-center">
                        {imagePreview ? (
                             <div className="relative">
                                <img src={imagePreview} alt="College preview" className="mx-auto h-24 object-cover rounded" />
                                 <button 
                                    type="button"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setFieldValue("image", null);
                                        setImagePreview(null);
                                    }}
                                    className="text-xs text-red-500 mt-2 hover:underline"
                                >
                                    Remove
                                </button>
                            </div>
                        ) : (
                            <div className="flex text-sm text-gray-600 flex-col items-center">
                                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <label htmlFor="image-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                                    <span>Upload a file</span>
                                    <input id="image-upload" name="image" type="file" className="sr-only" accept="image/*"
                                        onChange={(e) => {
                                            if (validateFile(e.target.files[0])) {
                                                setFieldValue("image", e.target.files[0]);
                                                setImagePreview(URL.createObjectURL(e.target.files[0]));
                                            }
                                        }}
                                    />
                                </label>
                            </div>
                        )}
                      </div>
                    </div>
                     <ErrorMessage name="image" component="div" className="mt-1 text-sm text-red-600" />
                  </div>
                </div>

                <div className="pt-6">
                    <button
                    type="submit"
                    disabled={loading || isSubmitting}
                    className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 
                                py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/30
                                hover:from-blue-700 hover:to-blue-800 hover:shadow-xl hover:shadow-blue-500/40
                                active:scale-[0.98] transition-all duration-200
                                disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg
                                disabled:active:scale-100"
                    >
                    {loading || isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Creating Account...
                        </span>
                        ) : (
                        "Create University Account"
                        )}
                    </button>
                </div>

                <div className="text-center pb-8">
                     <p className="text-sm text-gray-600">
                      Already have an account?{" "}
                      <button
                        type="button"
                        onClick={() => navigate("/university/login")}
                        className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        Sign In
                      </button>
                    </p>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>

       {/* RIGHT SECTION - Illustration */}
       <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden fixed h-screen w-1/2 right-0 top-0">
        {/* Decorative Elements */}
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
        
        {/* Content */}
        <div className="relative z-10 max-w-lg px-8 text-center">
          <img
            src={sideImage}
            alt="University illustration"
            className="w-full h-auto drop-shadow-2xl mb-8"
          />
          <h2 className="text-3xl font-bold text-white mb-4">
             Join Our Global Network
          </h2>
          <p className="text-lg text-blue-100">
             Showcase your university to millions of students and simplify your admission process.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UniversitySignUp;
