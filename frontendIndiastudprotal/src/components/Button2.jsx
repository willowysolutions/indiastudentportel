

const Button2 = ({title}) => {
    return (
    
      <button className="rounded-xl mt-5 px-6 py-1 overflow-hidden group bg-black   text-black  transition-all ">
        {/* <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40"></span> */}
        <span className=" font-semibold text-white">{title}</span>
      </button>
    // </div>
    )
  }
  
  export default Button2