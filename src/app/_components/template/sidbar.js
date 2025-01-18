"use client";
import Link from "next/link";
import React, { memo } from "react";
import useToggle from "../../../../utils/toggle";
import Side from "../modules/side";

const SidBar = memo(() => {
  const [isOpen, toggleOpen] = useToggle("sidBarUlActivation");

  return (
    <>
      <Side sideBarName={"sidBarActivation"} cls={"ld:hidden"}>
        <div className="w-full h-full flex flex-col justify-between p-[4rem] px-[3rem] dark:bg-[#1e293b]">
          <ul className="text-[1.4rem] flex flex-col gap-6 child:text-black child:dark:text-first">
            <Link href={"/"} className="flex gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
              خانه
            </Link>

            <ul className="flex flex-col">
              <div
                onClick={(e) => toggleOpen(e)}
                className="flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className={`${isOpen ? "rotate-180" : ""} size-6`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
                <p className="text-black dark:text-first">دوره ها</p>
              </div>
              <ul
                onClick={(e) => e.stopPropagation()}
                className={`child:text-[1.27rem] flex flex-col text-black/70 dark:text-first/50 font-light overflow-hidden transition-all duration-200 ${
                  isOpen ? "!h-auto  pt-4 gap-2" : "!h-0"
                }`}
              >
                <Link href={"/products/همه محصولات"}>همه محصولات</Link>
                <Link href={"/products/اقتصاد و حسابداری"}>
                  اقتصاد و حسابداری
                </Link>
                <Link href={"/products/کسب و کار"}>کسب و کار</Link>
                <Link href={"/products/کودک و نوجوان"}>کودک و نوجوان</Link>
                <Link href={"/products/اموزش زبان"}>اموزش زبان</Link>
                <Link href={"/products/هنر طراحی"}>هنر طراحی</Link>
              </ul>
            </ul>

            <Link href={"/coWorker"} className="flex gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
                />
              </svg>
              همکاری باما
            </Link>
            <Link href={"/contactUs"} className="flex gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                />
              </svg>
              تماس باما
            </Link>
            <Link href={"/aboutUs"} className="flex gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                />
              </svg>
              درباره ما
            </Link>
            <Link href={"/regulation"} className="flex gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.25-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z"
                />
              </svg>
              قوانین و مقررات
            </Link>
          </ul>

          <div className="py-[1rem] w-full h-[5rem] border-t-[1px] border-t-black/50 dark:border-t-first/50 flex flex-col items-start child:text-black child:dark:text-first">
            <span className="text-[1.2rem] ltr">+98 911 318 51 37</span>
            <span className="text-[1.2rem] ltr">0111 2302 24 18</span>
          </div>
        </div>
      </Side>
    </>
  );
});
export default SidBar;
