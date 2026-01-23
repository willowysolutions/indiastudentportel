import icon from "../../assets/dashboard/wepik-export-20240313072348V9B7.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdOutlineEventNote } from "react-icons/md";
import { FaUniversity, FaWallet } from "react-icons/fa";
import { HiArrowRight, HiOutlineSparkles } from "react-icons/hi";
//imports................................................................................................

const Dashbord = () => {
  const navigate = useNavigate();
  const councilerdata = useSelector(
    (state) => state?.councilerAuth?.counsillor
  );

  const cards = [
    {
      title: "Bookings",
      description: "View all your upcoming sessions",
      icon: MdOutlineEventNote,
      path: "/counsellor/booking",
      color: "from-blue-500 to-indigo-600",
      bg: "bg-blue-50 text-blue-600",
    },
    {
      title: "Colleges",
      description: "Explore and manage college lists",
      icon: FaUniversity,
      path: "/counsellor/collegesCounsellors",
      color: "from-emerald-500 to-teal-600",
      bg: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "Wallet",
      description: "Check your earnings and balance",
      icon: FaWallet,
      path: "/counsellor/wallet",
      color: "from-violet-500 to-purple-600",
      bg: "bg-violet-50 text-violet-600",
    },
  ];

  return (
    <div className="space-y-6 w-full px-4 sm:px-6 lg:px-8 pb-10">
      {/* Welcome Section */}
      {/* Welcome Section */}
      <section className="relative overflow-hidden rounded-2xl bg-stone-50 border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/5 hover:border-blue-300/50 group">
        <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none group-hover:opacity-[0.08] transition-opacity duration-500">
            <HiOutlineSparkles size={200} className="text-blue-600 rotate-12"/>
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center p-8 gap-8">
          <div className="space-y-3 max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 group-hover:text-blue-700 transition-colors duration-300">
              Welcome back, <span className="text-blue-600">{councilerdata?.name?.split(" ")[0]}</span>
            </h2>
            <p className="text-slate-500 text-lg">
              Here&apos;s what&apos;s happening in your portal today.
            </p>
            
             <div className="flex flex-wrap gap-3 mt-4">
              <div className="px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200 flex items-center gap-2 text-sm text-slate-600 group-hover:border-blue-100 group-hover:bg-blue-50/30 transition-colors duration-300">
                <span className="font-medium text-slate-500">Mode:</span>
                <span className="font-bold text-slate-800 uppercase tracking-wide text-xs">{councilerdata.counsellor?.session_mode || "Online"}</span>
              </div>
              <div className="px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200 flex items-center gap-2 text-sm text-slate-600 group-hover:border-blue-100 group-hover:bg-blue-50/30 transition-colors duration-300">
                <span className="font-medium text-slate-500">Language:</span>
                <span className="font-semibold text-slate-800">{councilerdata.counsellor?.language || "English"}</span>
              </div>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="w-24 h-24 rounded-full bg-blue-50 p-1 border border-blue-100 shadow-sm group-hover:scale-105 transition-transform duration-300">
                 <img
                src={icon}
                alt="Profile"
                className="w-full h-full object-cover rounded-full border-2 border-white shadow-sm"
                />
            </div>
          </div>
        </div>
      </section>

      {/* Cards Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            onClick={() => navigate(card.path)}
            className="group relative bg-white border border-slate-100 rounded-3xl p-6 lg:p-8 cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1"
          >
            <div className="flex items-start justify-between mb-6">
              <div className={`p-4 rounded-2xl ${card.bg} transition-transform duration-300 group-hover:scale-110`}>
                <card.icon className="w-8 h-8" />
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 transform group-hover:rotate-45">
                <HiArrowRight className="w-5 h-5" />
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-indigo-700 transition-colors">
              {card.title}
            </h3>
            <p className="text-slate-500 text-sm font-medium">
              {card.description}
            </p>

            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent group-hover:via-indigo-500 transition-all duration-500 opacity-50"></div>
          </div>
        ))}
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
