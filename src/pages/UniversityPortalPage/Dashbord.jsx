import { useNavigate } from "react-router-dom";
import icon from "../../assets/dashboard/wepik-export-20240313072348V9B7.png";
import Button2 from "../../components/Button2";
import { MdComputer } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-tailwind/react";
import { useEffect } from "react";
import {
  fetchCollege,
  getSingleCollege,
} from "../../Redux/features/University/UniversitySlice";

const Dashbord = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const universityData = useSelector(
    (state) => state?.universityAuth?.university
  );
  const data = useSelector((state) => state?.admin?.CollegeProfile?.college);
  console.log(data, "datadatadatadatadata");
  console.log(universityData, "universityData");

  const handleEditCollege = () => {
    navigate(`/university/editCollege/${data.id}`, {
      state: { college: data },
    });
  };

  useEffect(() => {
    const fetchCollegeData = async () => {
      try {
        if (universityData?.id) {
          // Pass the ID to the action and log the response
          const data = await dispatch(
            getSingleCollege(universityData.id)
          ).unwrap();
          console.log(data, "Fetched College Data");
        } else {
          console.warn("University ID is not available");
        }
      } catch (error) {
        console.error("Error fetching college data:", error);
      }
    };

    fetchCollegeData();
  }, [dispatch, universityData?.id]);

  return (
    <div className="space-y-8">
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button onClick={handleEditCollege}>Edit College</Button>
      </div>
      <section className="bg-[#F5F7F8] rounded-2xl p-4 lg:p-6">
        <div className="flex flex-col md:flex-row justify-between gap-6 lg:gap-8">
          <div className="space-y-3">
            <h2 className="text-xl lg:text-2xl font-semibold">
              {universityData?.name}
            </h2>
            <div className="space-y-2 text-sm lg:text-base">
              <p>E-mail: {universityData?.email}</p>
              <p>Contact: {universityData?.contact}</p>
            </div>
            <p className="text-zinc-600 text-xs mt-4">
              Always Stay Updated With university Portal
            </p>
          </div>
          <div className="flex justify-center md:justify-end">
            <img
              src={icon}
              alt="Counsellor"
              className="w-32 md:w-48 lg:w-56 hover:animate-pulse transition-all"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashbord;
