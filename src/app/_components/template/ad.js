"use client";
import Image from "next/image";
import React, { memo } from "react";
import Aos from "../modules/aos";

const Ad = memo(() => {
  return (
    <>
      <Aos />
      <div className="w-full py-9 lg:flex sm:grid sm:grid-cols-2 hidden items-center justify-between border-b-[1px] px-4 border-b-second rounded-3xl">
        <div
          data-aos="fade-left"
          data-aos-duration="1600"
          className="flex flex-col items-center justify-center gap-6"
        >
          <Image
            src={"/images/ad2.png"}
            placeholder="blur"
            blurDataURL={"/images/ad2.png"}
            width={300}
            height={300}
            alt="ویژگی های سایت"
            className="w-[24rem] h-[17rem] object-cover"
          />
          <span className="text-[1.5rem] text-black/70 font-light dark:text-first">
            اموزش اسان
          </span>
        </div>
        <div
          data-aos="fade-left"
          data-aos-duration="1000"
          className="flex flex-col items-center justify-center gap-6"
        >
          <Image
            src={"/images/ad3.png"}
            placeholder="blur"
            blurDataURL={"/images/ad3.png"}
            width={300}
            height={300}
            alt="ویژگی های سایت"
            className="w-[24rem] h-[17rem] object-cover"
          />
          <span className="text-[1.5rem] text-black/70 font-light dark:text-first">
            اساتید اکاه
          </span>
        </div>
        <div
          data-aos="fade-right"
          data-aos-duration="1000"
          className="flex flex-col items-center justify-center gap-6"
        >
          <Image
            src={"/images/ad4.png"}
            placeholder="blur"
            blurDataURL={"/images/ad4.png"}
            width={300}
            height={300}
            alt="ویژگی های سایت"
            className="w-[24rem] h-[17rem] object-cover"
          />
          <span className="text-[1.5rem] text-black/70 font-light dark:text-first">
            لذت در یادگیری
          </span>
        </div>
        <div
          data-aos="fade-right"
          data-aos-duration="1600"
          className="flex flex-col items-center justify-center gap-6"
        >
          <Image
            src={"/images/ad1.png"}
            placeholder="blur"
            blurDataURL={"/images/ad1.png"}
            width={300}
            height={300}
            alt="ویژگی های سایت"
            className="w-[24rem] h-[17rem] object-cover"
          />
          <span className="text-[1.5rem] text-black/70 font-light dark:text-first">
            اموزش های متنوع
          </span>
        </div>
      </div>
    </>
  );
});

export default Ad;
