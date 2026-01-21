import Header from '../../components/Header'
import Table from '../../components/table/Table'

import { FaGraduationCap } from 'react-icons/fa'
import { useEffect, useMemo, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import { collegeCollumn } from '../../components/commonComponents/UniversityCommonComponent/CollagesTableColumn'
import { useDispatch, useSelector } from 'react-redux'
import {
	deleteCollege,
	fetchCollege,
	getSingleCollege,
} from '../../Redux/features/University/UniversitySlice'
import EditModal from './EditModal'

const Colleges = () => {
	const navigate = useNavigate()
	const [showModal, setShowModal] = useState(false)
	const [isLoading, setIsLoading] = useState(true)
	const [data, setData] = useState([])
	const dispatch = useDispatch() 
	const [selectedCollege, setSelectedCollege] = useState(null)

	const universityid = useSelector(
		state => state?.universityAuth
	)

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
				setIsLoading(false)
			}
		})()
	}, [dispatch, universityid])


	const handleViewCollege = async college => {
		await dispatch(getSingleCollege(college?.id))
		navigate('/university/coursesList')
	}

	const handleEdit = college => {
		setSelectedCollege(college) 
		setShowModal(true) 
	}

	const handleDelete = async college => {
		try {
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
		<div className="space-y-6 w-full px-4 sm:px-6 lg:px-8 pb-10">
			<Header title='Affiliated Colleges' Icon={FaGraduationCap} />
			
            <div className="bg-white rounded-3xl shadow-xl shadow-indigo-100/50 border border-slate-100 overflow-hidden">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center p-20 min-h-[400px]">
                        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
                        <p className="text-slate-500 font-medium">Loading colleges...</p>
                    </div>
                ) : data?.length > 0 ? (
                    <div className="p-2">
                         <div className="overflow-x-auto">
                             <Table heading={'Colleges List'} DATA={data} COLUMNS={columns} />
                         </div>
                         <div className="p-4 bg-slate-50 border-t border-slate-100 text-center text-sm text-slate-500 font-medium">
                            Total Colleges: <span className="text-indigo-600 font-bold">{data.length}</span>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
                        <div className="w-24 h-24 bg-indigo-50 text-indigo-200 rounded-full flex items-center justify-center mb-6">
                            <FaGraduationCap className="w-12 h-12" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-2">No Colleges Found</h3>
                        <p className="text-slate-500 max-w-sm mx-auto">
                            No colleges are currently affiliated with your university.
                        </p>
                    </div>
                )}
			</div>

			{showModal && (
				<EditModal
					college={selectedCollege}
					onClose={() => setShowModal(false)} 
				/>
			)}
		</div>
	)
}

export default Colleges
