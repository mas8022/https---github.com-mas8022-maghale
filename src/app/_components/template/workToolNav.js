"use client";
import Image from "next/image";
import Link from "next/link";
import React, { memo, useEffect, useState } from "react";
import {
  usePathname,
  useRouter,
  useSelectedLayoutSegment,
} from "next/navigation";

const WorkToolNav = () => {
  const router = useRouter();

  const [isAuthor, setIsAuthor] = useState(false);
  const [messageLength, setMessageLength] = useState(0);

  const segment = useSelectedLayoutSegment();

  const selectSegment = (pathName = null) => {
    return segment === pathName ? "border-b-2 dark:border-b-first pb-1" : "";
  };

  const path = usePathname();
  let deActiveNav = false;
  if (path === "/coWorker/employment") {
    deActiveNav = true;
  }

  useEffect(() => {
    fetch("/api/cms/authorReceiveMessage/getAll")
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        if (result.status === 200) {
          setMessageLength(result.data);
        }
      });

    fetch("/api/resetAuthorToken")
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        if (result.status === 200) {
          setIsAuthor(true);
        } else {
          router.replace("/coWorker/employment");
        }
      });
  }, []);

  useEffect(() => {
    fetch("/api/cms/authorReceiveMessage/getAll")
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        if (result.status === 200) {
          setMessageLength(result.data);
        }
      });

    fetch("/api/resetAuthorToken")
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        if (result.status === 200) {
          setIsAuthor(true);
        } else {
          router.replace("/coWorker/employment");
        }
      });
  }, []);

  return isAuthor ? (
    <div
      className={`WorkToolNav w-full h-auto mb-16 px-9 xm:py-4 py-10 gap-20 flex xm:flex-row flex-col-reverse items-center justify-between bg-second/5 dark:bg-[#111827]/60 border-y-1 border-y-second/50 rounded-lg ${
        deActiveNav && "hidden"
      }`}
    >
      <div className="h-full flex items-center gap-8 xm:child:text-[1.4rem] child:text-[1.3rem] child:text-black child:dark:text-first child:font-light child:cursor-pointer child:dark:border-b-first/80 child:border-b-black/80">
        <Link href={"/coWorker"} className={selectSegment(null)}>
          پروژه جدید
        </Link>
        <Link
          href={"/coWorker/draftedProject"}
          className={selectSegment("draftedProject")}
        >
          پیش نویس ها
        </Link>
        <Link
          href={"/coWorker/myProjects"}
          className={selectSegment("myProjects")}
        >
          پروژ های من
        </Link>
      </div>
      <div className="h-full flex items-center gap-8">
        <Link
          href={"/coWorker/authorNotification"}
          className="relative sm:size-20 size-14 bg-second/10 rounded-full flex items-center justify-center cursor-pointer active:scale-95 active:bg-first/5 transition-all duration-200"
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
        <Link href={"/coWorker/authorProfiler"}>
          <Image
            src={"/images/profile.jpg"}
            width={100}
            height={100}
            alt="عکس نویسنده"
            className="size-24 object-cover border-2 border-second/50 rounded-full cursor-pointer"
          />
        </Link>
      </div>
    </div>
  ) : null;
};

export default WorkToolNav;
