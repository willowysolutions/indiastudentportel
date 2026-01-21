import { FaUniversity } from 'react-icons/fa'
import Header from '../../../components/Header'
import Table from '../../../components/table/Table'
import { useMemo, useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { UniversityColumns } from '../../../components/commonComponents/admin/AdminColumns'
import { useDispatch, useSelector } from 'react-redux'
import {
	ChangeUniversityStatus,
	getSingleUniversity,
	getUniversity,
} from '../../../Redux/features/admin/AdminSlice'
import { HiOutlineExclamationCircle } from "react-icons/hi";

const UniversityAdmin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [updateData, setUpdateData] = useState(false);

    const data = useSelector(
        state => state?.admin?.UniversityDetails?.universities
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                await dispatch(getUniversity());
            } catch (error) {
                console.error('Error fetching Data: ', error);
                setError(error.message || "Failed to load universities.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [dispatch, updateData]);

    const handleViewProfile = useCallback((university) => {
        dispatch(getSingleUniversity(university.id));
        navigate('/admin/university/profile');
    }, [dispatch, navigate]);

    const handleStatusChange = useCallback((id) => {
        dispatch(ChangeUniversityStatus(id));
        setUpdateData(prev => !prev);
    }, [dispatch]);

    const columns = useMemo(
        () => UniversityColumns(handleViewProfile, handleStatusChange),
        [handleViewProfile, handleStatusChange]
    );

    return (
        <div className="space-y-6 w-full px-4 sm:px-6 lg:px-8 pb-10">
            <Header title="All Universities" Icon={FaUniversity} />
            
            <div className="bg-white rounded-3xl shadow-xl shadow-indigo-100/50 border border-slate-100 overflow-hidden">
                {loading ? (
                   <div className="flex flex-col items-center justify-center p-20 min-h-[400px]">
                        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
                        <p className="text-slate-500 font-medium">Loading universities...</p>
                   </div>
                ) : error ? (
                   <div className="p-10 text-center text-red-500 bg-red-50/50 min-h-[200px] flex items-center justify-center flex-col">
                        <HiOutlineExclamationCircle className="w-10 h-10 mb-2 opacity-50"/>
                        {error}
                   </div>
                ) : data?.length > 0 ? (
                    <div className="p-2">
                        <div className="overflow-x-auto">
                            <Table heading="Universities List" DATA={data} COLUMNS={columns} />
                        </div>
                        <div className="p-4 bg-slate-50 border-t border-slate-100 text-center text-sm text-slate-500 font-medium">
                            Total Universities: <span className="text-indigo-600 font-bold">{data.length}</span>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
                        <div className="w-24 h-24 bg-indigo-50 text-indigo-200 rounded-full flex items-center justify-center mb-6">
                            <FaUniversity className="w-12 h-12" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-2">No Universities Found</h3>
                        <p className="text-slate-500 max-w-sm mx-auto">
                            There are no registered universities in the system.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default UniversityAdmin
