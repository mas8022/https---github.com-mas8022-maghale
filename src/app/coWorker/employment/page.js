"use client";
import { memo, useState } from "react";
import AuthorSignUpForm from "../../_components/template/authorSignUpForm";
import AuthorLoginForm from "../../_components/template/authorLoginForm";
import Image from "next/image";
import Hr from "../../_components/modules/hr";
const page = memo(() => {
  const [formMode, setFormMode] = useState("loginForm");

  return (
    <>
      <div className="w-full flex gap-10 sm:pt-0 pt-20">
        <div className="lgg:w-1/2 w-full flex flex-col gap-5 items-center justify-center">
          {formMode === "signUpForm" ? (
            <AuthorSignUpForm setFormMode={setFormMode} />
          ) : (
            <AuthorLoginForm setFormMode={setFormMode} />
          )}
        </div>
        <Image
          src={"/images/aboutUsTitle.png"}
          width={500}
          height={500}
          alt="استخدام"
          className="w-1/2 object-cover lgg:block hidden"
        />
      </div>
      <Hr />
    </>
  );
});

export default page;
