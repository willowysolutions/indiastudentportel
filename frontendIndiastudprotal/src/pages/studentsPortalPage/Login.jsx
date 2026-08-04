import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import sideImage from "../../assets/loginPage image.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { studentLogin } from "../../Redux/features/student/AuthStudentSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email")
      .required("Email is required")
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        "Invalid email address"
      ),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    const actionResult = await dispatch(studentLogin(values));
    
    if (studentLogin.fulfilled.match(actionResult)) {
      // Handle success
       // Navigation handled by component state or effect usually, but here explicit
       // Keep timeout for user to see success message if needed, or navigate immediately.
       // The original code had a timeout.
      setTimeout(() => {
        navigate("/student/dashboard");
      }, 1000); 
    } else if (studentLogin.rejected.match(actionResult)) {
      // Handle error
      const message = actionResult.payload
        ? actionResult.payload.error
        : "Login failed";
      console.error(message);
      toast.error(message);
      setLoading(false);
    }
    setSubmitting(false);
  };

  const handleSignUp = () => {
    navigate("/student/signup");
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* LEFT SECTION - Login Form */}
      <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 bg-white">
        <ToastContainer position="top-center" autoClose={3000} />

        <div className="w-full max-w-md">
           {/* Header Section */}
           <div className="mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 shadow-lg shadow-blue-500/30 mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Student Login
            </h1>
            <p className="text-base text-gray-600">
              Welcome back! Please enter your details.
            </p>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-5">
                 {/* EMAIL FIELD */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                       Email Address
                    </label>
                    <Field
                      name="email"
                      type="email"
                      placeholder="student@example.com"
                       className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900
                                 placeholder:text-gray-400 focus:bg-white focus:border-blue-600 
                                 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                    />
                    <ErrorMessage
                      name="email"
                      component="p"
                      className="mt-2 text-sm text-red-600 font-medium"
                    />
                  </div>

                {/* PASSWORD FIELD */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Field
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900
                                   placeholder:text-gray-400 focus:bg-white focus:border-blue-600 
                                   focus:ring-4 focus:ring-blue-500/10 outline-none transition-all pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500 hover:text-gray-700 transition-colors"
                      >
                        {showPassword ? (
                          <FaEyeSlash className="w-5 h-5" />
                        ) : (
                          <FaEye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    <ErrorMessage
                      name="password"
                      component="p"
                      className="mt-2 text-sm text-red-600 font-medium"
                    />
                  </div>

                {/* SUBMIT BUTTON */}
                  <button
                    type="submit"
                    disabled={loading || isSubmitting}
                    className="w-full mt-8 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 
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
                        Logging in...
                      </span>
                    ) : (
                      "Sign In"
                    )}
                  </button>

                  <div className="text-center mt-6">
                    <p className="text-sm text-gray-600">
                      Don&apos;t have an account?{" "}
                      <button
                        type="button"
                        onClick={handleSignUp}
                        className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        Sign Up
                      </button>
                    </p>
                  </div>
              </Form>
            )}
          </Formik>

           {/* Footer */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-center text-sm text-gray-500">
                Protected by enterprise-grade security
              </p>
            </div>
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
            alt="Student dashboard illustration"
            className="w-full h-auto drop-shadow-2xl mb-8"
          />
          <h2 className="text-3xl font-bold text-white mb-4">
             Your Future Starts Here
          </h2>
          <p className="text-lg text-blue-100">
             Access personalized career guidance, admission support, and connect with top universities.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
