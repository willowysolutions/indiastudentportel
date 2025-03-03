import React from 'react'
import Header from '../../components/Header'

import Table from "../../components/table/Table"

import { PiChalkboardTeacherLight } from "react-icons/pi";
// import { getCouncillorColumns } from "../../components/table/TableColumns";
import  { useEffect, useMemo, useState } from "react";
import { FaGraduationCap } from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {   getAllAdmission, getUniversitySingleAdmission } from "../../Redux/features/University/UniversitySlice";
// import EditModal from "./EditModal";
// import {  } from "../../components/commonComponents/UniversityCommonComponent/CollagesTableColumn";
import { admissionCollumn } from '../../components/commonComponents/UniversityCommonComponent/AdmissionTablecollumn';

const AdmissionUnderUniversity = () => {

    const universityid = useSelector((state)=> state?.universityAuth?.university?.university?.id)
    const dispatch = useDispatch(); // Get the dispatch function from Redux

// console.log(universityid,'');

  useEffect(() => {
    if (universityid) {
      // Fetch colleges based on the user's university ID
      dispatch(getAllAdmission(universityid));
    }
  }, [dispatch, universityid]);


    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false);
    const [selecteStudent, setSelectedStudent] = useState(null);
    // const universityId = useSelector(state => state.university.university);


  //   useEffect(() => {
  //     // Dispatch the fetchCollege action when the component mounts
  //     dispatch(getAllStudents(universityId));
  // }, [dispatch]);

      // Retrieve college data from Redux store using useSelector
      const admissions = useSelector((state) => state.university?.admissionData?.admissions);
console.log(admissions,'addmm');

  // Check if data is an array
//   const isDataArray = Array.isArray(students);
//   console.log(isDataArray,'issss');

//       console.log(students,'iiiii');


// console.log(studentid,'sssssss');
//     function handleOnClose() {
//         setShowModal(false)
//     }

    
    
  
    const handleViewAdmission = async(admission) => {
      // setSelectedStudent(student);
      console.log(admission.id,'stud');
      const response = await dispatch(getUniversitySingleAdmission(admission.id)); // Dispatch action to set selected college
     if (response){
      navigate('/university/admissionDetail')
     }
    //   setShowModal(true);
      // console.log('Viewing profile for:', admission.name);
    };
    const columns = useMemo(() => admissionCollumn(handleViewAdmission, ), []);


    // const handleEdit = (college) => {
    //   setSelectedCollege(college); // Set the selected college
    //   setShowModal(true); // Show the modal
    // };
    
    // const handleDelete = async (college) => {
    //   try {
    //     // Dispatch the deleteCollege action with the college ID
    //      dispatch(deleteCollege(college.id));
    //     console.log('College deleted successfully');
    //   } catch (error) {
    //     console.error('Error deleting college:', error);
    //   }
    // };
   
  

    //  const Data = collegeData.map((collge)=>(
    //   { id: collge.id,  course: collge., college: collge.name,  },
    //  ))

        
  
  return (
    
        <div>
        <div className="p-2">

         <Header title='Sudents' Icon={FaGraduationCap} />
        </div>
         <Table heading={""} DATA={admissions} COLUMNS={columns} />
         {/* Render the EditModal component conditionally */}
      {/* {showModal && (
        <EditModal
          college={selectedCollege}
          onClose={() => setShowModal(false)} // Pass a function to close the modal
        />
      )} */}
            </div>
    
  )
}

export default AdmissionUnderUniversity