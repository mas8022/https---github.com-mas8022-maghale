"use client";
import React, { memo, useState } from "react";
import TagsBox from "./tagsBox";
import Comment from "./comment";
import useSanitizeInput from "@/utils/useSanitizeInput";
import swal from "sweetalert";
import toast from "react-hot-toast";
import Button from "../modules/Button";

const CommentsBox = memo(({ productId, comments, tags }) => {

  const [comment, setComment] = useState("");
  const [loader, setLoader] = useState(false);

  const sendComment = () => {
    setLoader(true);
    fetch(`/api/productComment/${productId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment, productId }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status === 201) {
          swal({ icon: "success", text: result.message });
        } else if (result.status === 404) {
          swal({ icon: "error", text: result.message });
        } else {
          toast.error("عملیات ناموفق بوده");
        }
        setComment("");
        setLoader(false);
      });
  };

  return (
    <div className="w-full flex flex-col ld:flex-row items-center sm:items-start gap-10">
      <div className="w-full ld:w-2/3 flex flex-col justify-between gap-8 items-center px-12 py-8 pb-12 rounded-3xl overflow-hidden shadow-lg dark:shadow-2xl">
        <div className="w-full h-20 flex justify-between gap-8 items-center border-b-[1px] border-second/50">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-16 dark:stroke-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
              />
            </svg>
            <span className="text-[2rem] font-bold dark:text-first">نظرات</span>
          </div>
          <span className="text-[1.4rem] dark:text-first">
            تعداد نظرات ({comments.length})
          </span>
        </div>

        {comments?.length ? (
          comments.map((item) => <Comment {...item} key={item._id} />)
        ) : (
          <div className="w-full h-80 bg-second/10 text-second text-4xl flex items-center justify-center">
            نظری ثبت نشده است ...
          </div>
        )}
      </div>

      <div className="w-full ld:w-1/3 flex flex-col gap-16">
        <div className="w-full p-12 flex flex-col gap-5 bg-second/5 dark:bg-black/15 rounded-3xl overflow-hidden shadow-md dark:shadow-lg dark:child:text-first/50">
          <p className="text-2xl dark:text-first pb-2 border-b-2 border-b-second/50">
            نظر یا پرسشی دارید بیان کنید
          </p>
          <textarea
            type="text"
            value={comment}
            onChange={(e) => {
              setComment(useSanitizeInput(e.target.value));
            }}
            className="w-full h-56 py-4 px-6 text-2xl dark:!text-first dark:bg-[#0d141f]/35 rounded-xl"
            placeholder="ایجاد پرسش یا نظر جدید..."
          />
          <Button
            label="ارسال نظر"
            onclick={sendComment}
            loader={loader}
            customclass="w-full py-4 text-2xl bg-second/70 !text-first active:bg-second/55 cursor-pointer rounded-lg"
          ></Button>
        </div>
        <TagsBox tags={tags} />
      </div>
    </div>
  );
});

export default CommentsBox;
