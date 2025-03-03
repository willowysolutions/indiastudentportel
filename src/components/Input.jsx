import  { useState } from 'react';

const Input = ({ label,type,name,register, error } ) => {
  // State to track whether the input has value
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    // Update the inputValue state whenever the input changes
    setInputValue(event.target.value);
    if (register(name).onChange) {
        register(name).onChange(event);
      }
  };

  // Calculate whether the label should stay up
  const labelShouldStayUp = inputValue.length > 0;
  console.log(type,"list fo typesssssssssss")

  return (
    <div className="relative mb-3">
      <input
        {...register}
        type={type}
        id={name}
        value={inputValue} // Controlled component
        onChange={handleInputChange} // Use custom change handler
        className="peer text-black block min-h-[auto] h-12 w-full rounded-lg border-blue-300 border-2 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 motion-reduce:transition-none dark:autofill:shadow-autofill dark:peer-focus:text-primary"
         />
      <label
        htmlFor={name}
        className={`pointer-events-none  py-0 absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0]  truncate pt-[0.67rem] leading-[1.3rem] text-blue-500 transition-all duration-200 ease-out ${labelShouldStayUp || type === "date" ? '-translate-y-[1.4rem] scale-[0.8] text-primary bg-white p-0' : 'peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-focus:bg-white peer-focus:p-0 '} motion-reduce:transition-none`}
      >
        {label}
      </label>
      <div className="">{error}</div>
    </div>
  );
}

export default Input;