import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useSelector } from 'react-redux';
import { 
    FaUserGraduate, 
    FaUniversity, 
    FaBookReader, 
    FaCalendarAlt,
    FaMapMarkerAlt,
    FaPrayingHands,
    FaIdCard,
    FaGlobe
} from 'react-icons/fa';

const AdmissionProfileStudent = () => {
  const selectedAdmission = useSelector(state => state?.student?.selectedAdmission);

  // Default data fallback
  const defaultData = {
    student_name: 'N/A',
    email: 'N/A',
    college: { name: 'N/A' },
    university: { name: 'N/A' },
    course: { course_name: 'N/A', course_duration: 'N/A' },
    guardian: 'N/A',
    dob: 'N/A',
    address: 'N/A',
    district: 'N/A',
    state: 'N/A',
    nationality: 'N/A',
    religion: 'N/A'
  };

  const data = selectedAdmission ? {
    ...selectedAdmission,
    state: selectedAdmission.state || 'N/A'
  } : defaultData;

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
                            <DetailItem label="University" value={data.university?.name} icon={<FaUniversity />} />
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
                            <DetailItem label="Nationality" value={data.nationality} icon={<FaGlobe />} />
                            <DetailItem label="Religion" value={data.religion} icon={<FaPrayingHands />} />
                        </div>
                        </div>
                </div>
            </div>
        </div>
    </div>
  );
};

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
);

export default AdmissionProfileStudent;
