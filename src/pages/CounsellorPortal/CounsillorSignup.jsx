import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { signupCounciler } from "../../Redux/features/Counciler/AuthCouncilerLogin";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import sideImage from "../../assets/loginPage image.svg";

const CounsillorSignup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    email: "",
    password: "",
    contact: "",
    address: "",
    session_mode: "",
    language: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name must be at most 50 characters"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
    session_mode: Yup.string().required("Session mode is required"),
    contact: Yup.string()
      .required("Contact number is required")
      .matches(/^\d{10}$/, "Invalid phone number"),
    address: Yup.string().required("Address is required"),
    language: Yup.string().required("Language is required"),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      setLoading(true);
      const actionResult = await dispatch(signupCounciler(values));

      if (actionResult.type === "counsellor/signup/fulfilled") {
        toast.success(
          "Registration Successful. You can login after admin approval"
        );
        setTimeout(() => {
          navigate("/counsellor/login");
        }, 3000);
      } else {
        const errorMessage =
          actionResult.payload?.message ||
          "Registration failed. Please try again.";
        toast.error(errorMessage);
        setLoading(false);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      setLoading(false);
    } finally {
      setSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const navigateNext = () => {
    navigate("/counsellor/login");
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* LEFT SECTION - Signup Form */}
      <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 bg-white">
        <ToastContainer position="top-right" autoClose={3000} />
        
        <div className="w-full max-w-xl">
           {/* Header Section */}
           <div className="mb-10 text-center lg:text-left">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Join as a Counsellor
            </h1>
            <p className="text-base text-gray-600">
              Create your account to start guiding students
            </p>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                    <Field
                      name="name"
                      type="text"
                      className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                      placeholder="John Doe"
                    />
                    <ErrorMessage name="name" component="div" className="mt-1 text-sm text-red-600" />
                  </div>

                   {/* Email */}
                   <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                    <Field
                      name="email"
                      type="email"
                      className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                      placeholder="john@example.com"
                    />
                    <ErrorMessage name="email" component="div" className="mt-1 text-sm text-red-600" />
                  </div>

                   {/* Password */}
                   <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                    <div className="relative">
                      <Field
                        name="password"
                        type={showPassword ? "text" : "password"}
                        className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all pr-12"
                        placeholder="********"
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500 hover:text-gray-700 transition-colors"
                      >
                         {showPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
                      </button>
                    </div>
                    <ErrorMessage name="password" component="div" className="mt-1 text-sm text-red-600" />
                  </div>

                   {/* Contact */}
                   <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                    <Field
                      name="contact"
                      type="text"
                      className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                      placeholder="1234567890"
                    />
                    <ErrorMessage name="contact" component="div" className="mt-1 text-sm text-red-600" />
                  </div>

                  {/* Address - Spans full width */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                    <Field
                      name="address"
                      type="text"
                      className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                      placeholder="Enter your full address"
                    />
                    <ErrorMessage name="address" component="div" className="mt-1 text-sm text-red-600" />
                  </div>

                   {/* Language */}
                   <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Language</label>
                    <Field
                      as="select"
                      name="language"
                      className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                    >
                      <option value="" disabled>Select language</option>
                      <option value="English">English</option>
                      <option value="Malayalam">Malayalam</option>
                      <option value="Hindi">Hindi</option>
                    </Field>
                    <ErrorMessage name="language" component="div" className="mt-1 text-sm text-red-600" />
                  </div>

                  {/* Session Mode */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Session Mode</label>
                     <div className="flex items-center gap-4 mt-3">
                      <label className="flex items-center cursor-pointer gap-2">
                        <Field type="radio" name="session_mode" value="online" className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300" />
                        <span className="text-sm text-gray-700">Online</span>
                      </label>
                      <label className="flex items-center cursor-pointer gap-2">
                        <Field type="radio" name="session_mode" value="hybrid" className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300" />
                        <span className="text-sm text-gray-700">Hybrid</span>
                      </label>
                    </div>
                     <ErrorMessage name="session_mode" component="div" className="mt-1 text-sm text-red-600" />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading || isSubmitting}
                  className="w-full mt-6 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 
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
                      "Sign Up"
                    )}
                </button>

                 <div className="text-center mt-6">
                    <p className="text-sm text-gray-600">
                      Already have an account?{" "}
                      <button
                        type="button"
                        onClick={navigateNext}
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
       <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
        
        {/* Content */}
        <div className="relative z-10 max-w-lg px-8 text-center">
          <img
            src={sideImage}
            alt="Admin dashboard illustration"
             className="w-full h-auto drop-shadow-2xl mb-8"
          />
          <h2 className="text-3xl font-bold text-white mb-4">
            Join Our Network
          </h2>
          <p className="text-lg text-blue-100">
            Connect with students and institutions to make a difference in education
          </p>
        </div>
      </div>
    </div>
  );
};

export default CounsillorSignup;
