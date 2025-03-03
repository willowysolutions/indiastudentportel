import { useSelector } from 'react-redux'
import icon from '../../../assets/dashboard/wepik-export-20240313072348V9B7.png'
import { CircularProgressbar } from 'react-circular-progressbar'

const AdmissionProfile = () => {
	const data = useSelector(state => state?.admin?.AdmissionProfile?.admission)
	console.log(data, 'aaaaaaaa')

	return (
		<div className='h-full'>
			<div className='bg-[#F5F7F8] h-56 rounded-2xl  w-full'>
				<div className='flex justify-between'>
					<div className='text-white flex flex-col  justify-center ml-10'>
						<div className='text-[1.6rem]'>{data.student_name}</div>
						<div className='text-zinc-300 text-[1rem]'>{data.email}</div>
					</div>
					<div className='mr-8'>
						<img
							src={icon}
							alt='students log'
							className='w-[14rem] hover:animate-pulse'
						/>
					</div>
				</div>
				<div className='grid grid-cols-[2fr,3fr,3fr] gap-2 pt-2 mt-3'>
					<div className='dark:border-gray-700 dark:bg-gray-800 border h-full min-h-72 flex flex-col justify-center rounded-xl shadow-inner-black-25 text-white'>
						<div className='flex justify-center py-5 text-lg font-semibold text-gray-900 dark:text-white mb-2'>
							Aptitude Score
						</div>

						<div className='flex justify-center items-center'>
							<div className='' style={{ width: 200, height: 200 }}>
								<CircularProgressbar value={60} text={`${61}%`} />
							</div>
						</div>
					</div>

					<div className='w-full max-w-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow rounded-lg p-5'>
						<h2 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
							Course details
						</h2>
						<address className='relative bg-gray-50 dark:bg-gray-700 dark:border-gray-600 p-4 rounded-lg border border-gray-200 not-italic grid grid-cols-2'>
							<div className='space-y-2 text-gray-500 dark:text-gray-400 leading-loose hidden sm:block'>
								<div className=''>University</div>
								<div className=''>College</div>
								<div className=''>Course</div>
								<div className=''>Duration</div>
								<div className=''>Batch</div>
							</div>
							<div
								id='contact-details'
								className='space-y-2 text-gray-900 dark:text-white font-medium leading-loose'
							>
								<div className=''>Central University</div>
								<div className=''>{data.college.name}</div>
								<div className=''>{data.course.course_name}</div>
								<div className=''>{data.course.course_duration}</div>
								<div className=''>2017-2020</div>
							</div>

							<div
								id='tooltip-contact-details'
								role='tooltip'
								className='absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700'
							>
								<span id='default-tooltip-message-contact-details'>
									Copy to clipboard
								</span>
								<span
									id='success-tooltip-message-contact-details'
									className='hidden'
								>
									Copied!
								</span>
								<div className='tooltip-arrow' data-popper-arrow></div>
							</div>
						</address>
					</div>
					<div className='w-full max-w-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow rounded-lg p-5'>
						<h2 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
							Personal details
						</h2>
						<address className='relative bg-gray-50 dark:bg-gray-700 dark:border-gray-600 p-4 rounded-lg border border-gray-200 not-italic grid grid-cols-2'>
							<div className='space-y-2 text-gray-500 dark:text-gray-400 leading-loose hidden sm:block'>
								<div className=''>Guardian</div>
								<div className=''>Date of Birth</div>
								<div className=''>Address</div>
								<div className=''>District</div>
								<div className=''>State</div>
								<div className=''>Nationality</div>
								<div className=''>Religion</div>
							</div>
							<div
								id='contact-details'
								className='space-y-2 text-gray-900 dark:text-white font-medium leading-loose'
							>
								<div className=''>{data.guardian}</div>
								<div className=''>{data.dob}</div>
								<div className=''>{data.address}</div>
								<div className=''>{data.district}</div>
								<div className=''>{data.state}</div>
								<div className=''>{data.nationality}</div>
								<div className=''>{data.religion}</div>
							</div>

							<div
								id='tooltip-contact-details'
								role='tooltip'
								className='absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700'
							>
								<span id='default-tooltip-message-contact-details'>
									Copy to clipboard
								</span>
								<span
									id='success-tooltip-message-contact-details'
									className='hidden'
								>
									Copied!
								</span>
								<div className='tooltip-arrow' data-popper-arrow></div>
							</div>
						</address>
					</div>
				</div>
			</div>
		</div>
	)
}

export default AdmissionProfile
