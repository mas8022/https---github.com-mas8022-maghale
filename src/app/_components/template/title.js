import React, { memo } from "react";

const Title = memo(({ title }) => {
  return (
    <div className="w-full border-b-[1px] border-b-second/50 font-bold text-[2rem] sm:text-[2.2rem] md:text-[2.4rem] text-black dark:text-first lg:text-[2.6rem] pb-1 tracking-tight mb-8">
      {title}
    </div>
  );
});

export default Title;
