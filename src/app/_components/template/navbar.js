import Image from "next/image";
import React, { memo, Suspense } from "react";
import Link from "next/link";
import SidBar from "./sidbar";
import InputSearchNav from "./inputSearchNav";
import ThemeToggle from "../modules/themeToggle";
import ProfileBtn from "./profileBtn";

const Navbar = memo(() => {
  return (
    <div className="fixed top-0 left-0 w-full h-[5rem] md:h-[8rem] shadow-md dark:shadow-none dark:border-b-[1px] dark:border-second/30 dark:shadow-black flex items-center dark:bg-[#1e293b] justify-between px-6 sm:px-[5rem] md:px-[10rem] xl:px-[15rem] bg-first z-[1000] gap-4">
      <ul className="gap-3 sm:gap-6 md:gap-7 text-[1.25rem] md:text-[1.6rem]  hidden ld:flex child:dark:text-first">
        <Link href={"/"}>خانه</Link>

        <ul className="relative group flex gap-2 items-center">
          <li className="dark:text-first">دوره ها</li>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6 group-hover:rotate-180 !dark:invert"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>

          <ul className="w-[23rem] absolute right-0 rounded-xl top-full mt-4 bg-first dark:bg-[#1f2937] shadow-md p-6 flex flex-col gap-y-1 border-y-2 border-y-second invisible opacity-0 group-hover:visible group-hover:opacity-100 group-hover:mt-2 child:cursor-pointer child-hover:bg-second/30 child:rounded-lg child:pr-4 child:h-12 child:flex child:items-center pb-16 delay-100 child:dark:text-first">
            <Link href={"/products/همه محصولات"}>همه محصولات</Link>
            <Link href={"/products/نرم افزار و فناوری اطلاعات"}>
              نرم افزار و فناوری اطلاعات
            </Link>
            <Link href={"/products/اقتصاد و حسابداری"}>اقتصاد و حسابداری</Link>
            <Link href={"/products/کسب و کار"}>کسب و کار</Link>
            <Link href={"/products/کودک و نوجوان"}>کودک و نوجوان</Link>
            <Link href={"/products/اموزش زبان"}>اموزش زبان</Link>
            <Link href={"/products/هنر طراحی"}>هنر طراحی</Link>
          </ul>
        </ul>

        <Link href={"/coWorker"}>همکاری باما</Link>
        <Link href={"/contactUs"}>تماس با ما</Link>
        <Link href={"/aboutUs"}>درباره ما</Link>
      </ul>

      <SidBar />

      <div className="flex gap-3 sm:gap-5 md:gap-7 items-center">
        <InputSearchNav />
        <ThemeToggle />

        <ProfileBtn />

        <Link href={"/"}>
          <Image
            src="/images/logo.png"
            blurDataURL="/images/logo.png"
            alt="site logo"
            width={60}
            height={60}
            placeholder="blur"
            className="w-[3.5rem] h-[3.5rem] md:w-[5rem] md:h-[5rem] cursor-pointer"
          />
        </Link>
      </div>
    </div>
  );
});
export default Navbar;
