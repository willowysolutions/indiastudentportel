import React, { useState } from "react";
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
    session_mode: Yup.string().required("Employment type is required"),
    contact: Yup.string()
      .required("Contact number is required")
      .matches(/^\d{10}$/, "Invalid phone number"),
    address: Yup.string().required("Address is required"),
    language: Yup.string().required("Language is required"),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true);
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
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const navigateNext = () => {
    navigate("../counsellor/login");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div className="flex h-screen  items-center flex-col justify-center px-6 py-12 lg:px-8">
        <div className="pt-9 pb-9 px-8 py-20 text-center">
          <h2 className="text-[45px] font-bold">SignUp Counsellor</h2>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6 mt-4">
                <div className="flex flex-col gap-4">
                  <div>
                    <div className="border-[1px] border-gray-300 rounded-md lg:w-[30rem] gap-2 flex items-center mt-2">
                      <Field
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        className="block w-full px-2 bg-[#FFFFFF] border-0 py-1.5 text-[#2E3A59] focus:outline-none ring-0 placeholder:text-[#B1B9C1] sm:text-sm sm:leading-6"
                        placeholder="Name"
                      />
                    </div>
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-500 text-[15px]"
                    />
                  </div>

                  <div>
                    <div className="border-[1px] border-gray-300 rounded-md gap-2 flex items-center mt-2">
                      <Field
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="block w-full px-2 bg-[#FFFFFF] border-0 py-1.5 text-[#2E3A59] focus:outline-none ring-0 placeholder:text-[#B1B9C1] sm:text-sm sm:leading-6"
                        placeholder="Email"
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
                        autoComplete="new-password"
                        required
                        className="block w-full px-2 bg-[#FFFFFF] border-0 py-1.5 text-[#2E3A59] focus:outline-none ring-0 placeholder:text-[#B1B9C1] sm:text-sm sm:leading-6"
                        placeholder="Password"
                      />
                      <span
                        className="text-[#2E3A59] cursor-pointer m-2"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </span>
                    </div>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-[15px]"
                    />
                  </div>

                  <div>
                    <div className="border-[1px] border-gray-300 rounded-md gap-2 flex items-center mt-2">
                      <Field
                        id="contact"
                        name="contact"
                        type="text"
                        required
                        className="block w-full px-2 bg-[#FFFFFF] border-0 py-1.5 text-[#2E3A59] focus:outline-none ring-0 placeholder:text-[#B1B9C1] sm:text-sm sm:leading-6"
                        placeholder="Contact"
                      />
                    </div>
                    <ErrorMessage
                      name="contact"
                      component="div"
                      className="text-red-500 text-[15px]"
                    />
                  </div>
                  <div>
                    <div className="border-[1px] border-gray-300 rounded-md gap-2 flex items-center mt-2">
                      <Field
                        id="address"
                        name="address"
                        type="text"
                        required
                        className="block w-full px-2 bg-[#FFFFFF] border-0 py-1.5 text-[#2E3A59] focus:outline-none ring-0 placeholder:text-[#B1B9C1] sm:text-sm sm:leading-6"
                        placeholder="Address"
                      />
                    </div>
                    <ErrorMessage
                      name="address"
                      component="div"
                      className="text-red-500 text-[15px]"
                    />
                  </div>
                  <div>
                    <div className="border-[1px] border-gray-300 rounded-md gap-2 flex items-center mt-2">
                      <Field
                        as="select"
                        id="language"
                        name="language"
                        required
                        className="block w-full px-2 bg-[#FFFFFF] border-0 py-1.5 text-[#2E3A59] focus:outline-none ring-0 placeholder:text-[#B1B9C1] sm:text-sm sm:leading-6"
                      >
                        <option value="" disabled>
                          Select language
                        </option>
                        <option value="English">English</option>
                        <option value="Malayalam">Malayalam</option>
                        <option value="Hindi">Hindi</option>
                      </Field>
                    </div>
                    <ErrorMessage
                      name="language"
                      component="div"
                      className="text-red-500 text-[15px]"
                    />
                  </div>

                  <div className="flex items-center gap-2 text-[#2E3A59] focus:outline-none ring-0">
                    <span>Session Mode:</span>
                    <label>
                      <Field type="radio" name="session_mode" value="online" />
                      Online
                    </label>
                    <label>
                      <Field type="radio" name="session_mode" value="hybrid" />
                      Hybrid
                    </label>
                  </div>
                </div>
                <div>
                  <span className="text-[#2E3A59]">Already have an account?</span>
                  <a
                    onClick={navigateNext}
                    className="text-[#9C6FE4] text-blue"
                  >
                    {" "}
                    Login
                  </a>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-[#9C6FE4] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors duration-200 disabled:opacity-70"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Registering..." : "Sign Up"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <div className="hidden lg:block bg-gradient-to-l from-[#C6E7FF] to-[white] p-8 xl:p-39">
        <img
          className="object-cover w-full"
          src={sideImage}
          alt="Signup Page"
        />
      </div>
    </div>
  );
};

