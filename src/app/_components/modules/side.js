"use client";
import React, { memo, useEffect } from "react";
import { useLocalStorage } from "mas22/useLocalStorage/useLocalStorage";
const Side = memo(({ children, sideBarName, cls }) => {
  const [sideFlag, setSideFlag] = useLocalStorage(sideBarName, false);

  useEffect(() => {
    const closeSideBarHandler = (e) => {
      if (e.target.contains(document.querySelector(".bgActive"))) {
        setSideFlag(false);
      }
    };
    window.addEventListener("click", (e) => {
      closeSideBarHandler(e);
    });
    return () => window.removeEventListener("click", closeSideBarHandler);
  }, []);

  return (
    <>
      <svg
        onClick={() => setSideFlag(true)}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className={`w-12 h-12 dark:stroke-white ${cls}`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
        />
      </svg>

      <div
        className={`w-[21rem] h-screen bg-first shadow-2xl fixed top-0 transition-all ease-in-out duration-[0.4s] z-[1002] ${
          sideFlag ? "right-0" : "-right-[30rem]"
        }`}
      >
        {children}
      </div>
      <div
        className={
          sideFlag
            ? "bgActive w-full h-full z-[1001] bg-black/20 fixed top-0 left-0"
            : "hidden"
        }
      ></div>
    </>
  );
});

export default Side;
