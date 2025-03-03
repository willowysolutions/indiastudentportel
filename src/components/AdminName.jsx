//imports................................................................................................
const AdminName = ({ data }) => {
  return (
    <div className="flex gap-2 text-center items-center">
      <div className="w-10 h-10 rounded-full bg-custom-gradient pb-1 flex items-center justify-center text-white">
        {data.name.split(" ")[0][0]}
      </div>
      <div className="">{data.name.split(" ")[0]}</div>
    </div>
  );
};

export default AdminName;
