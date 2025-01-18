"use client"
import React, { memo } from "react";
import Image from "next/image";
import Hr from "../_components/modules/hr";

const page = memo(() => {
  return (
    <div className="w-full flex-col pt-24">
      <div className="about-title-aboutUs w-full flex items-start justify-between gap-40">
        <div className="xl:w-1/2 lg:w-2/3 w-full child:text-black child:dark:text-first">
          <p className="lg:text-[3rem] text-[2rem] font-bold">درباره سایت ما</p>
          <p className="text-[1.7rem] font-light mb-16">
            به مقاله خوش آمدید، مقصد نهایی شما برای محتوای آموزشی با کیفیت! هدف
            ما این است که آموزش را برای همه، بدون توجه به پیشینه یا مکانشان،
            دسترس‌پذیر، جذاب و مؤثر کنیم.
          </p>
          <p className="lg:text-[3rem] text-[2rem] font-bold"> ما که هستیم</p>
          <p className="text-[1.7rem] font-light mb-16">
            در مقاله، ما یک تیم پرشور از معلمان، تولیدکنندگان محتوا و
            علاقه‌مندان به فناوری هستیم که به تغییر روش یادگیری افراد متعهدیم.
            ما بر این باوریم که آموزش کلید باز کردن استعدادهاست و تلاش می‌کنیم
            منابعی ارائه دهیم که هم آموزنده و هم الهام‌بخش باشند.
          </p>
          <p className="lg:text-[3rem] text-[2rem] font-bold ">
            چه کاری انجام می‌دهیم
          </p>
          <p className="text-[1.7rem] font-light">
            پلتفرم ما مجموعه‌ای گسترده از ویدیوهای آموزشی را ارائه می‌دهد که
            برای نیازهای آموزشی متنوع طراحی شده‌اند. چه دانش‌آموزی باشید که به
            دنبال تکمیل برنامه درسی مدرسه‌تان هستید، چه حرفه‌ای که به دنبال
            ارتقاء مهارت‌های خود است، و چه یک یادگیرنده مادام‌العمر که به کسب
            دانش جدید علاقه دارد، مقاله برای شما چیزی در آستین دارد.
          </p>
        </div>
        <Image
          src={"/images/aboutUsTitle.png"}
          width={500}
          height={500}
          alt="about us title"
          className="xl:w-1/2 w-1/3 object-cover lg:block hidden"
        />
      </div>
      <Hr />
      <div className="about-center-aboutUs w-full flex items-start justify-between gap-32">
        <Image
          src={"/images/secondAboutUs.png"}
          width={500}
          height={500}
          alt="about us title"
          className="w-1/3 object-cover lg:block hidden"
        />
        <div className="lg:w-2/3 w-full child:text-black child:dark:text-first">
          <p className="lg:text-[3rem] text-[2rem] font-bold">محتوای ما</p>
          <p className="text-[1.7rem] font-light mb-16">
            ما بر ایجاد محتوای ویدیویی با کیفیت بالا و جذاب که موضوعات و مباحث
            مختلف را پوشش می‌دهد، تمرکز داریم. ویدیوهای ما به گونه‌ای طراحی
            شده‌اند که واضح، مختصر و جامع باشند تا شما بتوانید مفاهیم پیچیده را
            به راحتی درک کنید. ما کتابخانه خود را به طور مداوم به‌روزرسانی
            می‌کنیم تا جدیدترین و مرتبط‌ترین مواد آموزشی را به شما ارائه دهیم.
          </p>
          <p className="lg:text-[3rem] text-[2rem] font-bold">چشم‌انداز ما</p>
          <p className="text-[1.7rem] font-light mb-16">
            چشم‌انداز ما ساخت یک جامعه یادگیری جهانی است که در آن دانش به طور
            آزاد و مؤثر به اشتراک گذاشته می‌شود. هدف ما توانمندسازی افراد از
            طریق آموزش است، تا به آن‌ها در رسیدن به اهداف شخصی و حرفه‌ای‌شان کمک
            کنیم.
          </p>
          <p className="lg:text-[3rem] text-[2rem] font-bold ">
            به ما بپیوندید
          </p>
          <p className="text-[1.7rem] font-light">
            ما شما را دعوت می‌کنیم تا به کتابخانه گسترده ویدیوهای آموزشی ما
            بپیوندید و بخشی از جامعه مقاله شوید. با هم می‌توانیم یادگیری را به
            یک ماجراجویی مادام‌العمر تبدیل کنیم. با تشکر از شما که مقاله را به
            عنوان شریک آموزشی خود انتخاب کرده‌اید. بیایید با هم این سفر آموزشی
            را آغاز کنیم!
          </p>
        </div>
      </div>
      <Hr />
      <Hr />
    </div>
  );
});

export default page;
