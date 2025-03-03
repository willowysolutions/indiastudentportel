import { useEffect, useState } from "react";
import icon from "../../assets/dashboard/wepik-export-20240313072348V9B7.png";
import Button from "../../components/Button2";
import { MdComputer } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { deleteCourse, editCourse, fetchCollege } from "../../Redux/features/University/UniversitySlice";
import Table from "../../components/table/Table";
import EditCourseModal from "./CourseUpdateModal";

const UniversityAdmissionDetail = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);


  // Retrieve the selected college data from Redux store
  // const selectedStudent = useSelector(
  //   (state) => state.university.setSelectedStudent

  // );
  const singleStudentData = useSelector((state) => state?.university?.singleAdmissionData.admission);
console.log(singleStudentData,'bhbhb');

  // const selectedStudent=useSelector(
  //   (state)=>(state.singleData)
  // )
  // console.log(selectedStudent,'ddddd');
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
              {singleStudentData.student_name}
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

        <div className="mt-4  flex gap-10 lg:gap-20">
        <div className="activity-four md:w-[400px] rounded-xl shadow-inner-black-25" style={{ display: "table", width: "" }}>
  <table style={{ width: "100%" }}>
    <tbody>
      <tr>
        <th colSpan="2" className="p-4 text-center font-semibold border-b">College Detail</th>
      </tr>
      <tr className="border-b border-2">
        <td className="p-4 font-medium border-r border-2">Affiliation:</td>
        <td className="p-4 border-r border-2">{singleStudentData.college.affliation}</td>
      </tr>
      <tr className="border-b border-2">
        <td className="p-4 font-medium border-r border-2">Place:</td>
        <td className="p-4 border-r border-2">{singleStudentData.college.street}</td>
      </tr>
      <tr className="border-b border-2">
        <td className="p-4 font-medium border-r border-2">State:</td>
        <td className="p-4 border-r border-2">{singleStudentData.state.state}</td>
      </tr>
      <tr className="border-b border-2">
        <td className="p-4 font-medium border-r border-2">Pin code:</td>
        <td className="p-4">{singleStudentData.college.pin_code}</td>
      </tr>
    </tbody>
  </table>
</div>


          


<div className="activity-one rounded-xl  md:w-[400px] shadow-inner-black-25" style={{ display: "table", width: '' }}>
  <table style={{ width: "100%" }}>
    <tbody>
      <tr>
        <th className="p-4 text-center font-semibold border-b" colSpan="2">Student Data</th>
      </tr>
      <tr className="border-b border-2">
        <td className="p-4 font-medium">Student Name:</td>
        <td className="p-4">{singleStudentData.student_name}</td>
      </tr>
      <tr className="border-b border-2">
        <td className="p-4 font-medium">Guardian:</td>
        <td className="p-4">{singleStudentData.guardian}</td>
      </tr>
      <tr className="border-b border-2">
        <td className="p-4 font-medium">Address:</td>
        <td className="p-4">{singleStudentData.address}</td>
      </tr>
      <tr className="border-b border-2">
        <td className="p-4 font-medium">Nationality:</td>
        <td className="p-4">{singleStudentData.nationality}</td>
      </tr>
      <tr className="border-b border-2">
        <td className="p-4 font-medium">Religion:</td>
        <td className="p-4">{singleStudentData.religion}</td>
      </tr>
    </tbody>
  </table>
</div>

 
        </div>
    
        <div className="md:flex lg:grid grid-cols-1 gap-2 mt-8  md:w-full">
<div className="activity-one  w-[400px] h-16 rounded-[1rem] flex justify-between items-center px-2">
  <div className="font-semibold">College Name</div>
  <div className="font-semibold text-gray-800 text-[1.5rem]">{singleStudentData.college.name}</div>
</div>

<div className="activity-two w-[400px] h-16 rounded-[1rem] flex justify-between items-center px-2">
  <div className="font-semibold"> Course Name</div>
  <div className="font-semibold text-gray-800 text-[1.5rem]">{singleStudentData.course.course_name}</div>
</div>
</div>
      </div>
    </div>
  );
};

export default UniversityAdmissionDetail;
