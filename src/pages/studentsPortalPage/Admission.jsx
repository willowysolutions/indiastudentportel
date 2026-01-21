import { FaWpforms } from 'react-icons/fa'
import Header from '../../components/Header'
import { RiRoadMapLine } from 'react-icons/ri'
import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import SelectBox from '../../components/SelectBox'
import { LiaUniversitySolid } from 'react-icons/lia'
import { BiSolidSchool } from 'react-icons/bi'
import { LuTextSelect } from 'react-icons/lu'
import Button from '../../components/Button'
import { useEffect, useMemo, useState } from 'react'
import Input from '../../components/Input'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
	createAdmission,
	getAUniversityforAddmission,
} from '../../Redux/features/student/StudentSlice'


const Admission = () => {
	const dispatch = useDispatch()
	const states = useSelector(state => state?.student?.states)
	const universities = useSelector(state => state?.student?.universities)
	const studentId = useSelector(state => state?.studentAuth?.studentDetails?.id)

	useEffect(() => {
		dispatch(getAUniversityforAddmission())
	}, [])

	const [switchForm, setSwitchForm] = useState('Admission')

	const admissionSchema = Yup.object().shape({
		university_state: Yup.string().required('State is required'),
		university_id: Yup.string().required('University is required'),
		college_id: Yup.string().required('College is required'),
		course_id: Yup.string().required('Course is required'),
		// personal details
	})

	const personalDetails = Yup.object().shape({
		student_name: Yup.string().required('Name is required'),
		guardian: Yup.string().required('Guardian name is required'),
		dob: Yup.date().required('Date of Birth is required'),
		gender: Yup.string().required('Gender is required'),
		contact: Yup.string()
			.matches(
				/^(\+\d{1,2}\s)?\(?[0-9]{3}\)?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/,
				'Mobile number is not valid'
			)
			.required('Mobile is required'),
		email: Yup.string()
			.email('Email is not valid')
			.required('Email is required'),
		address: Yup.string().required('Address is required'),
		district: Yup.string().required('District is required'),
		state: Yup.string().required('State is required'), // Ensure this doesn't conflict with your "State" select for college/university. Consider renaming if needed.
		nationality: Yup.string().required('Nationality is required'),
		religion: Yup.string().required('Religion is required'),
		current_class: Yup.string().required('Current Class is required'),
		current_school: Yup.string().required('Current School is required'),
		stream: Yup.string().required('Stream is required'),
		student_id: Yup.string(),
	})

	const gender = [
		{ value: 'male', label: 'Male' },
		{ value: 'female', label: 'Female' },
		{ value: 'other', label: 'Other' },
	]

	const studentFormSchema = [
		{ name: 'student_name', label: 'Name', type: 'text' },
		{ name: 'guardian', label: 'Guardian', type: 'text' },
		{ name: 'dob', label: 'Date of Birth', type: 'date' },
		{
			name: 'gender',
			label: 'Gender',
			type: 'select',
			options: gender.map(gender => ({
				value: gender.name,
				label: gender.label,
			})),
		},
		{ name: 'contact', label: 'Mobile', type: 'tel' },
		{ name: 'email', label: 'Email', type: 'email' },
		{ name: 'address', label: 'Address', type: 'text' },
		{ name: 'district', label: 'District', type: 'text' },
		{
			name: 'state',
			label: 'State',
			type: 'select',
			options: states?.map(state => ({ value: state.id, label: state.state })),
		},
		{ name: 'nationality', label: 'Nationality', type: 'text' },
		{ name: 'religion', label: 'Religion', type: 'text' },
		{ name: 'current_class', label: 'Current Class', type: 'text' },
		{ name: 'current_school', label: 'Current School', type: 'text' },
		{ name: 'stream', label: 'Stream', type: 'text' },
	]

	const [selectedState, setSelectedState] = useState(null)
	const [selectedUniversity, setSelectedUniversity] = useState(null)
	const [selectedCollege, setSelectedCollege] = useState(null)

	const handleStateChange = e => {
		const selectedStateId = e.target.value
		setSelectedState(selectedStateId)
	}
	const handleUniversityChange = e => {
		const SelectedUniversityId = e.target.value
		setSelectedUniversity(SelectedUniversityId)
	}
	const handleCollegeChange = e => {
		const SelectedCollegeId = e.target.value
		setSelectedCollege(SelectedCollegeId)
	}

	const stateOptions = states?.map(state => ({
		value: state?.id?.toString(),
		label: state?.state,
	}))

	const universityOptions = useMemo(() => {
		if (selectedState) {
			return universities
				?.filter(university => university.state_id == parseInt(selectedState))
				?.map(university => ({
					value: university?.id.toString(),
					label: university?.details.name,
				}))
		} else {
			return universities?.map(university => ({
				value: university?.id.toString(),
				label: university?.details.name,
			}))
		}
	}, [universities, selectedState])

	const collegeOptions = useMemo(() => {
		if (selectedUniversity) {
			return (
				universities
					.find(university => university.id === parseInt(selectedUniversity)) // Find the matching university
					?.colleges // Access its colleges
					?.map(college => ({
						value: college.id,
						label: college.name,
					})) || []
			)
		} else {
			return universities?.map(university => ({
				value: university?.id?.toString(),
				label: university?.details?.name,
			}))
		}
	}, [universities, selectedState, selectedUniversity])

	const courseOptions = useMemo(() => {
		const targetCollegeId = selectedCollege

		// Step 1: Flatten all colleges from all universities into a single array
		const allColleges = universities?.flatMap(
			university => university?.colleges
		)

		// Step 2: Find the specific college by the given ID
		const targetCollege = allColleges?.find(
			college => college.id === parseInt(targetCollegeId)
		)
		if (targetCollege && targetCollege?.courses) {
			console.log('Selected', parseInt(selectedState), universities[0].state_id)
			return targetCollege?.courses?.map(course => ({
				value: course.id, // Assuming each course has an 'id'
				label: course.course_name, // Assuming the name of the course is in 'course_name'
			}))
		} else {
			return universities?.map(university => ({
				value: university?.id?.toString(),
				label: university?.details?.name,
			}))
		}
	}, [universities, selectedState, selectedCollege])

	const navigate = useNavigate()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(
			switchForm === 'Admission' ? admissionSchema : personalDetails
		),
	})

	const onSubmit = data => {
		console.log(data)
		event.preventDefault()
		if (switchForm === 'Admission') {
			setSwitchForm('PersonalDetails') // Switch to personal details form
		} else {
			// Handle the final submission here
			const submissionData = {
				...data,
				student_id: studentId, // Assuming studentId is the variable holding the student's ID from Redux
			}
			console.log('Final Submission', submissionData)
			dispatch(createAdmission(submissionData))
			// Maybe reset the form or navigate to a success page
			navigate('/student')
		}
	}

	return (
		<div className="space-y-6 w-full px-4 sm:px-6 lg:px-8 pb-10">
			<Header title='Admission' Icon={FaWpforms} />
            
            <div className="bg-white rounded-3xl shadow-xl shadow-indigo-100/50 border border-slate-100 overflow-hidden p-8">
                {switchForm === 'Admission' && (
                    <div className='mt-2'>
                        <div
                            className='text-black bg-green-600'
                            onClick={() => setSwitchForm('PersonalDetails')}
                        ></div>
                        <div className='text-zinc-600 font-bold text-[1.6rem]'>
                            College and University
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                            <div className='grid mt-8 grid-cols-2 gap-5'>
                                <SelectBox
                                    name='university_state'
                                    label='State'
                                    options={stateOptions}
                                    register={register('university_state')}
                                    error={errors.university_state}
                                    Icon={RiRoadMapLine}
                                    onChange={handleStateChange}
                                />
                                <SelectBox
                                    name='university_id'
                                    label='University'
                                    options={universityOptions}
                                    register={register('university_id')}
                                    error={errors.university_id}
                                    Icon={LiaUniversitySolid}
                                    onChange={handleUniversityChange}
                                />
                                <SelectBox
                                    name='college_id'
                                    label='College'
                                    options={collegeOptions}
                                    register={register('college_id')}
                                    error={errors.college_id}
                                    Icon={BiSolidSchool}
                                    onChange={handleCollegeChange}
                                />
                                <SelectBox
                                    name='course_id'
                                    label='Course'
                                    options={courseOptions}
                                    register={register('course_id')}
                                    error={errors.course_id}
                                    Icon={LuTextSelect}
                                />
                            </div>
                            <div className='flex justify-end pt-4'>
                                <Button type='submit' title='Next'></Button>
                            </div>
                        </form>
                    </div>
                )}
                {switchForm === 'PersonalDetails' && (
                    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                        <div className='pt-2 grid gap-1 gap-y-6 grid-cols-3'>
                            {studentFormSchema?.map(field => (
                                <div key={field.name}>
                                    {field.type === 'select' ? (
                                        <SelectBox
                                            label={field.label}
                                            name={field.name}
                                            options={field.options}
                                            register={register(field.name)}
                                            error={errors[field.name]?.message}
                                            Icon={LuTextSelect}
                                        />
                                    ) : (
                                        <Input
                                            label={field.label}
                                            type={field.type}
                                            name={field.name}
                                            register={register(field.name)}
                                            error={errors[field.name]?.message}
                                        />
                                    )}
                                </div>
                            ))}
                            <div className='flex justify-end col-span-3 pt-6'>
                                <Button type='submit' title='Submit Details'></Button>
                            </div>
                        </div>
                    </form>
                )}
            </div>
		</div>
	)
}

export default Admission
