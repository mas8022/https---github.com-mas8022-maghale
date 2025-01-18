"use client";
import React, { memo } from "react";
import Image from "next/image";
import Link from "next/link";

const AuthorBox = memo(({ _id, name, job, profile, bio }) => {
  return (
    <div className="w-full rounded-3xl bg-first dark:bg-[#1e293b] py-8 flex items-center justify-center gap-8 shadow-lg dark:shadow-2xl relative">
      <div className="w-40 h-full rounded-tl-full rounded-bl-full bg-second/50 dark:bg-second/70 absolute right-0 top-0 hidden sm:block"></div>

      <div className="flex w-[90%] sm:w-[60%] h-full items-center justify-between gap-8">
        <div className="w-full h-full flex flex-col gap-4 py-8">
          <h3 className="font-bold text-[1.6rem] sm:text-[2rem] dark:text-first">
            {name}
          </h3>
          <p className="font-bold text-[1.45rem] sm:text-[1.5rem] text-[#000]/65 dark:text-first/70">
            {job}
          </p>

          <span className="font-bold text-[1.35rem] sm:text-[1.5rem] text-[#000]/40 line-clamp-3 dark:text-first/50">
            {bio}
          </span>

          <Link
            href={`/author-bio/${_id}`}
            className="text-[1.6rem] text-blue-600 font-bold"
          >
            ادامه مطلب...
          </Link>
        </div>

        <Image
          src={profile || "/images/profile.jpg"}
          placeholder="blur"
          blurDataURL={profile || "/images/profile.jpg"}
          width={100}
          height={100}
          alt="author image"
          className="size-40 sm:size-64 rounded-3xl object-cover"
        />
      </div>

      <div className="w-40 h-full rounded-tr-full rounded-br-full bg-second/50 dark:bg-second/70 absolute left-0 top-0 hidden sm:block"></div>
    </div>
  );
});

export default AuthorBox;
