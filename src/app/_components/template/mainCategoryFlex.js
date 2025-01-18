import React, { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import Aos from "../modules/aos";

const MainCategoryFlex = memo(() => {
  return (
    <div className="w-full flex items-center">
      <Aos />
      <div className=" grid grid-cols-2 xm:grid-cols-3 lgg:grid-cols-6 gap-8 my-0 mx-auto child:rounded-3xl">
        <Link
          data-aos="fade-up"
          data-aos-duration="2000"
          href={"/products/نرم افزار و فناوری اطلاعات"}
          className="size-60 p-[1rem] flex flex-col items-center justify-center gap-8 shadow-lg bg-gray-400/30 dark:bg-gray-700/70 rounded-[30px] active:scale-80"
        >
          <Image
            src={"/images/imac-svgrepo-com.svg"}
            placeholder="blur"
            blurDataURL={"/images/imac-svgrepo-com.svg"}
            width={120}
            height={120}
            className="size-28 dark:invert"
            alt="دسته بندی ها"
          />
          <span className="text-black text-[1.35rem] md:text-[1.3rem] dark:text-first">
            نرم افزار و فناوری اطلاعات
          </span>
        </Link>

        <Link
          data-aos="fade-up"
          data-aos-duration="2000"
          href={"/products/اقتصاد و حسابداری"}
          className="size-60 p-[1rem] flex flex-col items-center justify-center gap-8 shadow-lg bg-gray-400/30 dark:bg-gray-700/70 rounded-[30px] active:scale-80"
        >
          <Image
            src={"/images/envelope-stats-svgrepo-com.svg"}
            placeholder="blur"
            blurDataURL={"/images/envelope-stats-svgrepo-com.svg"}
            width={120}
            height={120}
            className="size-28 dark:invert"
            alt="دسته بندی ها"
          />
          <span className="text-black text-[1.35rem] md:text-[1.3rem] dark:text-first">
            اقتصاد و حسابداری
          </span>
        </Link>

        <Link
          data-aos="fade-up"
          data-aos-duration="1000"
          href={"/products/کسب و کار"}
          className="size-60 p-[1rem] flex flex-col items-center justify-center gap-8 shadow-lg bg-gray-400/30 dark:bg-gray-700/70 rounded-[30px] active:scale-80"
        >
          <Image
            src={"/images/job-desktop-svgrepo-com.svg"}
            placeholder="blur"
            blurDataURL={"/images/job-desktop-svgrepo-com.svg"}
            width={120}
            height={120}
            className="size-28 dark:invert"
            alt="دسته بندی ها"
          />
          <span className="text-black text-[1.35rem] md:text-[1.3rem] dark:text-first">
            کسب و کار
          </span>
        </Link>

        <Link
          data-aos="fade-up"
          data-aos-duration="1000"
          href={"/products/کودک و نوجوان"}
          className="size-60 p-[1rem] flex flex-col items-center justify-center gap-8 shadow-lg bg-gray-400/30 dark:bg-gray-700/70 rounded-[30px] active:scale-80"
        >
          <Image
            src={"/images/birdhouse-svgrepo-com.svg"}
            placeholder="blur"
            blurDataURL={"/images/birdhouse-svgrepo-com.svg"}
            width={120}
            height={120}
            className="size-28 dark:invert"
            alt="دسته بندی ها"
          />
          <span className="text-black text-[1.35rem] md:text-[1.3rem] dark:text-first">
            کودک و نوجوان
          </span>
        </Link>

        <Link
          data-aos="fade-up"
          data-aos-duration="1500"
          href={"/products/اموزش زبان"}
          className="size-60 p-[1rem] flex flex-col items-center justify-center gap-8 shadow-lg bg-gray-400/30 dark:bg-gray-700/70 rounded-[30px] active:scale-80"
        >
          <Image
            src={"/images/book-write-svgrepo-com.svg"}
            width={120}
            height={120}
            className="size-28 dark:invert"
            alt="دسته بندی ها"
          />
          <span className="text-black text-[1.35rem] md:text-[1.3rem] dark:text-first">
            اموزش زبان
          </span>
        </Link>

        <Link
          data-aos="fade-up"
          data-aos-duration="2000"
          href={"/products/هنر طراحی"}
          className="size-60 p-[1rem] flex flex-col items-center justify-center gap-8 shadow-lg bg-gray-400/30 dark:bg-gray-700/70 rounded-[30px] active:scale-80"
        >
          <Image
            src={"/images/art-tools-svgrepo-com.svg"}
            width={120}
            height={120}
            className="size-28 dark:invert"
            alt="دسته بندی ها"
          />
          <span className="text-black text-[1.35rem] md:text-[1.3rem] dark:text-first">
            هنر طراحی
          </span>
        </Link>
      </div>
    </div>
  );
});
export default MainCategoryFlex;
