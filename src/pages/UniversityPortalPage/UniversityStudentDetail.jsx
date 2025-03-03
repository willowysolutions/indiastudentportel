import { useEffect, useState } from "react";
import icon from "../../assets/dashboard/wepik-export-20240313072348V9B7.png";
import Button from "../../components/Button2";
import { MdComputer } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { deleteCourse, editCourse, fetchCollege } from "../../Redux/features/University/UniversitySlice";
import Table from "../../components/table/Table";
import EditCourseModal from "./CourseUpdateModal";

const UniversityStudentDetail = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const singleStudentDatas = useSelector((state) => state?.university?.singleAdmissionData);
console.log(singleStudentDatas,'bhbhbaddmissions');

  // Retrieve the selected college data from Redux store
  // const selectedStudent = useSelector(
  //   (state) => state.university.setSelectedStudent

  // );
  const singleStudentData = useSelector((state) => state?.university?.singleStudentData?.student);
console.log(singleStudentData,'bhbhbnnnnnn');

  const selectedStudent=useSelector(
    (state)=>(state.singleData)
  )
  console.log(selectedStudent,'ddddd');
  // console.log(selectedCollege, "selected college");
  //  // Log the selected college data in the console
  //  useEffect(() => {
  //    console.log("Selected College:", selectedCollege);
  //  }, [selectedCollege]); // Run this effect whenever selectedCollege changes

  useEffect(() => {
    // Dispatch the fetchCollege action when the component mounts
    dispatch(fetchCollege());
  }, [dispatch]);

  // Retrieve college data from Redux store using useSelector
  // const collegeData = useSelector((state) => state.university.collegeData);
 


 

  

  // const  allCourses = selectedCollege.courses;


// console.log(allCourses);

  return (
    <div className="">
      <div className="bg-[#F5F7F8] h-56 rounded-2xl w-full">
        <div className="flex bg-slate- justify-between">
          <div className="text-white flex flex-col  justify-center ml-10">
            <div className="text-[1.6rem]">
              {singleStudentData.name}
            </div>
            <ul className="mt-6 flex flex-col gap-2 text-white font- text-[15px]">
              <li>Email:{singleStudentData.email}</li>
              <li>Mobile:{singleStudentData.contact}</li>
              <li>{singleStudentData.address}</li>
            </ul>
          </div>

          <div className="mr-8">
            <img
              src={icon}
              alt="students log"
              className="w-[14rem] hover:animate-pulse"
            />
          </div>
        </div>

        <div className="mt-4  flex gap-10">
          <div className="bg-[#D7C7F0] h-64 w-72 rounded-xl flex flex-col items-center text-justify shadow-inner-black-25 ">
            <div className="flex justify-center font-semibold pt-5">
              College Detail
            </div>
            <ul className="mt-6 flex flex-col gap-2 text-[#4B4750] font-medium text-[15px]">
              {/* <li>Affliation:{selectedCollege.colleges.affiliation}</li> */}
              {/* <li>Place:{selectedCollege.colleges.street}</li> */}
              {/* <li>State:{selectedCollege.colleges.state}</li>/ */}
              {/* <li>Pin code:{selectedCollege.colleges.pin}</li> */}
              <li></li>
            </ul>
          </div>
          {/* <div className="bg-[#D7C7F0] h-64 w-72 rounded-xl flex flex-col items-center text-justify shadow-inner-black-25 ">
            <div className="flex justify-center font-semibold pt-5">
              Availabe Course
            </div> */}
            {/* <ul className="mt-6 flex flex-col gap-2 text-[#4B4750] font-medium text-[15px]"> */}
            {/* {selectedCollege.courses.map((course, index) => ( */}
            {/* // <li key={index}>{course.name} - Duration: {course.duration}, Fee: {course.fee}</li> */}
            {/* <Table heading={""} DATA={selectedCollege.courses} COLUMNS={columns} /> */}

            {/* ))} */}

            {/* </ul> */}
          {/* </div> */}


          <div className="bg-[#D7C7F0] h-64 w-72 rounded-xl flex flex-col items-center text-justify shadow-inner-black-25 ">
            <div className="flex justify-center font-semibold pt-5">
              Contact Details
            </div>
            <ul className="mt-6 flex flex-col gap-2 text-[#4B4750] font-medium text-[15px]">
              {/* <li>Mobile:{selectedCollege.colleges.mobile}</li>
              <li>Email:{selectedCollege.colleges.email}</li>
              <li>Place:{selectedCollege.colleges.street}</li> */}
            </ul>
          </div>
        </div>
        <div>
        {/* <Table heading={""} DATA={allCourses} COLUMNS={columns}/> */}
        {/* { showModal && (
          <EditCourseModal 
            course={selectedCourse} 
            onClose={() => {
              setShowModal(false);
              setSelectedCourse(null); 
            }} 
          />
        )} */}
        </div>

      </div>
    </div>
  );
};

export default UniversityStudentDetail;
