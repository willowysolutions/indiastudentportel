import React, { useState } from "react";

const Input = ({ label, type, id, register, errors }) => {
  const [inputValue, setInputValue] = useState("");
  console.log("ssss");
  
  
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    
  };
  const labelShouldStayUp = inputValue.length > 0;
  return (
    <div className="relative mb-3">
      <input
        type={type}
        id={id}
        {...register(id)}
        onChange={handleInputChange}
        value={inputValue}
        className="peer text-black block min-h-[auto] h-12 w-full rounded-lg border-blue-300 border-2 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 motion-reduce:transition-none dark:autofill:shadow-autofill dark:peer-focus:text-primary"
      />
      <label
        htmlFor={id}
        className={`pointer-events-none px-2 py-0 absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.67rem] leading-[1.6] text-blue-500 transition-all duration-200 ease-out ${
          labelShouldStayUp
            ? "-translate-y-[0.9rem] scale-[0.8] text-primary bg-white pt-0"
            : "peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-focus:bg-white "
        } motion-reduce:transition-none`}
      >
        {label}
      </label>
      <div className="text-red-500">
        {errors && errors[id] && errors[id].message}
      </div>
    </div>
  );
};

export default Input;
