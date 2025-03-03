import { useNavigate } from "react-router-dom";
import icon from "../../../assets/dashboard/ADMIN.png";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useSelector } from "react-redux";
import Button from "../../../components/Button";

const DashbordAdmin = () => {
  const admin = useSelector((state) => state?.adminauth?.admin);
  const navigate = useNavigate();
  return (
    <div className="space-y-8">
      <section className="bg-[#F5F7F8] rounded-2xl p-4 lg:p-6">
        <div className="flex flex-col md:flex-row justify-between gap-6 lg:gap-8">
          <div className="space-y-3">
            <h2 className="text-xl lg:text-2xl font-semibold">{admin?.name}</h2>
            <div className="space-y-2 text-sm lg:text-base">
              <p>E-mail: {admin?.email}</p>
              <p>Role: {admin?.role}</p>
            </div>
            <p className="text-zinc-600 text-xs mt-4">
              Manage and monitor activities through the Admin Portal
            </p>
          </div>
          <div className="flex justify-center md:justify-end">
            <img
              src={icon}
              alt="Admin Icon"
              className="w-32 md:w-48 lg:w-56 hover:animate-pulse transition-all"
            />
          </div>
        </div>
      </section>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
        <div
          className="activity-card bg-[#F5F7F8] p-4 rounded-xl hover:scale-105 transition-all duration-300 cursor-pointer flex flex-col items-center justify-center gap-4"
          onClick={() => navigate("/admin/students")}
        >
          <h3 className="text-center font-medium">Students</h3>
          <Button title="Manage" />
        </div>
        <div
          className="activity-card bg-[#F5F7F8] p-4 rounded-xl hover:scale-105 transition-all duration-300 cursor-pointer flex flex-col items-center justify-center gap-4"
          onClick={() => navigate("/admin/councillors")}
        >
          <h3 className="text-center font-medium">Counsellor</h3>
          <Button title="Manage" />
        </div>
        <div
          className="activity-card bg-[#F5F7F8] p-4 rounded-xl hover:scale-105 transition-all duration-300 cursor-pointer flex flex-col items-center justify-center gap-4"
          onClick={() => navigate("/admin/colleges")}
        >
          <h3 className="text-center font-medium">Colleges</h3>
          <Button title="Manage" />
        </div>
        <div
          className="activity-card bg-[#F5F7F8] p-4 rounded-xl hover:scale-105 transition-all duration-300 cursor-pointer flex flex-col items-center justify-center gap-4"
          onClick={() => navigate("/admin/admission")}
        >
          <h3 className="text-center font-medium">Admissions</h3>
          <Button title="Manage" />
        </div>
      </section>
    </div>
  );
};

export default DashbordAdmin;
