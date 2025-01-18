"use client"
import Image from "next/image";
import React, { memo } from "react";
import Hr from "../../_components/modules/hr";
import Title from "../../_components/template/title";

const page =  memo(() => {
  return (
    <div className="w-full flex flex-col items-center pt-24 gap-20">
      <div className="w-full flex flex-col items-center gap-8">
        <Image
          src={"/images/profile.jpg"}
          width={150}
          height={150}
          alt="author profile image"
          className="xm:size-[30rem] size-96 rounded-full shadow-lg dark:shadow-2xl"
        />
        <p className="text-[1.8rem] text-black/50 dark:text-first font-bold">
          استاد محمد حسین اکبری
        </p>
      </div>
      <div className="w-full flex flex-col gap-8">
        <Title title={"اطلاعات استاد"} />
        <p className="text-[1.5rem] text-black/60 dark:text-first/70 font-light text-justify">
          استاد محمد حسین اکبری یکی از برجسته‌ترین اساتید در رشته مهندسی عمران
          در ایران است. او تحصیلات خود را در مقاطع کارشناسی مهندسی عمران از
          دانشگاه صنعتی شریف، کارشناسی ارشد مهندسی سازه از دانشگاه تهران، و
          دکتری مهندسی زلزله از دانشگاه شهید بهشتی به پایان رسانده است. با بیش
          از دو دهه تجربه حرفه‌ای، استاد اکبری در پروژه‌های بزرگی از جمله طراحی
          و اجرای پل‌ها، ساختمان‌های بلندمرتبه، و سازه‌های مقاوم در برابر زلزله
          نقش بسزایی داشته است. استاد اکبری بیش از 50 مقاله علمی در مجلات معتبر
          داخلی و خارجی منتشر کرده است. موضوعات پژوهشی او عمدتاً در زمینه‌های
          تحلیل و طراحی سازه‌ها، مقاوم‌سازی ساختمان‌ها در برابر زلزله، و استفاده
          از فناوری‌های نوین در مهندسی عمران است. او همچنین به عنوان مشاور در
          پروژه‌های ملی و بین‌المللی فعالیت کرده و چندین جایزه معتبر از جمله
          جایزه ملی مهندسی عمران از سازمان نظام مهندسی کشور را دریافت کرده است.
          استاد اکبری به عنوان استاد دانشگاه، نقش مهمی در تربیت نسل‌های جدید
          مهندسان عمران ایفا کرده و با تدریس دروس تخصصی و برگزاری کارگاه‌های
          آموزشی، دانشجویان را با آخرین دستاوردهای علمی آشنا می‌کند. او معتقد
          است که آموزش و پژوهش دو بال مهم پیشرفت در رشته عمران هستند و همواره به
          دنبال انتقال تجربیات و دانش خود به نسل جوان است. همچنین در برنامه‌های
          اجتماعی و محیط‌زیستی نیز فعال بوده و به دنبال راه‌حل‌هایی برای کاهش
          آسیب‌های زیست‌محیطی و ارتقاء کیفیت زندگی جامعه می‌باشد.
        </p>
      </div>
      <Hr />
    </div>
  );
});

export default page;