export default CounsillorSignup;

// import React, { useState } from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import * as Yup from "yup";
// import { useDispatch } from "react-redux";
// import { signupCounciler } from "../../Redux/features/Counciler/AuthCouncilerLogin";
// import { useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import sideImage from "../../assets/loginPage image.svg";
// //imports................................................................................................

// const CounsillorSignup = () => {

//   const [showPassword, setShowPassword] = useState(false);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const initialValues = {
//     name: "",
//     email: "",
//     password: "",
//     contact: "",
//     address: "",
//     session_mode: "",
//     language: "",
//   };

//   const validationSchema = Yup.object().shape({
//     name: Yup.string()
//       .required("Name is required")
//       .min(3, "Name must be at least 3 characters")
//       .max(50, "Name must be at most 50 characters"),
//     email: Yup.string().email("Invalid email").required("Email is required"),
//     password: Yup.string()
//       .required("Password is required")
//       .min(8, "Password must be at least 8 characters"),
//     session_mode: Yup.string().required("Employment type is required"),
//     contact: Yup.string()
//       .required("Contact number is required")
//       .matches(/^\d{10}$/, "Invalid phone number"),
//     address: Yup.string().required("Address is required"),
//     language: Yup.string().required("language is required"),
//   });

//   const onSubmit = async (values, { setSubmitting }) => {
//     try {
//       setSubmitting(true);
//       const actionResult = await dispatch(signupCounciler(values));

//       if (actionResult.type === "counsellor/signup/fulfilled") {
//         toast.success(
//           "Registration Successful. You can login after admin approval"
//         );
//         setTimeout(() => {
//           navigate("/counsellor/login");
//         }, 3000);
//       } else {
//         // Handle specific error messages from backend
//         const errorMessage =
//           actionResult.payload?.message ||
//           "Registration failed. Please try again.";
//         toast.error(errorMessage);
//       }
//     } catch (error) {
//       toast.error("Something went wrong. Please try again.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };
//   const navigateNext = () => {
//     navigate("../counsellor/login");
//   };

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2">
//       <div className="flex h-screen bg-[#F5F6FA] items-center flex-col  justify-center px-6 py-12 lg:px-8">
//         <div className="border-[1px] pt-9 pb-9 px-8 py-20 text-center rounded-md border-gray-400">
//           <h2 className="text-[45px] text-white font-bold">SignUp Counsellor</h2>
//           <ToastContainer
//             position="top-right"
//             autoClose={3000}
//             hideProgressBar={false}
//             newestOnTop={false}
//             closeOnClick
//             rtl={false}
//             pauseOnFocusLoss
//             draggable
//             pauseOnHover
//           />
//           <Formik
//             initialValues={initialValues}
//             validationSchema={validationSchema}
//             onSubmit={onSubmit}
//           >
//             {({ isSubmitting }) => (
//               <Form className="space-y-6 mt-4">
//                 <div className="flex flex-col gap-4">
//                   <div>
//                     <div className="border-[1px] border-gray-300 rounded-md lg:w-[30rem] gap-2 flex items-center mt-2">
//                       <Field
//                         id="name"
//                         name="name"
//                         type="text"
//                         autoComplete="name"
//                         required
//                         className="block w-full px-2 bg-[#1C1D21] border-0 py-1.5 text-white focus:outline-none ring-0 placeholder:text-gray-400 sm:text-sm sm:leading-6"
//                         placeholder="Name"
//                       />
//                     </div>
//                     <ErrorMessage
//                       name="name"
//                       component="div"
//                       className="text-red-500  text-[15px]"
//                     />
//                   </div>

//                   <div>
//                     <div className="border-[1px] border-gray-300 rounded-md gap-2 flex items-center mt-2">
//                       <Field
//                         id="email"
//                         name="email"
//                         type="email"
//                         autoComplete="email"
//                         required
//                         className="block w-full px-2 bg-[#1C1D21] border-0 py-1.5 text-white focus:outline-none ring-0 placeholder:text-gray-400 sm:text-sm sm:leading-6"
//                         placeholder="Email"
//                       />
//                     </div>
//                     <ErrorMessage
//                       name="email"
//                       component="div"
//                       className="text-red-500 text-[15px]"
//                     />
//                   </div>

