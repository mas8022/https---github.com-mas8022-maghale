import Image from "next/image";
import React, { memo } from "react";

const Comment = memo(({ commenter, commenterText, createdAt }) => {
  const date = new Date(createdAt).toLocaleDateString("fa-IR");

  return (
    <div className="w-full bg-black/5 dark:bg-black/10 flex flex-col p-4 gap-1 rounded-lg overflow-hidden">
      <div className="w-full flex items-center gap-8">
        <Image
          src={commenter?.profile ? commenter?.profile : "/images/profile.jpg"}
          placeholder="blur"
          blurDataURL={
            commenter?.profile ? commenter?.profile : "/images/profile.jpg"
          }
          width={100}
          height={100}
          alt="commenter Image"
          className="size-14 sm:size-20 object-cover rounded-full"
        />
        <p className="w-full text-[1.2rem] sm:text-[1.4rem] dark:text-first text-bold border-b-[1px] border-black/20 dark:border-first/50 font-light sm:font-medium">
          {commenterText}
        </p>
      </div>
      <div className="w-full flex items-center justify-between">
        <span className="self-end text-black/50 dark:text-first/50 text-[1rem] sm:text-[1.2rem] font-light sm:font-medium">
          {commenter?.email}
        </span>
        <span className="self-end text-[1rem] sm:text-[1.3rem] dark:text-first font-light sm:font-medium">
          {date}
        </span>
      </div>
    </div>
  );
});

export default Comment;
