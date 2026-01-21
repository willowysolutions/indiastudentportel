import  { useState } from 'react';

const Input = ({ label, type, name, register, error }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    if (register && register.onChange) {
      register.onChange(event);
    }
  };

  return (
    <div className="flex flex-col">
       {label && (
        <label htmlFor={name} className="mb-1.5 text-sm font-semibold text-slate-700 ml-1">
          {label}
        </label>
      )}
      <input
        {...register}
        type={type}
        id={name}
        onChange={(e) => {
             handleInputChange(e);
             if(register && register.onChange) register.onChange(e);
        }}
        className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all placeholder:text-slate-400 text-slate-700"
      />
      {error && <div className="text-rose-500 text-xs mt-1 ml-1">{error}</div>}
    </div>
  );
}

export default Input;