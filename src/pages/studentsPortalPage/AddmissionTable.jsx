import { FaWpforms } from 'react-icons/fa'
import Header from '../../components/Header'
import Table from '../../components/table/Table'
import { useNavigate } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	SingleAdmission,
	getAllAdmission,
} from '../../Redux/features/student/StudentSlice'
import Button from '../../components/Button'
import { AdmissionColumns } from '../../components/commonComponents/student/TableColumns'




const AdmissionTable = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [loading, setLoading] = useState(true)
	const [admission, setAdmission] = useState('')
	const [data, setData] = useState([])
	const handleViewProfile = admission => {
		setAdmission(admission)
		dispatch(SingleAdmission(admission))
		navigate('/student/admission/profile') // added this line to actually navigate
	}

	const columns = useMemo(
		() => AdmissionColumns(navigate, handleViewProfile),
		[navigate]
	)
	useEffect(() => {
		dispatch(getAllAdmission()).then(res => {
			setData(res.payload.admission)
			setLoading(false)
		})
	}, [])

	return (
		<div>
			{/* <Header title='Admission' Icon={FaWpforms} /> */}
			<div className='flex w-full justify-end'>
				{/* <div
					onClick={() => navigate('/student/admission/create')}
					className='bg-black px-4 p-2 my-2 rounded-lg text-white'
				>
					Add Admission
				</div> */}
				<Button title="Add Admission"/>
			</div>
			{loading ? (
				<p>Loading...</p>
			) : (
				<Table heading={'Please Select College'} DATA={data} COLUMNS={columns} />
			)}
		</div>
	)
}

export default AdmissionTable
