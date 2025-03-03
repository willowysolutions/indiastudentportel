import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import sideImage from "../../../assets/loginPage image.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { adminlogin } from "../../../Redux/features/adminauthSlice";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const AdminLogin = () => {
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

  const onSubmit = async (values) => {
    setLoading(true);
    dispatch(adminlogin(values))
      .then((res) => {
        if (res?.payload) {
          localStorage.setItem("token", res.payload.token);
          navigate("/admin/dashboard");
        } else {
          toast.error("Please check your email or password");
          setLoading(false);
        }
      })
      .catch((err) => {
        toast.error("Something went wrong!");
        setLoading(false); 
        console.error(err);
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div className="flex h-screen flex-col justify-center px-4 sm:px-6 lg:px-8">
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
        />
        <div className="rounded-md p-8 sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-3xl sm:text-[45px] font-bold">Admin Login</h2>
          <p className="text-sm sm:text-base">Enter your account details</p>
          <div className="mt-8 sm:mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-4 sm:space-y-6">
                  <div>
                    <div className="border-[1px] border-gray-300 gap-2 flex items-center mt-2">
                      <Field
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        className="block w-full px-2 border-0 py-1.5  focus:outline-none ring-0 placeholder:text-gray-400 sm:text-sm sm:leading-6"
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
                    <div className="border-[1px] border-gray-300 gap-2 flex items-center mt-2">
                      <Field
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        required
                        className="block w-full px-2 border-0 py-1.5 focus:outline-none placeholder:text-gray-400 sm:text-sm sm:leading-6"
                        placeholder="Password"
                      />
                      <span
                        className=" cursor-pointer"
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
                  <div className="w-full flex items-center justify-center">
                    <button
                      type="submit"
                      disabled={isSubmitting || loading}
                      className="flex w-full justify-center rounded-md bg-indigo-500  px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      {loading || isSubmitting ? "Logging..." : "Login"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      <div className="hidden lg:block bg-gradient-to-l from-[#C6E7FF] to-[white] p-8 xl:p-39">
        <img src={sideImage} alt="side" className="hidden md:block" />
      </div>
    </div>
  );
};

export default AdminLogin;



// import { Formik, Form, Field, ErrorMessage } from 'formik'
// import * as Yup from 'yup'
// import sideImage from '../../../assets/loginPage image.svg'
// import { useNavigate } from 'react-router-dom'
// import { useDispatch } from 'react-redux'
// import { adminlogin } from '../../../Redux/features/adminauthSlice'
// import { useState } from 'react'
// import { toast } from 'react-toastify'

// const AdminLogin = () => {
// 	const [loading, setLoading] = useState(false)
// 	const initialValues = {
// 		email: '',
// 		password: '',
// 	}

// 	const validationSchema = Yup.object().shape({
// 		email: Yup.string()
// 			.email('Invalid email')
// 			.required('Email is required')
// 			.matches(
// 				/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
// 				'Invalid email address'
// 			),
// 		password: Yup.string()
// 			.required('Password is required')
// 			.min(8, 'Password must be at least 8 characters'),
// 	})

// 	const handleShowPassword = (showPassword, setShowPassword) => {
// 		setShowPassword(!showPassword)
// 	}
// 	const dispatch = useDispatch()
// 	const navigate = useNavigate()

// 	const onSubmit = async values => {
// 		dispatch(adminlogin(values))
// 			.then(res => {
// 				if (res?.payload) {
// 					localStorage.setItem('token', res.payload.token)
// 					navigate('/admin/dashboard')
// 				} else {
// 					toast.error('Please check your email or password')
// 					setLoading(false)
// 				}
// 			})
// 			.catch(err => console.error(err))
// 	}

// 	return (
// 		<div className='grid grid-cols-2'>
// 			<div className='flex h-screen bg-[#1C1D21] W flex-col justify-center px-6 py-12 lg:px-8'>
// 				<div className='sm:mx-auto text-white sm:w-full sm:max-w-sm'>
// 					<h2 className='text-[45px] font-bold'>Loginn</h2>
// 					<p>Enter your account detail</p>
// 				</div>

// 				<div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
// 					<Formik
// 						initialValues={initialValues}
// 						validationSchema={validationSchema}
// 						onSubmit={onSubmit}
// 					>
// 						{({ isSubmitting }) => (
// 							<Form className='space-y-6'>
// 								<div>
// 									<div className='border-b-[1px] gap-2 flex items-center mt-2'>
// 										<Field
// 											id='email'
// 											name='email'
// 											type='email'
// 											autoComplete='email'
// 											className='block w-full px-2 bg-[#1C1D21] border-0 py-1.5 text-white focus:outline-none ring-0 placeholder:text-gray-400 sm:text-sm sm:leading-6'
// 											placeholder='Username'
// 										/>
// 									</div>
// 									<ErrorMessage
// 										name='email'
// 										component='div'
// 										className='text-red-500 text-[15px]'
// 									/>
// 								</div>
// 								<div>
// 									<div className='border-b-[1px] gap-2 flex items-center mt-2'>
// 										<Field
// 											id='password'
// 											name='password'
// 											type='password'
// 											autoComplete='current-password'
// 											required
// 											className='block w-full px-2 bg-[#1C1D21] border-0 py-1.5 text-white focus:outline-none placeholder:text-gray-400 sm:text-sm sm:leading-6'
// 											placeholder='Password'
// 										/>
// 									</div>
// 									<ErrorMessage
// 										name='password'
// 										component='div'
// 										className='text-red-500 text-[15px]'
// 									/>
// 								</div>
// 								<div className='mt-1'>
// 									<a href='#' className='text-gray-400 hover:text-gray-300'>
// 										Forgot password?
// 									</a>
// 								</div>
// 								<div className='w-full flex items-center justify-center'>
// 									<button
// 										type='submit'
// 										disabled={loading}
// 										className='flex w-full justify-center rounded-md bg-gradient-to-b from-sky-200 to-blue-100 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
// 									>
// 										Login
// 									</button>
// 								</div>
// 							</Form>
// 						)}
// 					</Formik>
// 				</div>
// 			</div>
// 			<div className='bg-gradient-to-b from-sky-200 to-blue-100 px-40 py-40 '>
// 				<h1 className='text-[60px] text-white leading-[55px] font-bold'>
// 					Welcome to Admin <br />
// 					<span className='font-normal'> portal</span>
// 				</h1>
// 				<img src={sideImage} alt='side' />
// 			</div>
// 		</div>
// 	)
// }

// export default AdminLogin
