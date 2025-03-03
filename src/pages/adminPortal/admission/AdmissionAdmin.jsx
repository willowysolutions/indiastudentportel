import { FaWpforms } from 'react-icons/fa'
import Header from '../../../components/Header'
import Table from '../../../components/table/Table'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AdmissionColumn } from '../../../components/commonComponents/admin/AdminColumns'
import { useDispatch, useSelector } from 'react-redux'
import {
	getAdmissions,
	getSingleAdmissions,
} from '../../../Redux/features/admin/AdminSlice'


const AdmissionAdmin = () => {
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(true)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getAdmissions()).then(res => {
			if (res?.payload?.admissions) {
				setData(res.payload.admissions)
				setLoading(false)
			} else {
				setLoading(false)
			}
		})
	}, [dispatch])

	const navigate = useNavigate()

	const [councillor, setCouncillor] = useState()
	const handleViewProfile = collegename => {
		dispatch(getSingleAdmissions(collegename.id))
		setCouncillor(collegename)
		navigate('/admin/admission/profile')
	}
	const columns = useMemo(() => AdmissionColumn(handleViewProfile), [])

	return (
		<div>
			<Header title='Admission' Icon={FaWpforms} />
			{loading ? (
				<p>Loading...</p>
			) : (
				<Table heading={'Admission'} DATA={data} COLUMNS={columns} />
			)}
		</div>
	)
}

export default AdmissionAdmin
