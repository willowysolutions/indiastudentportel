import Header from '../../components/Header'
import Table from '../../components/table/Table'

import { PiChalkboardTeacherLight } from 'react-icons/pi'
// import { getCouncillorColumns } from '../../components/table/TableColumns'
import { useEffect, useMemo, useState } from 'react'
import Modal from '../../components/Modal'
import { FaGraduationCap } from 'react-icons/fa'

import { useNavigate } from 'react-router-dom'
import { collegeCollumn } from '../../components/commonComponents/UniversityCommonComponent/CollagesTableColumn'
import { useDispatch, useSelector } from 'react-redux'
import {
	deleteCollege,
	fetchCollege,
	getSingleCollege,
} from '../../Redux/features/University/UniversitySlice'
import EditModal from './EditModal'
// import {  } from "../../components/commonComponents/UniversityCommonComponent/CollagesTableColumn";
import { setSelectedCollege } from '../../Redux/features/University/UniversitySlice'

const Colleges = () => {
	const navigate = useNavigate()
	const [showModal, setShowModal] = useState(false)
	const [isLoading, setIsLoading] = useState(true)
	const [data, setData] = useState([])
	const dispatch = useDispatch() // Get the dispatch function from Redux
	const [selectedCollege, setSelectedCollege] = useState(null)

	const universityid = useSelector(
		state => state?.universityAuth
	)
	console.log(universityid,"universityid sss");

	useEffect(() => {(async () => {
			try {
				if (universityid) {
					const response = await dispatch(fetchCollege(universityid))
					if (response?.payload?.colleges) {
						setData(response.payload.colleges)
						setIsLoading(false)
					}
				}
			} catch (error) {
				console.error('Error fetching colleges:', error)
				setIsLoading(false) // Set loading to false in case of an error
			}
		})()
	}, [dispatch, universityid])

	const [selectedCounselor, setSelectedCounselor] = useState('')

	const handleViewCollege = async college => {
		await dispatch(getSingleCollege(college?.id))
		console.log(college.id, 'cccccc')
		navigate('/university/coursesList')
	}

	const handleEdit = college => {
		setSelectedCollege(college) // Set the selected college
		setShowModal(true) // Show the modal
	}

	const handleDelete = async college => {
		// console.log(college,'ooooooooooo');

		try {
			// Dispatch the deleteCollege action with the college ID
			const response = await dispatch(deleteCollege(college.id))

			if (response) {
				console.log('College deleted successfully')
			}
		} catch (error) {
			console.error('Error deleting college:', error)
		}
	}

	const columns = useMemo(
		() => collegeCollumn(handleViewCollege, handleEdit, handleDelete),
		[]
	)

	return (
		<div>
			<div className='p-2'>
				<Header title='Colleges' Icon={FaGraduationCap} />
			</div>
			{isLoading ? (
				// Render the loading content
				<div className='flex justify-center items-center h-64'>
					<div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900'></div>
				</div>
			) : (
				// Render the table
				<Table heading={'Colleges'} DATA={data} COLUMNS={columns} />
			)}
			{showModal && (
				<EditModal
					college={selectedCollege}
					onClose={() => setShowModal(false)} // Pass a function to close the modal
				/>
			)}
		</div>
	)
}

export default Colleges
