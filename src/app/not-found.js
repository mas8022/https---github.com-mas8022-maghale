import Image from "next/image";
import React, { memo } from "react";
import MainSearch from "./_components/template/mainSearch";
import Hr from "./_components/modules/hr";

const Page = memo(() => {
  return (
    <div className="w-full flex flex-col items-center xm:gap-0 gap-20 ">
      <div className="w-full flex xm:flex-row flex-col-reverse items-center xm:justify-between">
        <p className="md:text-[3rem] xm:text-[2.3rem] text-[2rem] text-second drop-shadow-sm font-light">
          با عرض پوزش این صفحه وجود ندارد
        </p>
        <Image
          src={"/images/404.png"}
          width={1000}
          height={1000}
          alt="این صفحه وجود ندارد"
          placeholder="blur"
          blurDataURL={"/images/404.png"}
          className="size-[20rem]"
        />
      </div>
      <MainSearch />
      <Hr />
    </div>
  );
});

export default Page;
