import { FaUniversity } from 'react-icons/fa'
import Header from '../../../components/Header'
import Table from '../../../components/table/Table'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UniversityColumns } from '../../../components/commonComponents/admin/AdminColumns'
import { useDispatch, useSelector } from 'react-redux'
import {
	ChangeUniversityStatus,
	getSingleUniversity,
	getUniversity,
} from '../../../Redux/features/admin/AdminSlice'
import { useEffect } from 'react'

const UniversityAdmin = () => {
	const dispatch = useDispatch()
	const [isLoadingdata, setIsLoadingdata] = useState(true)

	useEffect(() => {
		const fetchData = async () => {
			try {
				await dispatch(getUniversity())
				setIsLoadingdata(false)
			} catch (error) {
				console.error('Error fetching Data: ', error)
				setIsLoadingdata(false)
			}
		}
		fetchData()
	}, [dispatch])

	const data = useSelector(
		state => state?.admin?.UniversityDetails?.universities
	)

	console.log(data, 'university')

	const navigate = useNavigate()

	const [councillor, setCouncillor] = useState()
	const handleViewProfile = collegename => {
		dispatch(getSingleUniversity(collegename.id))
		setCouncillor(collegename)
		navigate('/admin/university/profile')
		//   setShowModal(true);
	}
	const handleStatusChange = id => {
		// Placeholder function to handle status change
		// Replace this logic with your actual function to change the status or navigate

		dispatch(ChangeUniversityStatus(id))

		// Example: navigate('/path-to-change-status', { state: { currentStatus } });
	}

	const columns = useMemo(
		() => UniversityColumns(handleViewProfile, handleStatusChange),
		[]
	)
	return (
		<div>
			<Header title='University' Icon={FaUniversity} />
			{isLoadingdata ? (
				<p>Loading data....</p>
			) : (
				<Table heading={'University'} DATA={data} COLUMNS={columns} />
			)}
		</div>
	)
}

export default UniversityAdmin
