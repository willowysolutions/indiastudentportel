import { FaWpforms } from 'react-icons/fa'
import Header from '../../../components/Header'
import Table from '../../../components/table/Table'
import { useEffect, useMemo, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { AdmissionColumn } from '../../../components/commonComponents/admin/AdminColumns'
import { useDispatch } from 'react-redux'
import {
	getAdmissions,
	getSingleAdmissions,
} from '../../../Redux/features/admin/AdminSlice'
import { HiOutlineExclamationCircle } from "react-icons/hi";


const AdmissionAdmin = () => {
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(true)
	const dispatch = useDispatch()
    const navigate = useNavigate()

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


	const handleViewProfile = useCallback((collegename) => {
		dispatch(getSingleAdmissions(collegename.id))
		navigate('/admin/admission/profile')
	}, [dispatch, navigate])

	const columns = useMemo(() => AdmissionColumn(handleViewProfile), [handleViewProfile])

	return (
    <div className="space-y-6 w-full px-4 sm:px-6 lg:px-8 pb-10">
      <Header
        title="Admission"
        Icon={FaWpforms}
        description="Track admission applications and enrollment status."
      />

      <div className="bg-white rounded-3xl shadow-xl shadow-indigo-100/50 border border-slate-100 overflow-hidden">
        {loading ? (
           <div className="flex flex-col items-center justify-center p-20 min-h-[400px]">
            <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
            <p className="text-slate-500 font-medium">Loading admissions...</p>
          </div>
        ) : data?.length > 0 ? (
          <div className="p-2">
            <div className="overflow-x-auto">
              <Table heading="Admission" DATA={data} COLUMNS={columns} />
            </div>
             <div className="p-4 bg-slate-50 border-t border-slate-100 text-center text-sm text-slate-500 font-medium">
              Total Admissions: <span className="text-indigo-600 font-bold">{data.length}</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
             <div className="w-24 h-24 bg-indigo-50 text-indigo-200 rounded-full flex items-center justify-center mb-6">
              <FaWpforms className="w-12 h-12" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">No Admissions Found</h3>
            <p className="text-slate-500 max-w-sm mx-auto">
              No admission requests are pending at the moment.
            </p>
          </div>
        )}
      </div>
    </div>
	)
}

export default AdmissionAdmin
