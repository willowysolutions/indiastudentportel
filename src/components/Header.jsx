const Header = ({ title, Icon }) => {
  return (
    <div className="p-3 flex justify-between items-center bg-custom-gradient w-full text-white rounded-xl">
      <div className="font-semibold text-lg md:text-xl">
        {title}
      </div>
      <div className="mr-5">
        <Icon className="w-6 h-6 md:w-8 md:h-8" />
      </div>
    </div>
  );
};

export default Header;
