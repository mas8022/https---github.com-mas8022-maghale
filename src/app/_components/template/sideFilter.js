"use client";
import React, { memo, useEffect } from "react";
import { useLocalStorage } from "mas22/useLocalStorage/useLocalStorage";

const SideFilterMobile = memo(({ filter, setFilter }) => {
  const [sideFlag, setSideFlag] = useLocalStorage("sidebarFilterFlag", false);

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
      <div
        onClick={() => setSideFlag(true)}
        className="w-full h-20 text-[1.3rem] text-second md:hidden bg-second/10 flex items-center justify-center rounded-md"
      >
        بر اساس
      </div>

      <div
        className={`w-[21rem] lg:w-96 h-screen bg-first dark:bg-[#1e293b] shadow-2xl text-2xl text-black font-light fixed top-0 transition-all ease-in-out duration-[0.4s] z-[1002] ${
          sideFlag ? "right-0" : "-right-[30rem]"
        }`}
      >
        <div className="w-full lg:w-96 gap-2 p-12 h-screen flex flex-col pt-20 bg-white dark:bg-[#1e293b]">
          <div
            onClick={() => setFilter("all")}
            className={`w-full h-14 dark:text-first pr-4 flex items-center active:scale-[99%] cursor-pointer ${
              filter === "all" && " bg-blue-600/10 rounded-xl cursor-pointer "
            }`}
          >
            محصولات این دسته
          </div>
          <div
            onClick={() => setFilter("freeProducts")}
            className={`w-full h-14 dark:text-first pr-4 flex items-center active:scale-[99%] cursor-pointer ${
              filter === "freeProducts" &&
              " bg-blue-600/10 rounded-xl cursor-pointer "
            }`}
          >
            محصولات رایگان
          </div>
          <div
            onClick={() => setFilter("bestSellers")}
            className={`w-full h-14 dark:text-first pr-4 flex items-center active:scale-[99%] cursor-pointer ${
              filter === "bestSellers" &&
              " bg-blue-600/10 rounded-xl cursor-pointer "
            }`}
          >
            پر فروش ترینّ
          </div>
          <div
            onClick={() => setFilter("cheapest")}
            className={`w-full h-14 dark:text-first pr-4 flex items-center active:scale-[99%] cursor-pointer ${
              filter === "cheapest" &&
              " bg-blue-600/10 rounded-xl cursor-pointer "
            }`}
          >
            ارزان ترین
          </div>

          <div
            onClick={() => setFilter("expensive")}
            className={`w-full h-14 dark:text-first pr-4 flex items-center active:scale-[99%] cursor-pointer ${
              filter === "expensive" &&
              " bg-blue-600/10 rounded-xl cursor-pointer "
            }`}
          >
            گران ترین
          </div>
        </div>
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
export default SideFilterMobile;
