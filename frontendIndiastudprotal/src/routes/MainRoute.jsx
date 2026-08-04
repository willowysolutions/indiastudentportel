import { BrowserRouter } from 'react-router-dom'
import StudentPortalRoute from './StudentPortalRoute'
import AdminPortalRoute from './AdminPortalRoute'
import CounsillorPortalRoute from './CounsillorPortalRoute'
import UniversityPortalRoute from './UniversityPortalRoute'

const MainRoute = () => {
	return (
		<>
			<BrowserRouter>
				<AdminPortalRoute />
				<StudentPortalRoute />
				<CounsillorPortalRoute />
				<UniversityPortalRoute />
			</BrowserRouter>
		</>
	)
}

export default MainRoute
