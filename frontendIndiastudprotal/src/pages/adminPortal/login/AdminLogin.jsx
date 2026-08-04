import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { adminLogin } from '../../../Redux/features/admin/AdminAuthSlice'


const AdminLogin = () => {
	const initialValues = {
		email: '',
		password: '',
	}

	const validationSchema = Yup.object().shape({
		email: Yup.string()
			.email('Invalid email')
			.required('Email is required')
			.matches(
				/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
				'Invalid email address'
			),
		password: Yup.string()
			.required('Password is required')
			.min(8, 'Password must be at least 8 characters'),
	})

	const handleShowPassword = (showPassword, setShowPassword) => {
		setShowPassword(!showPassword)
	}
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const onSubmit = async values => {
		try {
			dispatch(adminLogin(values))
				.then(res => console.log(res))
				.catch(err => console.error(err))
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<div className='grid grid-cols-2'>
			<div className='flex h-screen bg-[#1C1D21] W flex-col justify-center px-6 py-12 lg:px-8'>
				<div className='sm:mx-auto text-white sm:w-full sm:max-w-sm'>
					<h2 className='text-[45px] font-bold'>Login</h2>
					<p>Enter your account detail</p>
				</div>

				<div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={onSubmit}
					>
						{({ isSubmitting }) => (
							<Form className='space-y-6'>
								<div>
									<div className='border-b-[1px] gap-2 flex items-center mt-2'>
										<Field
											id='email'
											name='email'
											type='email'
											autoComplete='email'
											required
											className='block w-full px-2 bg-[#1C1D21] border-0 py-1.5 text-white focus:outline-none ring-0 placeholder:text-gray-400 sm:text-sm sm:leading-6'
											placeholder='Username'
										/>
									</div>
									<ErrorMessage
										name='email'
										component='div'
										className='text-red-500 text-[15px]'
									/>
								</div>

								<div>
									<div className='border-b-[1px] gap-2 flex items-center mt-2'>
										<Field
											id='password'
											name='password'
											type='password'
											autoComplete='current-password'
											required
											className='block w-full px-2 bg-[#1C1D21] border-0 py-1.5 text-white focus:outline-none placeholder:text-gray-400 sm:text-sm sm:leading-6'
											placeholder='Password'
										/>
									</div>
									<ErrorMessage
										name='password'
										component='div'
										className='text-red-500 text-[15px]'
									/>
								</div>
								<div className='mt-1'>
									<a href='#' className='text-gray-400 hover:text-gray-300'>
										Forgot password?
									</a>
								</div>
								<div className='w-full flex items-center  justify-center'>
									<button
										type='submit'
										disabled={isSubmitting}
										className='flex w-full justify-center rounded-md bg-[#9C6FE4] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
									>
										Login
									</button>
								</div>
							</Form>
						)}
					</Formik>
					{/* <p className="text-white text-[15px] flex gap-2 mt-2">If you are not Signup ? <span className="text-[#9C6FE4]" onClick={handleSignUp}>Sign up</span></p> */}
				</div>
			</div>
			<div className='bg-gradient-to-b from-sky-200 to-blue-100 px-20 py-20 max-h-dvh '>
				<h1 className='text-[60px] text-white  font-bold'>
					Welcome to <br />
					<span className='font-normal'> portal</span>
				</h1>
				{/* <img src={sideImage} alt="side" /> */}
			</div>
		</div>
	)
}

export default AdminLogin
