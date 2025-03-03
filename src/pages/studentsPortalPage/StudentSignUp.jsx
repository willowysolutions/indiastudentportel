import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import sideImage from "../../assets/loginPage image.svg";
import { signupStudent } from "../../Redux/features/student/AuthStudentSlice";
//imports................................................................................................

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
      console.log("Form Submit", values);
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
    <div className="grid lg:grid-cols-2 grid-cols-1">
      <div className="flex h-screen flex-col justify-center px-2 sm:px-6 py-8 lg:py-12 lg:px-8">
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <div className="px-8 py-20 text-center rounded-md">
          <h2 className="text-[45px] font-bold">Sign Up</h2>
          <form onSubmit={formik.handleSubmit} className="space-y-6 mt-4">
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
              <div>
                <div className="border-[1px] border-gray-300 rounded-md gap-2 flex items-center mt-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className="block w-full px-2 border-0 py-1.5 focus:outline-none ring-0 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    placeholder="Name"
                    {...formik.getFieldProps("name")}
                  />
                </div>
                {formik.touched.name && formik.errors.name && (
                  <div className="text-red-500 text-[15px]">
                    {formik.errors.name}
                  </div>
                )}
              </div>

              <div>
                <div className="border-[1px] border-gray-300 rounded-md gap-2 flex items-center mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="block w-full px-2 border-0 py-1.5  focus:outline-none ring-0 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    placeholder="Email"
                    {...formik.getFieldProps("email")}
                  />
                </div>
                {formik.touched.email && formik.errors.email && (
                  <div className="text-red-500 text-[15px]">
                    {formik.errors.email}
                  </div>
                )}
              </div>
              <div>
                <div className="border-[1px] border-gray-300 rounded-md gap-2 flex items-center mt-2">
                  <input
                    id="contact"
                    name="contact"
                    type="text"
                    className="block w-full px-2 border-0 py-1.5 focus:outline-none ring-0 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    placeholder="Contact"
                    {...formik.getFieldProps("contact")}
                  />
                </div>
                {formik.touched.contact && formik.errors.contact && (
                  <div className="text-red-500 text-[15px]">
                    {formik.errors.contact}
                  </div>
                )}
              </div>
              <div className="mt-4">
                <div className="flex flex-wrap items-center gap-4">
                  <label className="flex items-center cursor-pointer gap-2">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      className="appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-gradient-to-b from-[#C6E7FF] to-[#d7e4f0] checked:border-[#9C6FE4] focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                      checked={formik.values.gender === "male"}
                      onChange={formik.handleChange}
                    />
                    Male
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      className="appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-gradient-to-b from-[#C6E7FF] to-[#d7e4f0] checked:border-[#9C6FE4] focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                      checked={formik.values.gender === "female"}
                      onChange={formik.handleChange}
                    />
                    Female
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value="other"
                      className="appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-gradient-to-b from-[#C6E7FF] to-[#d7e4f0] checked:border-[#9C6FE4] focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                      checked={formik.values.gender === "other"}
                      onChange={formik.handleChange}
                    />
                    Other
                  </label>
                </div>
                {formik.touched.gender && formik.errors.gender && (
                  <div className="text-red-500 text-[15px]">
                    {formik.errors.gender}
                  </div>
                )}
              </div>
              <div>
                <div className="border-[1px] border-gray-300 rounded-md gap-2 flex items-center mt-2">
                  <input
                    id="address"
                    name="address"
                    type="address"
                    className="block w-full px-2 border-0 py-1.5  focus:outline-none ring-0 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    placeholder="Address"
                    {...formik.getFieldProps("address")}
                  />
                </div>
                {formik.touched.address && formik.errors.address && (
                  <div className="text-red-500 text-[15px]">
                    {formik.errors.address}
                  </div>
                )}
              </div>
              <div>
                <div className="border-[1px] border-gray-300 rounded-md gap-2 flex items-center mt-2">
                  <input
                    id="school"
                    name="school"
                    type="text"
                    className="block w-full px-2 border-0 py-1.5 focus:outline-none ring-0 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    placeholder="School"
                    {...formik.getFieldProps("school")}
                  />
                </div>
                {formik.touched.school && formik.errors.school && (
                  <div className="text-red-500 text-[15px]">
                    {formik.errors.school}
                  </div>
                )}
              </div>

              <div className="w-full">
                <div className="border-[1px] border-gray-300 rounded-md gap-2 flex items-center mt-2">
                  <select
                    name="class_name"
                    className="block w-full px-2 bg-[#FFFFFF] border-0 py-1.5 text-[#2E3A59] focus:outline-none ring-0 placeholder:text-[#B1B9C1] sm:text-sm sm:leading-6"
                    {...formik.getFieldProps("class_name")}
                  >
                    <option value="">Please Select Class</option>
                    <option value="10">10th</option>
                    <option value="11">11th</option>
                    <option value="12">12th</option>
                  </select>
                </div>
                {formik.touched.class_name && formik.errors.class_name && (
                  <div className="text-red-500 text-[15px]">
                    {formik.errors.class_name}
                  </div>
                )}
              </div>

              <div>
                <div className="border-[1px] border-gray-300 rounded-md gap-2 flex items-center mt-2">
                  <select
                    name="stream"
                    className="block w-full px-2 bg-[#FFFFFF] border-0 py-1.5 text-[#2E3A59] focus:outline-none ring-0 placeholder:text-[#B1B9C1] sm:text-sm sm:leading-6"
                    {...formik.getFieldProps("stream")}
                  >
                    <option value="">
                      {formik.values.class_name == "10"
                        ? "Please Select Syllabus"
                        : "Please Select Stream"}
                    </option>
                    {formik.values.class_name == "10" && (
                      <>
                        <option value="CBSE">CBSE</option>
                        <option value="ICSE">ICSE</option>
                        <option value="JAC">JAC</option>{" "}
                      </>
                    )}
                    {formik.values.class_name !== "10" && (
                      <>
                        <option value="SWBM">
                          Science (With Bio and Math)
                        </option>
                        <option value="SWB">Science (With Bio)</option>
                        <option value="SWM">Science (With Math)</option>
                        <option value="CWM">Commerce (With Math)</option>
                        <option value="CWOM">Commerce (Without math)</option>
                        <option value="Arts">Arts</option>
                      </>
                    )}
                  </select>
                </div>
                {formik.touched.stream && formik.errors.stream && (
                  <div className="text-red-500 text-[15px]">
                    {formik.errors.stream}
                  </div>
                )}
              </div>
            </div>

            <div className="relative mt-2">
              <div className="border-[1px] border-gray-300 rounded-md gap-2 flex items-center">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="block w-full px-2 border-0 py-1.5 focus:outline-none ring-0 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  placeholder="Password"
                  {...formik.getFieldProps("password")}
                />
                <button
                  type="button"
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-600 p-2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-500 text-[15px]">
                  {formik.errors.password}
                </div>
              )}
            </div>

            <div className="relative mt-2">
              <div className="border-[1px] border-gray-300 rounded-md gap-2 flex items-center">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  className="block w-full px-2 border-0 py-1.5 focus:outline-none ring-0 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  placeholder="Confirm Password"
                  {...formik.getFieldProps("confirmPassword")}
                />
                <button
                  type="button"
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-600 p-2"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <div className="text-red-500 text-[15px]">
                    {formik.errors.confirmPassword}
                  </div>
                )}
            </div>
            <div>
              <span>Already have an account?</span>
              <a href="/student/login" className="text-[#483898] text-blue">
                {" "}
                Login
              </a>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 transition-colors duration-200 disabled:opacity-70"
                disabled={isSubmitting || formik.isSubmitting}
              >
                {isSubmitting ? "Signing Up..." : "SignUp"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="hidden lg:block bg-gradient-to-l from-[#C6E7FF] to-[white] p-8 xl:p-39">
        <img
          className="max-w-full h-auto mt-8"
          src={sideImage}
          alt="Signup Page"
        />
      </div>
    </div>
  );
};

export default StudentSignUp;
