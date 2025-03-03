import { useSelector } from 'react-redux'
import icon from '../../../assets/dashboard/university.png'

const UniversityProfile = () => {
	const data = useSelector(state => state?.admin?.UniversityProfile?.university)
	const colleges = data?.colleges
	const admissions = data?.admissions

	return (
		<div className='h-full'>
			<div className='bg-[#F5F7F8] h-56 rounded-2xl  w-full'>
				<div className='flex justify-between'>
					<div className='text-white flex flex-col  justify-center ml-10'>
						<div className='text-[1.6rem]'>{data?.details?.name}</div>
						<div className='text-zinc-300 text-[1rem]'>{data?.district}</div>
						<div className='text-zinc-300 text-[1rem]'>
							{data?.details.email}
						</div>
						<div className='text-zinc-300 text-[1rem]'>
							{data?.details.contact}
						</div>
					</div>
					<div className='mr-4'>
						<img
							src={icon}
							alt='students log'
							className='w-[27rem] hover:animate-pulse'
						/>
					</div>
				</div>

				<div className='grid grid-cols-[3fr,2fr] gap-2 pt-2 '>
					<div className='border max-h-[54vh] rounded-xl shadow-lg overflow-hidden mb-4'>
						<div className='text-center mt-3 text-2xl font-semibold text-zinc-800'>
							Colleges
						</div>

						<div className='relative overflow-x-auto'>
							<div className='sticky top-0 bg-white dark:bg-gray-700 z-10'>
								<table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
									<thead className='text-[.9rem] text-gray-800 uppercase bg-gray-100 dark:text-gray-400'>
										<tr>
											<th scope='col' className='px-6 py-3'>
												id
											</th>
											<th scope='col' className='px-6 py-3'>
												College
											</th>
											<th scope='col' className='px-6 py-3'>
												Place
											</th>
											<th scope='col' className='px-6 py-3'>
												Contact
											</th>
										</tr>
									</thead>
								</table>
							</div>

							<div className='overflow-y-auto scrollbar-custom max-h-[40vh] '>
								<table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
									<tbody>
										{colleges?.map((college, index) => (
											<tr
												key={index}
												className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'
											>
												<th
													scope='row'
													className='px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white'
												>
													{college.id}
												</th>
												<td className='px-6 py-2'>{college.name}</td>
												<td className='px-6 py-2'>{college.street}</td>
												<td className='px-6 py-2'>{college.contact}</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					</div>
					<div className='grid grid-cols-1 mt-10'>
						<div className='activity-one  w-full h-16 rounded-[1rem] flex justify-between items-center px-2'>
							<div className='font-semibold'>Total Number Of College</div>
							<div className='font-semibold text-gray-800 text-[1.5rem]'>
								{colleges?.length}
							</div>
						</div>
						<div className='activity-two w-full h-16 rounded-[1rem] flex justify-between items-center px-2'>
							<div className='font-semibold'>Total Number Of Students</div>
							<div className='font-semibold text-gray-800 text-[1.5rem]'>
								{admissions?.length}
							</div>
						</div>
						<div className='shadow-xl p-4 my-4'></div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default UniversityProfile
