"use client";
import React, { memo } from "react";

const SelectBox = memo(({ formikInstance }) => {
  return (
    <>
      <select
        id="group"
        name="group"
        onChange={formikInstance.handleChange}
        onBlur={formikInstance.handleBlur}
        value={formikInstance.values.group ? formikInstance.values.group : ""}
        className="xxl:w-[30rem] w-[24.3rem] h-[4.2rem] text-black/50 dark:text-first/60 dark:bg-[#0d141f] text-[1.3rem] rounded-lg border-[1px] outline-none border-gray-600/30 px-6 focus:outline-none"
      >
        <option value="" label="دسته بندی" hidden />
        <option
          value="نرم افزار و فناوری اطلاعات"
          label="نرم افزار و فناوری اطلاعات"
        />
        <option value="اقتصاد و حسابداری" label="اقتصاد و حسابداری" />
        <option value="کسب و کار" label="کسب و کار" />
        <option value="کودک و نوجوان" label="کودک و نوجوان" />
        <option value="اموزش زبان" label="اموزش زبان" />
        <option value="هنر طراحی" label="هنر طراحی" />
      </select>
    </>
  );
});

export default SelectBox;
