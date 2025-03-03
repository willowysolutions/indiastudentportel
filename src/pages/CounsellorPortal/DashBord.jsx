import icon from "../../assets/dashboard/wepik-export-20240313072348V9B7.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "../../components/Button";
//imports................................................................................................

const Dashbord = () => {
  const navigate = useNavigate();
  const councilerdata = useSelector(
    (state) => state?.councilerAuth?.counsillor
  );
  return (
    <div className="space-y-8">
      <section className="bg-[#F5F7F8] rounded-2xl p-4 lg:p-6">
        <div className="flex flex-col md:flex-row justify-between gap-6 lg:gap-8">
          <div className="space-y-3">
            <h2 className="text-xl lg:text-2xl font-semibold">
              {councilerdata?.name}
            </h2>
            <div className="space-y-2 text-sm lg:text-base">
              <p>E-mail: {councilerdata?.email}</p>
              <p>Contact: {councilerdata?.contact}</p>
              <p>Session Mode: {councilerdata.counsellor?.session_mode}</p>
              <p>Language : {councilerdata.counsellor?.language}</p>
            </div>
            <p className="text-zinc-600 text-xs mt-4">
              Always Stay Updated With counsellor Portal
            </p>
          </div>

          <div className="flex justify-center md:justify-end">
            <img
              src={icon}
              alt="Counselor"
              className="w-32 md:w-48 lg:w-56 hover:animate-pulse transition-all"
            />
          </div>
        </div>
      </section>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
        <div
          className="activity-card bg-[#F5F7F8] p-4 rounded-xl hover:scale-105 transition-all duration-300 cursor-pointer flex flex-col items-center justify-center gap-4"
          onClick={() => navigate("/counsellor/booking")}
        >
          <h3 className="text-center ">Show all the Bookings</h3>
          <Button title="View" />
        </div>
        <div
          className="activity-card bg-[#F5F7F8] p-4 rounded-xl  hover:scale-105 transition-all duration-300 cursor-pointer flex flex-col items-center justify-center gap-4"
          onClick={() => navigate("/counsellor/collegesCounsellors")}
        >
          <h3 className="text-center ">Fetch All Colleges</h3>
          <Button title="View" />
        </div>
        <div
          className="activity-card bg-[#F5F7F8] p-4 rounded-xl  hover:scale-105 transition-all duration-300 cursor-pointer flex flex-col items-center justify-center gap-4"
          onClick={() => navigate("/counsellor/wallet")}
        >
          <h3 className="text-center ">Wallet Money</h3>
          <Button title="View" />
        </div>
      </section>
    </div>
  );
};

export default Dashbord;

// import icon from "../../assets/dashboard/wepik-export-20240313072348V9B7.png";
// import Button2 from "../../components/Button2";
// import { MdComputer } from "react-icons/md";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// const Dashbord = () => {
//   const navigate = useNavigate();

//   const councilerdata = useSelector(
//     (state) => state?.councilerAuth?.counsillor
//   );
//   return (
//     <div>
//       <section className="bg-[#F5F7F8] rounded-2xl p-4 lg:p-6">
//         <div className="flex flex-col md:flex-row justify-between gap-6 lg:gap-8">
//           <div className="text-white space-y-3">
//             <h2 className="text-xl lg:text-2xl font-semibold">
//               {councilerdata?.name}
//             </h2>
//             <div className="space-y-2 text-sm lg:text-base">
//               <p>E-mail: {councilerdata?.email}</p>
//               <p>Contact: {councilerdata?.contact}</p>
//               <p>Session Mode: {councilerdata.counsellor?.session_mode}</p>
//               <p>Language : {councilerdata.counsellor?.language}</p>
//             </div>
//             <p className="text-zinc-300 text-xs mt-4">
//               Always Stay Updated With Student Portal
//             </p>
//           </div>

//           <div className="flex justify-center md:justify-end">
//             <img
//               src={icon}
//               alt="Student"
//               className="w-32 md:w-48 lg:w-56 hover:animate-pulse transition-all"
//             />
//           </div>
//         </div>
//       </section>
//       <div className="flex flex-row gap-10 md:gap-20">
//         <div className="grid grid-cols-1 md:w-[500px] md:max-w-[500px] gap-2 mt-5">
//           <div className="activity-one  w-full h-16 rounded-[1rem] flex justify-between items-center px-2">
//             <div className="font-semibold">Total Number Of Counsellings</div>
//             <div className="font-semibold text-gray-800 text-[1.5rem]">88</div>
//           </div>

//           <div className="activity-two w-full h-16 rounded-[1rem] flex justify-between items-center px-2">
//             <div className="font-semibold">Total Number of Bookings</div>
//             <div className="font-semibold text-gray-800 text-[1.5rem]">200</div>
//           </div>

//           <div className="activity-three w-full h-16 rounded-[1rem] flex justify-between items-center px-2">
//             <div className="font-semibold">Average Review</div>
//             <div className="font-semibold text-gray-800 text-[1.5rem]">4.5</div>
//           </div>
//           <div className="activity-four w-full h-16 rounded-[1rem] flex justify-between items-center px-2">
//             <div className="font-semibold">New Bookings</div>
//             <div className="font-semibold text-gray-800 text-[1.5rem]">2</div>
//           </div>
//         </div>
//         <div className="">
//           <div className="activity-one px-8  h-32 w-72 mt-5 rounded-xl shadow-inner-black-25 relative text-white">
//             <div className="flex justify-cente  text-black font-semibold pt-5">
//               Bookings
//             </div>
//             <div className="b-red-400  absolute top-4 right-8 ">
//               <MdComputer className="text-[80px]" />
//             </div>
//             <div
//               className="mt-4"
//               onClick={() => navigate("/counsellor/booking")}
//             >
//               <Button2 title="View" />
//             </div>
//           </div>
//           <div className="activity-four px-8  h-32 w-72 mt-5 rounded-xl shadow-inner-black-25 relative text-white">
//             <div className="flex justify-cente  text-black font-semibold pt-5">
//               {" "}
//               colleges
//             </div>
//             <div className="b-red-400  absolute top-4 right-8 ">
//               <MdComputer className="text-[80px]" />
//             </div>
//             <div
//               className="mt-4"
//               onClick={() => navigate("/counsellor/collegesCounsellors")}
//             >
//               <Button2 title="View" />
//             </div>
//           </div>
//           <div className="activity-four px-8  h-32 w-72 mt-5 rounded-xl shadow-inner-black-25 relative text-white">
//             <div className="flex justify-cente  text-black font-semibold pt-5">
//               {" "}
//               Wallet
//             </div>
//             <div className="b-red-400  absolute top-4 right-8 ">
//               <MdComputer className="text-[80px]" />
//             </div>
//             <div
//               className="mt-4"
//               onClick={() => navigate("/counsellor/wallet")}
//             >
//               <Button2 title="View" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashbord;
