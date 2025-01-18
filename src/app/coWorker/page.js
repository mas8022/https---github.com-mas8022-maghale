"use client";
import React, { memo, useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import WorkTool from "../_components/modules/workTool";

const page = memo(() => {
  const router = useRouter();
  const [isAuthor, setIsAuthor] = useState(false);

  useEffect(() => {
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

  return (
    isAuthor && (
      <div className="w-full pb-20 pt-5 flex flex-col gap-16">
        <div className="describe w-full px-16 py-10 text-[1.6rem] text-first bg-second/70 rounded-3xl text-center">
          سلام خوش امدین به سایت مقاله در این قسمت شما میتوانید مقاله خود را
          ارسال کنید شما ابتدا باید فورم های زیر را پر کرده سپس مقاله خود را
          توسط ادیتور که در همین صفحه تعویه شده نوشته و حتی با بستن سایت هم
          اطلاعات شما ذخیره میشود و می توانید بعدا ادامه مقاله خود را بنویسید و
          همچنین میتوانید غیر از مقاله فیلم اموزشی خود را نیز اپلود کنید حتی اگر
          تنها فیلم اموزشی دارید باز هم میتوانید بدون مقاله و تنها با فیلم
          اموزشی خود مقاله خود را جهت بررسی برای ما بفرستید و درصورت تایید از
          سمت ما ان را در سایت منتشر می کنیم و به شما اطلاع خواهیم داد
        </div>
        <WorkTool apiPath={"createProduct"} sendBtn={false} />
      </div>
    )
  );
});

export default page;
