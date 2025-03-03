import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import sideImage from "../../assets/loginPage image.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { studentLogin } from "../../Redux/features/student/AuthStudentSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StudentPreLogin from "./StudentPreLogin";
//imports................................................................................................

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

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
    // .matches(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$.!%*#?&]/,
    //   "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    // ),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    const actionResult = await dispatch(studentLogin(values));
    console.log(actionResult, "resulte in the suignup");

    if (studentLogin.fulfilled.match(actionResult)) {
      // Handle success
      setTimeout(() => {
        navigate("/student/dashboard");
      }, 3000);
    } else if (studentLogin.rejected.match(actionResult)) {
      // Handle error
      const message = actionResult.payload
        ? actionResult.payload.error
        : "Signup failed";
      console.error(message);
      toast.error(message);
    }

    setSubmitting(false);
  };

  const handleSignUp = () => {
    navigate("/student/signup");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      <div className="grid lg:grid-cols-2 md:grid-cols-1">
        <div className="flex min-h-screen bg-white flex-col justify-center px-4 sm:px-6 lg:px-8">
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
          <div className="sm:mx-auto w-full max-w-sm px-4">
            <h2 className="text-3xl sm:text-[45px] font-bold ">Login</h2>
            <p className="text-sm sm:text-base mt-3">
              Enter your account details
            </p>
          </div>

          <div className="mt-8 sm:mt-10 sm:mx-auto w-full max-w-sm px-4">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-4 sm:space-y-6">
                  <div>
                    <div className="border-[1px] border-gray-300 rounded-md gap-2 flex items-center focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500 transition duration-200">
                      <Field
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        className="block w-full px-2 py-2 border-0 focus:outline-none ring-0 placeholder:text-gray-400 text-sm sm:text-base"
                        placeholder="Email Address"
                      />
                    </div>
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-xs sm:text-sm mt-1"
                    />
                  </div>

                  <div>
                    <div className="border-[1px] border-gray-300 rounded-md gap-2 flex items-center focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500 transition duration-200">
                      <Field
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        className="block w-full px-2 py-2 border-0 focus:outline-none ring-0 placeholder:text-gray-400 text-sm sm:text-base"
                        placeholder="Password"
                      />
                      <span
                        className="cursor-pointer text-gray-500 hover:text-gray-700 m-3"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </span>
                    </div>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-xs sm:text-sm mt-1"
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex w-full justify-center rounded-md  bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 transition-colors duration-200 disabled:opacity-70"
                    >
                      {isSubmitting ? "Logging in..." : "Login"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
            <div className=" text-[15px] flex gap-2 mt-4">
              Don't have an account?{" "}
              <span
                className="text-[#9C6FE4] cursor-pointer"
                onClick={handleSignUp}
              >
                SignUp
              </span>
            </div>
          </div>
        </div>
        <div className="hidden lg:block bg-gradient-to-l from-[#C6E7FF] to-[white] p-8 xl:p-39">
          {/* <h1 className="text-4xl xl:text-[60px] text-white leading-tight font-bold">
            Welcome to <br />
            <span className="font-normal"> portal</span>
          </h1> */}
          <img
            src={sideImage}
            alt="Welcome illustration"
            className="max-w-full h-auto mt-8"
          />
        </div>
      </div>
    </>
  );
};

export default Login;
