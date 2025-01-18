"use client";
import { useRouter } from "next/navigation";
import React, { memo } from "react";
import toast from "react-hot-toast";
import swal from "sweetalert";

const MessageBoxAuthor = memo(({ messageData }) => {
  const router = useRouter();
  const { _id, message, createdAt } = messageData;
  const date = new Date(createdAt).toLocaleDateString("fa-IR");

  const deleteMessage = () => {
    swal({
      icon: "warning",
      title: "هشدار...",
      text: "ایا از حذف پیام مطمعنین؟",
      buttons: ["لغو", "تایید"],
    }).then((response) => {
      if (response) {
        fetch(`/api/cms/authorReceiveMessage/${[_id]}`, { method: "PUT" })
          .then((res) => res.json())
          .then((result) => {
            if (result.status === 200) {
              toast.success(result.message);
            } else {
              toast.error(result.message);
            }
            router.refresh();
          });
      }
    });
  };

  return (
    <div className="w-full px-12 py-8 flex flex-col gap-4 bg-white dark:bg-[#1e293b] rounded-xl">
      <div className="w-full pb-2 border-b-[1px] flex items-center justify-between">
        <span className="text-[2rem] text-black dark:text-first">
          از طرف مدیر
        </span>
        <div className="flex items-center gap-6">
          <div className="flex gap-2">
            <div className="size-16 flex items-center justify-center bg-second/5 dark:bg-[#0f172a] rounded-full cursor-pointer active:scale-95 transition-all duration-200">
              <div onClick={deleteMessage}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-8 dark:stroke-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </div>
            </div>
          </div>
          <span className="text-[1.5rem] font-light text-black dark:text-first">
            {date}
          </span>
        </div>
      </div>
      <p className="text-[1.5rem] text-black dark:text-first">{message}</p>
    </div>
  );
});

export default MessageBoxAuthor;
