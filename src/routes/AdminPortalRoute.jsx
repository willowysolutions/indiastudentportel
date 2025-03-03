import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import AdminLayout from '../layouts/AdminLayout'
import DashboardAdmin from '../pages/adminPortal/dashboard/DashboardAdmin'
import CouncillorAdmin from '../pages/adminPortal/counsellor/CounsillorAdmin'
import CollegesAdmin from '../pages/adminPortal/colleges/CollegesAdmin'
import AdmissionAdmin from '../pages/adminPortal/admission/AdmissionAdmin'
import StudentsAdmin from '../pages/adminPortal/students/StudentsAdmin'
import CollegeProfile from '../pages/adminPortal/colleges/CollegesProfile'
import CouncillorProfile from '../pages/adminPortal/counsellor/CounsillorProfile'
import StudentsProfile from '../pages/adminPortal/students/StudentsProfile'
// import UniversityAdmin from '../pages/adminPortal/university/UniversityAdmin'
// import UniversityProfile from '../pages/adminPortal/university/UniversityProfile'
import AdmissionProfile from '../pages/adminPortal/admission/AdmissionProfile'
import AdminLogin from '../pages/adminPortal/authentication/AdminLogin'
import { jwtDecode } from 'jwt-decode'
import ProtectedRoute from './ProtectedRoute'
import AdminAddCollege from '../pages/adminPortal/colleges/AdminAddCollege/AdminAddCollege'
import AdminAddCourse from '../pages/adminPortal/colleges/AdminAddCollege/AdminAddCourse'
import EditCollege from '../components/commonComponents/EditCollege'
import EditCourse from '../components/commonComponents/EditCourse'
import ImportExcel from '../pages/adminPortal/colleges/AdminAddCollege/ImportExcel'

const RedirectIfAuthenticated = ({ children }) => {
	const token = localStorage.getItem('token')
	const location = useLocation()

	if (token) {
		try {
			const decoded = jwtDecode(token)
			if (decoded === 'admin') {
				return (
					<Navigate to='/admin/dashboard' state={{ from: location }} replace />
				)
			} else {
				localStorage.removeItem('token')
				return <Navigate to='/admin/login' state={{ from: location }} replace />
			}
		} catch (error) {
			console.error('Error decoding token:', error)
		}
	}

	return children
}

const AdminPortalRoute = () => {
	return (
		<div>
			<Routes>
				<Route
					path='/admin/login'
					element={
						<RedirectIfAuthenticated>
							<AdminLogin />
						</RedirectIfAuthenticated>
					}
				/>
				<Route
					path='/admin'
					element={
						<RedirectIfAuthenticated>
							<AdminLayout />
						</RedirectIfAuthenticated>
					}
				/>

				<Route element={<ProtectedRoute requiredRole='admin' />}>
					<Route path='/admin' element={<AdminLayout />}>
						<Route index element={<DashboardAdmin />} />
						<Route path='dashboard' element={<DashboardAdmin />} />
						<Route path='councillors' element={<CouncillorAdmin />} />
						<Route path='councillors/profile' element={<CouncillorProfile />} />
						<Route path='students' element={<StudentsAdmin />} />
						<Route path='students/profile' element={<StudentsProfile />} />
						<Route path='colleges' element={<CollegesAdmin />} />
						<Route path='colleges/profile' element={<CollegeProfile />} />
						<Route path="colleges/importExcel" element={<ImportExcel />} />
						<Route path="colleges/adminAddCollege" element={<AdminAddCollege />} />
						<Route path="colleges/editCollege/:id" element={<EditCollege />} />
						<Route path="colleges/AdminAddCourse" element={<AdminAddCourse />} />
						<Route path="colleges/editCourse/:id" element={<EditCourse />} />
						{/* <Route path='university' element={<UniversityAdmin />} /> */}
						{/* <Route path='university/profile' element={<UniversityProfile />} /> */}
						<Route path='admission' element={<AdmissionAdmin />} />
						<Route path='admission/profile' element={<AdmissionProfile />} />
					</Route>
				</Route>
			</Routes>
		</div>
	)
}

export default AdminPortalRoute
