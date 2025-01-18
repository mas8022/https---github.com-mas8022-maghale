"use client"
import React from "react";
import Title from "../_components/template/title";
import Hr from "../_components/modules/hr";

const page = () => {
  return (
    <div className="w-full flex flex-col gap-20 pt-24 child:dark:text-first">
      <Title title={"قوانین و مقررات"} />
      <div className="flex flex-col gap-6 child:dark:text-first">
        <p className="text-[2rem] font-bold">هدف سایت</p>
        <p className="text-[1.6rem] font-light">
          این سایت با هدف ارائه مقالات و ویدیوهای آموزشی در زمینه‌های مختلف برای
          یادگیری و ارتقاء دانش کاربران ایجاد شده است.
        </p>
      </div>
      <div className="flex flex-col gap-6 child:dark:text-first">
        <p className="text-[2rem] font-bold">تألیف و نشر محتوا</p>
        <p className="text-[1.6rem] font-light">
          تمامی مقالات و ویدیوهای آموزشی باید توسط نویسندگان و تولیدکنندگان
          محتوا به صورت اصل و خلاقانه تهیه شوند. مطالب کپی شده یا سرقت ادبی
          پذیرفته نمی‌شوند. مطالب باید منطبق با اصول اخلاقی و قوانین حاکم بر
          کشور باشند و از نشر مطالب توهین‌آمیز، نژادپرستانه، تهمت‌آمیز و
          غیرقانونی خودداری شود.
        </p>
      </div>
      <div className="flex flex-col gap-6 child:dark:text-first">
        <p className="text-[2rem] font-bold">اعتبار منابع</p>
        <p className="text-[1.6rem] font-light">
          نویسندگان موظفند منابع معتبر و موثق را در تهیه مقالات و ویدیوهای خود
          استفاده کنند و در صورت استفاده از اطلاعات دیگر منابع، به درستی آنها را
          ارجاع دهند.
        </p>
      </div>
      <div className="flex flex-col gap-6 child:dark:text-first">
        <p className="text-[2rem] font-bold">حقوق مالکیت فکری</p>
        <p className="text-[1.6rem] font-light">
          کلیه حقوق مالکیت فکری مطالب منتشر شده در سایت، متعلق به نویسندگان و
          تولیدکنندگان محتوا می‌باشد. هرگونه استفاده غیرمجاز از مطالب بدون اجازه
          کتبی نویسنده ممنوع است.
        </p>
      </div>
      <div className="flex flex-col gap-6 child:dark:text-first">
        <p className="text-[2rem] font-bold">مسئولیت استفاده از محتوا</p>
        <p className="text-[1.6rem] font-light">
          استفاده از مطالب سایت برای مقاصد آموزشی و شخصی آزاد است، اما کاربران
          باید در استفاده از این مطالب دقت و مسئولیت‌پذیری داشته باشند. مسئولیت
          هرگونه سوء استفاده یا استفاده نادرست از مطالب سایت بر عهده کاربران
          است.
        </p>
      </div>
      <div className="flex flex-col gap-6 child:dark:text-first">
        <p className="text-[2rem] font-bold">پیشنهادات و انتقادات</p>
        <p className="text-[1.6rem] font-light">
          کاربران می‌توانند پیشنهادات و انتقادات خود را از طریق بخش تماس با ما
          به اطلاع تیم مدیریت سایت برسانند تا در بهبود کیفیت مطالب و خدمات سایت
          سهیم باشند.
        </p>
      </div>
      <p className="text-[1.6rem] font-light">
        این مقررات به شما کمک می‌کند تا قوانین و رویه‌های مرتبط با نشر مقالات و
        ویدیوهای آموزشی را در سایت خود به وضوح به کاربران ارائه دهید.
      </p>
      <Hr />
      <Title title={"سلب مسئولیت و مقررات سایت"} />
      <div className="flex flex-col gap-6 child:dark:text-first">
        <p className="text-[2rem] font-bold">مسئولیت محتوا</p>
        <p className="text-[1.6rem] font-light">
          مقالات و ویدیوهای آموزشی منتشر شده در این سایت توسط نویسندگان و
          همکاران مستقل تهیه شده‌اند. نظرات و دیدگاه‌های ارائه شده در این مطالب،
          صرفاً نظرات نویسندگان بوده و لزوماً منعکس‌کننده سیاست‌ها یا مواضع رسمی
          این سایت یا مالکان آن نیستند.
        </p>
      </div>
      <div className="flex flex-col gap-6 child:dark:text-first">
        <p className="text-[2rem] font-bold">عدم ارائه مشاوره حرفه‌ای</p>
        <p className="text-[1.6rem] font-light">
          محتوای ارائه شده در این سایت صرفاً برای اهداف اطلاعاتی است. این محتوا
          جایگزین مشاوره حرفه‌ای (پزشکی، حقوقی، مالی یا سایر موارد) نمی‌باشد.
          همواره با یک متخصص واجد شرایط مشورت کنید تا به سوالات خاص شما پاسخ
          دهد.
        </p>
      </div>
      <div className="flex flex-col gap-6 child:dark:text-first">
        <p className="text-[2rem] font-bold">دقت اطلاعات</p>
        <p className="text-[1.6rem] font-light">
          ما تلاش می‌کنیم تا اطلاعات ارائه شده در این سایت دقیق و به‌روز باشند،
          اما هیچ ضمانت یا نمایندگی در مورد کامل بودن، صحت، قابلیت اطمینان،
          مناسب بودن یا در دسترس بودن اطلاعات موجود ارائه نمی‌دهیم. هرگونه
          اتکایی که به این اطلاعات می‌کنید، صرفاً به عهده خودتان است.
        </p>
      </div>
      <div className="flex flex-col gap-6 child:dark:text-first">
        <p className="text-[2rem] font-bold">لینک‌های خارجی</p>
        <p className="text-[1.6rem] font-light">
          این سایت ممکن است حاوی لینک‌هایی به سایت‌های خارجی باشد که توسط ما
          ارائه یا نگهداری نمی‌شوند. ما کنترل محتوای این سایت‌ها را نداریم و
          وجود لینک‌ها به معنای تایید یا توصیه نظرات بیان شده در آن‌ها نیست.
        </p>
      </div>
      <div className="flex flex-col gap-6 child:dark:text-first">
        <p className="text-[2rem] font-bold">محدودیت مسئولیت</p>
        <p className="text-[1.6rem] font-light">
          تا حداکثر حد مجاز توسط قانون، ما هرگونه مسئولیت برای هرگونه از دست
          دادن، آسیب، ادعا، مسئولیت یا خسارت ناشی از یا مرتبط با استفاده از این
          سایت یا محتوای آن را رد می‌کنیم.
        </p>
      </div>
      <Hr />
    </div>
  );
  
};

export default page;
