"use client";
import React, { memo, useEffect, useState } from "react";
import CmsUserCart from "../../_components/modules/cmsUserCart";

const page = memo(() => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const getAllUsers = () => {
    fetch("/api/cms/getAllUsers")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    if (!search.trim()) {
      return getAllUsers();
    }
    const usersArray = users.filter((item) =>
      item.email.includes(search.trim())
    );
    setUsers(usersArray);
  }, [search]);

  return (
    <div>
      <div className="w-full pb-12 border-b-[1px] border-b-second/50 flex justify-end">
        <div className="navbar flex h-14 items-center justify-end gap-4 border-[2px] border-gray-800/20 dark:border-first/60 dark:border-[1px] pl-4 py-1 rounded-md">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="دنبال چه کاربر ای هستین؟..."
            className="pr-4 h-full w-[20rem] sm:w-[30rem] bg-black/0 text-[1.3rem] pl-2 focus:outline-none outline-none dark:text-first font-light"
          />

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-10 active:scale-95 cursor-pointer dark:stroke-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </div>
      </div>

      <div className="w-full  flex flex-col items-end gap-40 py-[5rem] md:pr-14">
        <div className="w-full flex justify-center">
          {users?.length ? (
            <div className="grid grid-cols-1 lgg:grid-cols-2  2xl:grid-cols-3 gap-8">
              {users.map((item) => (
                <CmsUserCart
                  userData={JSON.parse(JSON.stringify(item))}
                  key={item._id}
                />
              ))}
            </div>
          ) : (
            <div className="w-full h-56 flex items-center justify-center border-y-2 border-second/70 bg-second/15 dark:bg-second/5 text-second text-4xl rounded-lg">
              کاربری در این قسمت وجود ندارد
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default page;
