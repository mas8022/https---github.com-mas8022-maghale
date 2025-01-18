"use client";
import useSanitizeInput from "@/utils/useSanitizeInput";
import { memo } from "react";

const CustomInput = memo(
  ({ id = "", label = "", formHandler, value, name }) => {
    return (
      <div className="relative">
        <input
          type="text"
          id={id}
          name={name}
          value={value}
          onChange={(e) => {
            const sanitizedValue = useSanitizeInput(e.target.value);
            formHandler.setFieldValue(name, sanitizedValue);
          }}
          className={`w-[27rem] sm:w-[24rem] xxl:w-[30rem] h-16 peer p-3 text-[1.4rem] text-gray-700 dark:text-first/70 outline-none border-[2px] border-gray-200 dark:border-none dark:bg-[#0d141f] rounded-lg hover:border-gray-300 focus:border-second`}
        />
        <label
          htmlFor={id}
          className={`absolute right-3 h-max top-0 m-auto rounded-full text-gray-400 peer-focus:text-second dark:peer-focus:text-first pointer-events-none transition-all ${
            !!value.length
              ? "px-1 bg-white dark:bg-[#1e293b] bottom-full text-[1.35rem]"
              : "text-[1.35rem] bottom-0 cursor-text peer-focus:px-1 peer-focus:bg-white dark:peer-focus:bg-[#1e293b] peer-focus:bottom-full peer-focus:text-[1.1rem]"
          }`}
        >
          {label}
        </label>
      </div>
    );
  }
);
export default CustomInput;
