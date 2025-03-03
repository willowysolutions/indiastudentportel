import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import sideImage from "../../assets/loginPage image.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { universityLogin } from "../../Redux/features/University/AuthUniversityLogin";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UniversityLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
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

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (values, { setSubmitting }) => {
    const actionResult = await dispatch(universityLogin(values));

    if (universityLogin?.fulfilled.match(actionResult)) {
      navigate("/university/dashboard");
    } else {
      const message = actionResult.payload
        ? actionResult.payload.error
        : "Login failed";
      console.error(message);
      toast.error(message);
    }
    setSubmitting(false);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSignUp = () => {
    navigate("/university/signup");
  };

  return (
    <div className="grid lg:grid-cols-2 md:grid-cols-1">
      <div className="flex min-h-screen bg-white flex-col justify-center px-4 sm:px-6 lg:px-8">
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-[45px] font-bold">College Login</h2>
          <p className="text-gray-600">Enter your account detail</p>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6">
                <div>
                  <div className="border-[1px] border-gray-300 rounded-md gap-2 flex items-center mt-2">
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="block w-full px-2 border-0 py-1.5 focus:outline-none ring-0 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                      placeholder="Username"
                    />
                  </div>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-[15px]"
                  />
                </div>

                <div>
                  <div className="border-[1px] border-gray-300 rounded-md gap-2 flex items-center mt-2">
                    <Field
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      className="block w-full px-2 bg-[#F4F6FF] border-0 py-1.5  focus:outline-none placeholder:text-gray-400 sm:text-sm sm:leading-6"
                      placeholder="Password"
                    />
                    <button
                      type="button"
                      onClick={handleShowPassword}
                      className=" focus:outline-none p-2"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-[15px]"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 transition-colors duration-200 disabled:opacity-70"
                  >
                    {isSubmitting ? "Logging in..." : "Login"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
          <p className="text-[15px] flex gap-2 mt-2">
            If you are not signed up?{" "}
            <span
              className="text-indigo-500 cursor-pointer"
              onClick={handleSignUp}
            >
              Sign up
            </span>
          </p>
        </div>
      </div>
      <div className="hidden md:block bg-gradient-to-l from-[#C6E7FF] to-[white] px-8 py-20 md:px-40 md:py-40">
        <img src={sideImage} alt="side" className="w-full h-auto" />
      </div>
    </div>
  );
};

export default UniversityLogin;
