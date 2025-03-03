import Header from '../../components/Header'
import Table from "../../components/table/Table"
import  { useEffect, useMemo, useState } from "react";
import { FaGraduationCap } from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {  getAllAdmission,  getUniversitySingleStudent } from "../../Redux/features/University/UniversitySlice";
// import EditModal from "./EditModal";
// import {  } from "../../components/commonComponents/UniversityCommonComponent/CollagesTableColumn";
import { StudentCollumn } from '../../components/commonComponents/UniversityCommonComponent/StudentTableCollumn';

const StudentsUnderUniversity = () => {

  const universityid = useSelector((state)=> state?.universityAuth?.university?.id)
  const dispatch = useDispatch(); 
  const [isLoading, setIsLoading] = useState(true);

  const singleStudentData = useSelector((state) => state?.university?.singleStudentData?.student);
  console.log(singleStudentData,'bhbhb');


  useEffect(() => {
    const fetchData = async () => {
      try {
        if (universityid) {
          // Fetch students based on the user's university ID
          dispatch(getAllAdmission(universityid));
          setIsLoading(false); // Set loading to false when data is fetched
        }
      } catch (error) {
        console.error("Error fetching students:", error);
        setIsLoading(false); // Set loading to false in case of an error
      }
    };
  
    fetchData(); // Call the async function to fetch data
  }, [dispatch, universityid]);


    const navigate = useNavigate()
 

      // Retrieve college data from Redux store using useSelector
      const students = useSelector((state) => state.university?.universityData?.students);
  console.log(students,"teh students data in the useSelectore")

  // Check if data is an array
  const isDataArray = Array.isArray(students);
  console.log(isDataArray,'issss');

      console.log(students,'iiiii');

const studentid = useSelector((state) => state.university?.universityData?.students.student_id);

console.log(studentid,'sssssss');

const admissions = useSelector((state) => state.university?.admissionData);
console.log(admissions,'addmm');

    
  
    const handleViewStudent = async(student) => {
      console.log(student.student_id,'stud');
      const response = await dispatch(getUniversitySingleStudent(student.student_id)); // Dispatch action to set selected college
     if (response){
      navigate('/university/studentDetail')
     }
      console.log('Viewing profile for:', student.name);
    };
    
    const columns = useMemo(() => StudentCollumn(handleViewStudent, ), []);
        
    return (
      <div>
        <div className="p-2">
          <Header title="Students" Icon={FaGraduationCap} />
        </div>
        {isLoading ? (
          // Render the loading content
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          // Render the table
          <Table heading={""} DATA={admissions} COLUMNS={columns} />
        )}
      </div>
    );
}

export default StudentsUnderUniversity