import icon from "../../assets/dashboard/wepik-export-20240313072348V9B7.png";
import Button from "../../components/Button";
import "react-circular-progressbar/dist/styles.css";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
//imports................................................................................................
const Dashbord = () => {
  const navigate = useNavigate();
  const student = useSelector((state) => state?.studentAuth?.studentDetails);

  const dashboardCards = [
    {
      title: "Take a Aptitude test",
      buttonText: "Take Test",
      path: "/student/test",
    },
    {
      title: "Book A Counsellor",
      buttonText: "Book Now",
      path: "/student/counsillor",
    },
    {
      title: "Booking status",
      buttonText: "Status",
      path: "/student/bookings",
    },
    {
      title: "Recommended College",
      buttonText: "Colleges",
      path: "/student/recommended",
    },
  ];

  return (
    <div className="space-y-8">
      <section className="bg-[#F5F7F8] rounded-2xl p-4 lg:p-6">
        <div className="flex flex-col md:flex-row justify-between gap-6 lg:gap-8">
          <div className=" space-y-3">
            <h2 className="text-xl lg:text-2xl font-semibold">
              {student?.name}
            </h2>
            <div className="space-y-2 text-sm lg:text-base">
              <p>E-mail: {student?.email}</p>
              <p>Contact: {student?.contact}</p>
              <p>School: {student?.school}</p>
              <p>Stream: {student?.stream}</p>
            </div>
            <p className="text-zinc-500 text-xs mt-4">
              Always Stay Updated With Student Portal
            </p>
          </div>

          <div className="flex justify-center md:justify-end">
            <img
              src={icon}
              alt="Student"
              className="w-32 md:w-48 lg:w-56 hover:animate-pulse transition-all"
            />
          </div>
        </div>
      </section>

      {/* Dashboard Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
        {dashboardCards.map((card, index) => (
          <div
            key={index}
            onClick={() => navigate(card.path)}
            className="bg-[#F5F7F8] p-4 rounded-xl 
              hover:scale-105 transition-all duration-300 cursor-pointer
              flex flex-col items-center justify-center gap-4"
          >
            <h3 className="text-center font-medium">{card.title}</h3>
            <Button title={card.buttonText} />
          </div>
        ))}
      </section>
    </div>
  );
};

export default Dashbord;
