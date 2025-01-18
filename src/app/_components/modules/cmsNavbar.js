"use client";
import Image from "next/image";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import React, { memo, useEffect, useState } from "react";
import Side from "./side";
import ThemeToggle from "./themeToggle";

const CmsNavbar = () => {
  const [manager, setManager] = useState({});
  const [messageLength, setMessageLength] = useState(0);
  const segment = useSelectedLayoutSegment();

  const isActive = (path = null) => {
    return segment === path ? "bg-black/10 dark:bg-first/5" : "";
  };

  useEffect(() => {
    fetch("/api/cms/getContactUsMessage")
      .then((res) => res.json())
      .then((data) => {
        setMessageLength(data);
      });
    fetch("/api/me")
      .then((res) => res.json())
      .then((result) => setManager(result));
  }, []);

  return (
    <div className="nav w-full h-28 bg-first dark:bg-[#0d141f] shadow-xl flex items-center justify-between py-4 sm:px-12 px-6">
      <div className="flex items-center gap-4">
        <Side cls={"sm:hidden"} sideBarName={"cmsSideBar"}>
          <div className="w-full h-full bg-second dark:bg-[#0d141f] shadow-2xl py-16 px-11 flex flex-col gap-16">
            <p className="sm:text-[2.9rem] text-[2.2rem] sm:pb-6 pb-3 sm:pr-6 pr-3 text-first font-light sm:border-b-2 border-b-[1px] border-b-first">
              پیشخوان
            </p>
            <ul className="flex flex-col sm:gap-4 gap-2 sm:child:text-[1.8rem] child:text-[1.4rem] child:text-first sm:child:px-6 child:px-4 sm:child:py-3 child:py-2 child:cursor-pointer child:flex child:rounded-lg child:gap-2 child:items-center">
              <Link
                href="/cms/"
                className={`active:bg-black/10 ${isActive(null)}`}
              >
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="sm:size-10 size-7"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                    />
                  </svg>
                  محصولات
                </div>
              </Link>
              <Link
                href="/cms/authors"
                className={`active:bg-black/10 ${isActive("authors")}`}
              >
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="sm:size-10 size-7"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                  نویسندگان
                </div>
              </Link>
              <Link
                href="/cms/users"
                className={`active:bg-black/10 ${isActive("users")}`}
              >
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="sm:size-10 size-7"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                    />
                  </svg>
                  کاربران
                </div>
              </Link>
              <Link
                href="/cms/awaitingConfirmation"
                className={`active:bg-black/10 ${isActive(
                  "awaitingConfirmation"
                )}`}
              >
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="sm:size-10 size-7"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3"
                    />
                  </svg>
                  تایید محصولات
                </div>
              </Link>
              <Link
                href="/cms/confirmAuthors"
                className={`active:bg-black/10 ${isActive("confirmAuthors")}`}
              >
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="sm:size-10 size-7"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                    />
                  </svg>
                  تایید نویسندگان
                </div>
              </Link>
              <Link
                href="/cms/commentsSended"
                className={`active:bg-black/10 ${isActive("commentsSended")}`}
              >
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="sm:size-10 size-7"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                    />
                  </svg>
                  نظرات ارسالی
                </div>
              </Link>
              <Link
                href="/cms/commentsProducts"
                className={`active:bg-black/10 ${isActive("commentsProducts")}`}
              >
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="sm:size-10 size-7"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                    />
                  </svg>
                  نظرات محصولات
                </div>
              </Link>

              <Link href="/" className={`active:bg-black/10`}>
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="sm:size-10 size-7"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                    />
                  </svg>
                  بازگشت
                </div>
              </Link>
            </ul>
          </div>
        </Side>

        <Link
          href="/cms/cmsNotif"
          className="relative sm:size-20 size-14 bg-black/10 dark:bg-first/5 rounded-full flex items-center justify-center cursor-pointer active:scale-95 active:bg-first transition-all duration-200"
        >
          {messageLength ? (
            <div className="absolute sm:-top-2 sm:left-12 -top-4 left-9 size-7 flex items-center justify-center rounded-full text-xl bg-red-900 text-first">
              {messageLength}
            </div>
          ) : null}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="sm:size-10 size-8 dark:stroke-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
            />
          </svg>
        </Link>
        <ThemeToggle />
      </div>

      <div className="flex items-center gap-6">
        <div className="flex flex-col items-end gap-1">
          <p className="sm:text-[1.5rem] text-[1.37rem] text-black/80 dark:text-first">
            {manager?.fullName}
          </p>
          <p className="sm:text-[1.3rem] text-[1.1rem] font-light text-black/60 dark:text-first/50">
            {manager?.email}
          </p>
        </div>
        <Link href="/cms/profiler">
          <Image
            src={manager?.profile || "/images/profile.jpg"}
            placeholder="blur"
            blurDataURL={manager?.profile || "/images/profile.jpg"}
            width={100}
            height={100}
            alt="عکس ادمین"
            className="sm:size-20 size-16 rounded-full object-cover"
          />
        </Link>
      </div>
    </div>
  );
};
export default CmsNavbar;
