"use client";
import React, { memo, useState } from "react";
import swal from "sweetalert";
import toast from "react-hot-toast";
import useSanitizeInput from "@/utils/useSanitizeInput";

const FooterCommentBox = memo(() => {
  const [comment, setComment] = useState("");

  const SendComment = () => {
    if (comment) {
      fetch("/api/siteImprovementComments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment }),
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.status === 201) {
            swal({
              icon: "success",
              title: "با موفقیت ارسال شد",
              text: result.message,
            });
            setComment("");
          } else if (result.status === 401) {
            swal({
              icon: "error",
              title: "با موفقیت ارسال نشد",
              text: result.message,
            });
          } else if (result.status === 500) {
            toast.error(result.message);
          }
        });
    }
  };
  return (
    <div className="flex flex-col gap-4 item-end">
      <span className="w-[60%] sm:self-end text-[1.4rem] dark:text-[#1e293b]">
        در صورتی که در سایت ما ٍثب نام کردید با نظر دادن در مورد سایت مارا
        همراهی می کنید ممنون میشویم نظر خود را بگویید
      </span>
      <textarea
        type="text"
        value={comment}
        onChange={(e) => {
          setComment(useSanitizeInput(e.target.value));
        }}
        placeholder="نظر خود بنویسید..."
        className="w-[60%] h-20 max-h-64 p-4 rounded-md text-[1.28rem] text-black/70 sm:self-end bg-first/50 placeholder:text-black/50 outline-none focus:outline-none"
      />
      <button
        onClick={SendComment}
        className="w-32 h-10 sm:w-52 sm:h-14 rounded-xl bg-second text-first text-[1.2rem] sm:text-[1.4rem] font-light sm:self-end dark:bg-[#334155] active:bg-second/60 active:dark:bg-[#334155]/60"
      >
        ارسال نظر
      </button>
    </div>
  );
});

export default FooterCommentBox;
