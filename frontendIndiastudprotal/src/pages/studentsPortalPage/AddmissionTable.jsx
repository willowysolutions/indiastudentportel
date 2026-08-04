import { FaWpforms } from 'react-icons/fa'
import Header from '../../components/Header'
import Table from '../../components/table/Table'
import { useNavigate } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
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
		navigate('/student/admission/profile') 
	}

	const columns = useMemo(
		() => AdmissionColumns(navigate, handleViewProfile),
		[navigate]
	)
	useEffect(() => {
		dispatch(getAllAdmission()).then(res => {
			setData(res?.payload?.admission || [])
			setLoading(false)
		})
	}, [dispatch])

	return (
        <div className="space-y-6 w-full px-4 sm:px-6 lg:px-8 pb-10">
            <Header title="Admission" Icon={FaWpforms} />
            
            <div className="bg-white rounded-3xl shadow-xl shadow-indigo-100/50 border border-slate-100 overflow-hidden">
                <div className="p-4 flex justify-end">
                    <div onClick={() => navigate('/student/admission/create')}>
                         <Button title="Add Admission"/>
                    </div>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center p-20 min-h-[400px]">
                        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
                        <p className="text-slate-500 font-medium">Loading admissions...</p>
                    </div>
                ) : data.length > 0 ? (
                    <div className="p-2">
                        <Table heading={'Admission List'} DATA={data} COLUMNS={columns} />
                         <div className="p-4 bg-slate-50 border-t border-slate-100 text-center text-sm text-slate-500 font-medium">
                            Total Admissions: <span className="text-indigo-600 font-bold">{data.length}</span>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
                        <div className="w-24 h-24 bg-indigo-50 text-indigo-200 rounded-full flex items-center justify-center mb-6">
                            <FaWpforms className="w-12 h-12" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-700 mb-2">No Admissions Found</h3>
                        <p className="text-slate-500 max-w-sm mx-auto mb-6">
                            You haven&apos;t applied for any admissions yet.
                        </p>
                    </div>
                )}
            </div>
        </div>
	)
}

export default AdmissionTable
