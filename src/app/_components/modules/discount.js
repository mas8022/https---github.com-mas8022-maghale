"use client";
import { useLocalStorage } from "mas22/useLocalStorage/useLocalStorage";
import Image from "next/image";
import React, { memo } from "react";

const Discount = memo(() => {
  const [active, setActive] = useLocalStorage("discountBox", true);

  return (
    <div className={`${!active && "hidden"} w-full lgg:h-28 h-32`}>
      <div
        className={`${
          !active && "hidden"
        } fixed w-full right-0 lgg:h-28 h-32 md:mt-12 mt-4 bg-second/80 flex items-center justify-between px-[2.5rem] rounded-bl-full rounded-br-full z-50`}
      >
        <div className="w-full px-6 sm:px-[5rem] md:px-[10rem] xl:px-[15rem] flex items-center justify-between">
          <Image
            src={"/images/discount-svgrepo-com.svg"}
            placeholder="blur"
            blurDataURL={"/images/discount-svgrepo-com.svg"}
            width={100}
            height={100}
            alt="discount"
            className="sm:size-20 size-16 xm:block hidden"
          />
          <p className="sm:text-[1.6rem] text-[1.3rem] text-first font-bold ">
            تخفیفات ویژه 60% به مناسبت ماه رمضان
          </p>
          <button
            onClick={() => setActive(false)}
            className="sm:size-14 size-10 bg-first/20 sm:rounded-3xl rounded-xl flex items-center justify-center active:scale-95"
          >
            <Image
              src={"/images/multiplication-svgrepo-com.svg"}
              placeholder="blur"
              blurDataURL={"/images/multiplication-svgrepo-com.svg"}
              width={100}
              height={100}
              alt="close"
              className="sm:size-7 size-5"
            />
          </button>
        </div>
      </div>
    </div>
  );
});
export default Discount;
