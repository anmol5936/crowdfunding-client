import React from 'react';


const FormField = ({ 
  labelName, 
  placeholder, 
  inputType, 
  isTextArea, 
  value, 
  handleChange,
  handleFileChange 
}) => {
  return (
    <div className="flex-1 w-full flex flex-col">
      <label className="font-epilogue font-medium text-[14px] leading-[22px] text-gray-400 mb-[10px]">
        {labelName}
      </label>
      {isTextArea ? (
        <textarea
          required
          value={value}
          onChange={handleChange}
          rows={10}
          placeholder={placeholder}
          className="py-[15px] sm:px-[25px] px-[15px] outline-none border border-purple-500/10 bg-[#1e1e27] font-epilogue text-white text-[14px] placeholder:text-gray-600 rounded-xl w-full focus:border-purple-500/30 transition-colors duration-300"
        />
      ) : inputType === "file" ? (
        <input
          required
          type={inputType}
          accept="image/*"
          onChange={handleFileChange}
          className="py-[15px] sm:px-[25px] px-[15px] outline-none border border-purple-500/10 bg-[#1e1e27] font-epilogue text-white text-[14px] placeholder:text-gray-600 rounded-xl w-full focus:border-purple-500/30 transition-colors duration-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-500/10 file:text-purple-400 hover:file:bg-purple-500/20"
        />
      ) : (
        <input
          required
          value={value}
          onChange={handleChange}
          type={inputType}
          step="0.01"
          placeholder={placeholder}
          className="py-[15px] sm:px-[25px] px-[15px] outline-none border border-purple-500/10 bg-[#1e1e27] font-epilogue text-white text-[14px] placeholder:text-gray-600 rounded-xl w-full focus:border-purple-500/30 transition-colors duration-300"
        />
      )}
    </div>
  );
};

export default FormField;