//                   <div>
//                     <div className="border-[1px] border-gray-300 rounded-md gap-2 flex items-center mt-2">
//                       <Field
//                         id="password"
//                         name="password"
//                         type={showPassword ? "text" : "password"}
//                         autoComplete="new-password"
//                         required
//                         className="block w-full px-2 bg-[#1C1D21] border-0 py-1.5 text-white focus:outline-none ring-0 placeholder:text-gray-400 sm:text-sm sm:leading-6"
//                         placeholder="Password"
//                       />
//                       <span
//                         className="text-white cursor-pointer"
//                         onClick={togglePasswordVisibility}
//                       >
//                         {showPassword ? <FaEyeSlash /> : <FaEye />}
//                       </span>
//                     </div>
//                     <ErrorMessage
//                       name="password"
//                       component="div"
//                       className="text-red-500 text-[15px]"
//                     />
//                   </div>

//                   <div>
//                     <div className="border-[1px] border-gray-300 rounded-md gap-2 flex items-center mt-2">
//                       <Field
//                         id="contact"
//                         name="contact"
//                         type="text"
//                         required
//                         className="block w-full px-2 bg-[#1C1D21] border-0 py-1.5 text-white focus:outline-none ring-0 placeholder:text-gray-400 sm:text-sm sm:leading-6"
//                         placeholder="Contact"
//                       />
//                     </div>
//                     <ErrorMessage
//                       name="contact"
//                       component="div"
//                       className="text-red-500 text-[15px]"
//                     />
//                   </div>
//                   <div>
//                     <div className="border-[1px] border-gray-300 rounded-md gap-2 flex items-center mt-2">
//                       <Field
//                         id="address"
//                         name="address"
//                         type="text"
//                         required
//                         className="block w-full px-2 bg-[#1C1D21] border-0 py-1.5 text-white focus:outline-none ring-0 placeholder:text-gray-400 sm:text-sm sm:leading-6"
//                         placeholder="Address"
//                       />
//                     </div>
//                     <ErrorMessage
//                       name="address"
//                       component="div"
//                       className="text-red-500 text-[15px]"
//                     />
//                   </div>
//                   <div>
//                     <div className="border-[1px] border-gray-300 rounded-md gap-2 flex items-center mt-2">
//                       <Field
//                         as="select"
//                         id="language"
//                         name="language"
//                         required
//                         className="block w-full px-2 bg-[#1C1D21] border-0 py-1.5 text-white focus:outline-none ring-0 placeholder:text-gray-400 sm:text-sm sm:leading-6"
//                       >
//                         <option value="" disabled>
//                           Select language
//                         </option>
//                         <option value="English">English</option>
//                         <option value="Malayalam">Malayalam</option>
//                         <option value="Hindi">Hindi</option>
//                       </Field>
//                     </div>
//                     <ErrorMessage
//                       name="language"
//                       component="div"
//                       className="text-red-500 text-[15px]"
//                     />
//                   </div>

//                   <div className="flex items-center gap-2 text-white focus:outline-none ring-0">
//                     <span>Session Mode:</span>
//                     <label>
//                       <Field type="radio" name="session_mode" value="online" />
//                       Online
//                     </label>
//                     <label>
//                       <Field type="radio" name="session_mode" value="hybrid" />
//                       Hybrid
//                     </label>
//                   </div>
//                 </div>
//                 <div>
//                   <span className="text-white">Already have an account?</span>
//                   <a
//                     onClick={navigateNext}
//                     className="text-[#9C6FE4] text-blue"
//                   >
//                     {" "}
//                     Login
//                   </a>
//                 </div>

//                 <div>
//                   <button
//                     type="submit"
//                     className="flex w-full justify-center rounded-md bg-[#9C6FE4] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors duration-200 disabled:opacity-70"
//                     disabled={isSubmitting}
//                   >
//                     {isSubmitting ? "Registering..." : "Sign Up"}
//                   </button>
//                 </div>
//               </Form>
//             )}
//           </Formik>
//         </div>
//       </div>
//       <div className="hidden lg:flex h-screen">
//         <img
//           className="object-cover w-full"
//           src={sideImage}
//           alt="Signup Page"
//         />
//       </div>
//     </div>
//   );
// };

// export default CounsillorSignup;
