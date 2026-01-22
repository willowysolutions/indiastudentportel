import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import sideImage from "../../assets/loginPage image.svg";
import { signupStudent } from "../../Redux/features/student/AuthStudentSlice";

const StudentSignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const SvalidationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be at most 50 characters"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
    contact: Yup.string()
      .required("Contact number is required")
      .matches(/^\d{10}$/, "Invalid phone number"),
    activeStatus: Yup.string().required("Active status is required"),
    class_name: Yup.string().required("Class is required"),
    school: Yup.string().required("Please fill the school field"),
    gender: Yup.string().required("Gender is required"),
    stream: Yup.string().required("stream is requiered"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      contact: "",
      address: "",
      activeStatus: "false",
      class_name: "",
      school: "",
      gender: "",
      stream: "",
    },

    validationSchema: SvalidationSchema,

    onSubmit: async (values, { setSubmitting }) => {
      setIsSubmitting(true);
      const actionResult = await dispatch(signupStudent(values));

      if (signupStudent.fulfilled.match(actionResult)) {
        toast.success(
          "Registration Successful. You can login if admin approves."
        );
        setTimeout(() => {
          navigate("/student/login");
        }, 3000);
      } else if (signupStudent.rejected.match(actionResult)) {
        const message = actionResult.payload
          ? actionResult.payload.errors[0]
          : "Signup failed";
        toast.error(message);
      }

      setSubmitting(false);
      setIsSubmitting(false);
    },
  });

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* LEFT SECTION - Signup Form */}
      <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 bg-white">
        <ToastContainer position="top-right" autoClose={3000} />
        
        <div className="w-full max-w-xl">
           {/* Header Section */}
           <div className="mb-10 text-center lg:text-left">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Join as a Student
            </h1>
            <p className="text-base text-gray-600">
              Create your account to start your educational journey
            </p>
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-5">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Name */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                  {...formik.getFieldProps("name")}
                />
                 {formik.touched.name && formik.errors.name && (
                  <div className="mt-1 text-sm text-red-600">{formik.errors.name}</div>
                )}
              </div>

               {/* Email */}
               <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                  {...formik.getFieldProps("email")}
                />
                 {formik.touched.email && formik.errors.email && (
                  <div className="mt-1 text-sm text-red-600">{formik.errors.email}</div>
                )}
              </div>

              {/* Contact */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                <input
                  type="text"
                  placeholder="1234567890"
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                  {...formik.getFieldProps("contact")}
                />
                 {formik.touched.contact && formik.errors.contact && (
                  <div className="mt-1 text-sm text-red-600">{formik.errors.contact}</div>
                )}
              </div>

               {/* Gender */}
               <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Gender</label>
                   <div className="flex gap-4 mt-3">
                      <label className="flex items-center cursor-pointer gap-2">
                        <input
                          type="radio"
                          name="gender"
                          value="male"
                           className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                          checked={formik.values.gender === "male"}
                          onChange={formik.handleChange}
                        />
                        <span className="text-sm text-gray-700">Male</span>
                      </label>
                      <label className="flex items-center cursor-pointer gap-2">
                        <input
                          type="radio"
                          name="gender"
                          value="female"
                           className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                          checked={formik.values.gender === "female"}
                          onChange={formik.handleChange}
                        />
                        <span className="text-sm text-gray-700">Female</span>
                      </label>
                       <label className="flex items-center cursor-pointer gap-2">
                        <input
                          type="radio"
                          name="gender"
                          value="other"
                           className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                          checked={formik.values.gender === "other"}
                          onChange={formik.handleChange}
                        />
                        <span className="text-sm text-gray-700">Other</span>
                      </label>
                    </div>
                     {formik.touched.gender && formik.errors.gender && (
                      <div className="mt-1 text-sm text-red-600">{formik.errors.gender}</div>
                    )}
               </div>

              {/* School */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">School Name</label>
                <input
                  type="text"
                  placeholder="Enter your school name"
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                  {...formik.getFieldProps("school")}
                />
                 {formik.touched.school && formik.errors.school && (
                  <div className="mt-1 text-sm text-red-600">{formik.errors.school}</div>
                )}
              </div>

               {/* Class */}
               <div>
                 <label className="block text-sm font-semibold text-gray-700 mb-2">Class</label>
                  <select
                    className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                    {...formik.getFieldProps("class_name")}
                  >
                    <option value="">Select Class</option>
                    <option value="10">10th</option>
                    <option value="11">11th</option>
                    <option value="12">12th</option>
                  </select>
                   {formik.touched.class_name && formik.errors.class_name && (
                    <div className="mt-1 text-sm text-red-600">{formik.errors.class_name}</div>
                  )}
               </div>

                {/* Stream */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Stream/Syllabus</label>
                  <select
                     className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                    {...formik.getFieldProps("stream")}
                  >
                    <option value="">
                      {formik.values.class_name == "10"
                        ? "Select Syllabus"
                        : "Select Stream"}
                    </option>
                    {formik.values.class_name == "10" && (
                      <>
                        <option value="CBSE">CBSE</option>
                        <option value="ICSE">ICSE</option>
                        <option value="JAC">JAC</option>
                      </>
                    )}
                    {formik.values.class_name !== "10" && (
                      <>
                        <option value="SWBM">Science (Bio & Math)</option>
                        <option value="SWB">Science (Bio)</option>
                        <option value="SWM">Science (Math)</option>
                        <option value="CWM">Commerce (Math)</option>
                        <option value="CWOM">Commerce (No Math)</option>
                        <option value="Arts">Arts</option>
                      </>
                    )}
                  </select>
                   {formik.touched.stream && formik.errors.stream && (
                    <div className="mt-1 text-sm text-red-600">{formik.errors.stream}</div>
                  )}
                </div>

                 {/* Address - Spans full width */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                    <input
                      type="text"
                       placeholder="Enter your full address"
                      className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                      {...formik.getFieldProps("address")}
                    />
                    {formik.touched.address && formik.errors.address && (
                      <div className="mt-1 text-sm text-red-600">{formik.errors.address}</div>
                    )}
                  </div>

              {/* Password */}
               <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="********"
                         className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all pr-12"
                        {...formik.getFieldProps("password")}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500 hover:text-gray-700 transition-colors"
                      >
                         {showPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
                      </button>
                    </div>
                     {formik.touched.password && formik.errors.password && (
                      <div className="mt-1 text-sm text-red-600">{formik.errors.password}</div>
                    )}
                  </div>

               {/* Confirm Password */}
               <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="********"
                         className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all pr-12"
                        {...formik.getFieldProps("confirmPassword")}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500 hover:text-gray-700 transition-colors"
                      >
                         {showConfirmPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
                      </button>
                    </div>
                     {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                      <div className="mt-1 text-sm text-red-600">{formik.errors.confirmPassword}</div>
                    )}
                  </div>
             </div>

            {/* Submit Button */}
            <button
                  type="submit"
                  disabled={isSubmitting || formik.isSubmitting}
                  className="w-full mt-6 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 
                             py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/30
                             hover:from-blue-700 hover:to-blue-800 hover:shadow-xl hover:shadow-blue-500/40
                             active:scale-[0.98] transition-all duration-200
                             disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg
                             disabled:active:scale-100"
                >
                   {isSubmitting ? (
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
                      <a
                        href="/student/login" 
                        className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        Sign In
                      </a>
                    </p>
                  </div>
          </form>
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
            alt="Student signup illustration"
             className="w-full h-auto drop-shadow-2xl mb-8"
          />
          <h2 className="text-3xl font-bold text-white mb-4">
            Join Our Student Community
          </h2>
          <p className="text-lg text-blue-100">
            Connect with peers, find the best opportunities, and shape your future.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentSignUp;
