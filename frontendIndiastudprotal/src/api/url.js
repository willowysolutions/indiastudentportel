// // logins and signup
//Admin Auth Manage
export const createAdminAPI = 'admins/'
export const getAllAdminAPI = 'admins/'
export const updateAdminAPI = 'admins/'
export const deleteAdminAPI = 'admins/'
export const loginAdminAPI = 'api/login'
//counsillor Auth
export const CouncilerLoginAPI = 'api/login'
export const signUpCounsilerAPI = 'api/counsellors/register'
//college Auth
export const universityLoginAPI = 'api/login'
export const signUpUniversityAPI = 'api/colleges/register'
export const EditAdminCollegeAPI = 'api/colleges/'
export const EditAdminCourseAPI = 'api/admin/edit-courses/'
//student Auth
export const StudentloginAPI = 'api/login'
export const signUpStudentAPI = 'api/students/register'

// Admin
// Admin side college
export const getAllUniversityAPI = 'api/admin/universities'
export const createAllUniversityAPI = 'api/admin/universities/' // (id)
export const updateUniversityAPI = 'api/admin/universities/' // (id)
export const deleteUniversityAPI = 'api/admin/universities/' // (id)
export const getUniversitySingleViewAPI = "api/admin/universities/"

// Admin side student 
export const getAllStudentAPI = 'api/students'
export const updateStudentActiveStateAPI = 'api/students/activate'
export const updateUniversityActiveStateAPI = 'api/universities/activate'
export const updateCollegeActiveStateAPI = 'api/universities/activate/'
export const updateCounsellorActiveStateAPI = 'api/counsellors/activate'
export const getSingleStudent = 'student/'
export const getAdminSingleStudent = 'api/students'
// Admin side Admission
export const getAllAdmissiontAPI = 'api/admissions'
export const getsingleAdmissiontAPI = 'api/admissions'
export const approveAdmissiontAPI = 'admission/'
export const rejectAdmissiontAPI = 'admission/'
// Admin side couciler
export const getCouncilerAPI = 'api/counsellors'
export const updateCouncilerActiveStateAPI = 'counciler/'
export const getSingleCounciler = 'counciler/'
// Admin side colleges
export const getAllCollegesAPI = 'api/colleges'
export const getAllCoursesAPI = 'colleges/'
export const getAdminCollegeProfileAPI = 'api/courses'

export const postAdminCollegesApi='api/add-colleges'
export const postAdminCourseApi='api/admin/add-courses'

// update student
export const updateStudentAPI = 'student/'
export const createAdmissionAPI = 'api/admissions'
export const getUniversityforStdAPI = 'api/universities'
export const getSingleAdmissionAPI = 'student/'
export const getAllStudentAdmissionsAPI = 'api/admissions-get'
export const getAllBookingAPI = 'api/bookings'
export const getAllQuestionsAPI = 'api/questions'
export const councilerBookingAPI = 'api/student/counsellors'
export const reviewCouncilerAPI = 'api/review'


// University Manage
export const createUniversityAPI = 'api/colleges'// {universityId}
export const getUniversityAPI = 'api/university/colleges/'// {id}
export const DeleteCollegeAPI = 'api/colleges/'
export const postCourseApi='api/add-courses'
export const getCourseApi='api/college-courses'
export const getallcollageCourseApi='api/counsellor/colleges'
export const getCounsellorSingleCollageApi='api/counsellor-colleges/'
export const getCollege_CourseApi='api/add-courses'//university id pass get methode
export const UpdateCollege_CourseApi='api/add-courses/'//university id pass put methode 
// {id}
export const EditCollegeAPI = 'api/colleges/'
// {id}
export const EditCourseAPI = ' api/courses/'
// {id}
export const DeleteCourseAPI = 'api/courses/'
// {universityId}
export const getUniversityStudentsAPI = 'api/university/students/'
// {universityId}
export const getAllUniversityAdmissionsAPI = 'api/university/admissions/'
// {universityId}
export const getAllUniversityCoursesAPI = 'university/courses/'
// {id}
export const getSingleCollegeAPI = 'api/colleges/'
// {universityId} /{studentId}
export const getUniversitySingleStudentAPI = 'api/students/'
export const getUniversitySingleAdmissionAPI = 'api/admissions/'
// dropdown for state listing
export const getStateListAPI = 'api/states'
export const getCourseNameAPI = 'api/data-courses'




// counciler Manage
// {counsellorId}
export const getSlotesAPI = 'api/counsellor/bookings/'
// {counsellorId}/{bookingId}
export const ApproveSlotesAPI = 'api/counsellor/booking-approve/'
// /{counsellorId}/{bookingId}
export const RejectSlotesAPI = 'api/counsellor/booking-reject/'
// /{counsellorId}/{bookingId}booking-reject
export const CouncellingStatusAPI = 'api/counsellor/booking-complete'
// {counsellorId}/{bookingId}
export const getSingleBookingAPI = 'api/counsellor/booking-get'
//student booking counsilor
export const getCollegesAndCourses="api/counsellor/recomendations"
export const assignRecommendationToStudent="api/counsellor/recomendations"
export const getRecommendationsAPI="api/recomendations"
export const CreateBookingAPI = 'api/counselling-book'

// Submit Exam API
export const SubmitExamAPI = '/StudentInterestTest'

// Get Exam Restult API
export const testResultsAPI = '/InterestResult?id='


// store pdf API
export const uploadPDFAPI = 'api/pdf' //params ${studentId}

// get pdf API
export const getPDFAPI = 'api/pdf' 