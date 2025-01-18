import React from "react";
import CmsSideBar from "../_components/modules/cmsSideBar";
import CmsNavbar from "../_components/modules/cmsNavbar";
import CmsScroller from "../_components/template/cmsScroller";
import VerifyManager from "@/utils/verifyManager";

const layout = async ({ children }) => {
  
  await VerifyManager();

  return (
    <>
      <div className="hidden-scrollbar w-full h-screen fixed top-0 left-0 overflow-y-scroll bg-first dark:bg-[#1e293b] z-[2000] flex">
        <CmsSideBar />
        <div className="hidden-scrollbar sm:w-5/6 w-full h-screen overflow-y-scroll relative">
          <CmsNavbar />
          <div className="w-full sm:p-12 p-6">{children}</div>
        </div>
        <CmsScroller />
      </div>
    </>
  );
};

export default layout;
