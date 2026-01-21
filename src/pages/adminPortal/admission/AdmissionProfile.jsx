import { useSelector } from 'react-redux'
// import icon from '../../../assets/dashboard/wepik-export-20240313072348V9B7.png'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { 
    FaUserGraduate, 
    FaUniversity, 
    FaBookReader, 
    FaCalendarAlt,
    FaMapMarkerAlt,
    FaPrayingHands,
    FaIdCard
} from 'react-icons/fa'

const AdmissionProfile = () => {
	const data = useSelector(state => state?.admin?.AdmissionProfile?.admission)
	// console.log(data, 'aaaaaaaa')

    if (!data) return <div className="flex h-screen items-center justify-center text-slate-400">Loading...</div>

	return (
		<div className='min-h-screen p-6 font-poppins'>
            <div className="space-y-8">
                
                {/* Header Card */}
                <div className='bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl overflow-hidden relative'>
                     <div className='absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-teal-500 to-emerald-500'></div>
                     <div className='pt-20 px-8 pb-8 flex flex-col md:flex-row items-end gap-6 relative z-10'>
                          <div className='w-28 h-28 rounded-full bg-white p-1 shadow-lg flex items-center justify-center text-4xl text-teal-600 border-4 border-white'>
                               <span className="font-bold">{data.student_name?.charAt(0) || "S"}</span>
                          </div>
                          <div className="flex-1 mb-2">
                                <h1 className='text-3xl font-bold text-slate-800'>{data.student_name}</h1>
                                <p className='text-slate-500 font-medium flex items-center gap-2'>
                                    <FaUserGraduate className="text-teal-500" />
                                    Admission Candidate
                                </p>
                          </div>
                          <div className="text-sm font-medium bg-white/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/60 shadow-sm text-slate-600">
                                {data.email}
                          </div>
                     </div>
                </div>

                {/* Main Content Grid */}
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                    
                    {/* Left Column: Aptitude Score */}
                    <div className='lg:col-span-1'>
                        <div className='bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl p-8 h-full flex flex-col items-center justify-center'>
                             <h2 className='text-xl font-bold text-slate-800 mb-6'>Aptitude Score</h2>
                             <div className='w-48 h-48'>
                                <CircularProgressbar 
                                    value={60} 
                                    text={`${60}%`} 
                                    styles={buildStyles({
                                        pathColor: `#14b8a6`, // teal-500
                                        textColor: '#0f766e',
                                        trailColor: '#f1f5f9',
                                        backgroundColor: '#3e98c7',
                                    })}
                                />
                             </div>
                             <p className="mt-6 text-center text-slate-500 text-sm">
                                 Performance based on initial assessment tests.
                             </p>
                        </div>
                    </div>

                    {/* Middle Column: Course Details */}
                    <div className='lg:col-span-1'>
                        <div className='bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl p-8 h-full'>
                            <h2 className='text-xl font-bold text-slate-800 mb-6 flex items-center gap-2'>
                                <span className="p-2 bg-teal-100 rounded-lg text-teal-600"><FaBookReader /></span>
                                Course Details
                            </h2>
                            <div className="space-y-6 relative">
                                <DetailItem label="University" value="Central University" icon={<FaUniversity />} />
                                <DetailItem label="College" value={data.college?.name} icon={<FaUniversity />} />
                                <DetailItem label="Course" value={data.course?.course_name} icon={<FaBookReader />} />
                                <DetailItem label="Duration" value={data.course?.course_duration} icon={<FaCalendarAlt />} />
                                <DetailItem label="Batch" value="2017-2020" icon={<FaCalendarAlt />} />
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Personal Details */}
                    <div className='lg:col-span-1'>
                         <div className='bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl p-8 h-full'>
                            <h2 className='text-xl font-bold text-slate-800 mb-6 flex items-center gap-2'>
                                <span className="p-2 bg-emerald-100 rounded-lg text-emerald-600"><FaIdCard /></span>
                                Personal Details
                            </h2>
                            <div className="space-y-5">
                                <DetailItem label="Guardian" value={data.guardian} icon={<FaUserGraduate />} />
                                <DetailItem label="Date of Birth" value={data.dob} icon={<FaCalendarAlt />} />
                                <DetailItem label="Address" value={data.address} icon={<FaMapMarkerAlt />} />
                                <DetailItem label="District" value={data.district} icon={<FaMapMarkerAlt />} />
                                <DetailItem label="State" value={data.state} icon={<FaMapMarkerAlt />} />
                                <DetailItem label="Nationality" value={data.nationality} icon={<FaGlobeIcon />} />
                                <DetailItem label="Religion" value={data.religion} icon={<FaPrayingHands />} />
                            </div>
                         </div>
                    </div>
                </div>
            </div>
		</div>
	)
}

const DetailItem = ({ label, value, icon }) => (
    <div className="group">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-2">
            {icon && <span className="text-slate-300 group-hover:text-teal-500 transition-colors">{icon}</span>}
            {label}
        </div>
        <div className="text-slate-700 font-medium border-b border-slate-100 pb-2 group-hover:border-teal-200 transition-colors">
            {value || "N/A"}
        </div>
    </div>
)

const FaGlobeIcon = () => (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M256 32C132.3 32 32 132.3 32 256s100.3 224 224 224 224-100.3 224-224S379.7 32 256 32zm142.3 98.7c26.5 35.8 45 78.4 51.5 125.3H297.4C294.7 197.6 287.6 142.6 275.9 90.6c47.9 4.1 91.5 18.2 122.4 40.1zm-130 29.5c8.6 42.1 13.9 88.5 15.6 138.8H128.1c1.7-50.3 7-96.7 15.6-138.8 23.2-5.4 59.8-12 112.3-12 52.5 0 89.1 6.6 112.3 12zM58.3 130.7c30.9-21.9 74.5-36 122.4-40.1-11.7 52-18.8 107-21.5 165.4H62.2c6.5-46.9 25-89.5 51.5-125.301zM62.2 304H159.2c2.7 58.4 9.8 113.4 21.5 165.4-47.9-4.1-91.5-18.2-122.4-40.1-26.5-35.8-45-78.4-51.5-125.3zm206.1 177.4c-52.5 0-89.1-6.6-112.3-12-8.6-42.1-13.9-88.5-15.6-138.8h231.8c-1.7 50.3-7 96.7-15.6 138.8-23.2 5.4-59.8 12-112.3 12zm118.6-52.1c-30.9 21.9-74.5 36-122.4 40.1 11.7-52 18.8-107 21.5-165.4h197c-6.5 46.9-25 89.5-51.5 125.3z"></path></svg>
)

export default AdmissionProfile
