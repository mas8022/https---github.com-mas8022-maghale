"use client";
import { useRouter } from "next/navigation";
import React, { memo } from "react";
import toast from "react-hot-toast";
import swal from "sweetalert";

const CmsCommentSendedCart = memo(({ commentData }) => {
  const router = useRouter();
  const { _id, comment, user } = commentData;

  const confirmComment = (id) => {
    swal({
      icon: "warning",
      title: "هشدار...",
      text: "ایا از تایید نظر مطمعنین؟",
      buttons: ["لغو", "تایید"],
    }).then((response) => {
      if (response) {
        fetch(`/api/cms/siteImprovementsComment/${id}`, { method: "PUT" })
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

  const deleteComment = (id) => {
    swal({
      icon: "warning",
      title: "هشدار...",
      text: "ایا از حذف نظر مطمعنین؟",
      buttons: ["لغو", "تایید"],
    }).then((response) => {
      if (response) {
        fetch(`/api/cms/siteImprovementsComment/${id}`, { method: "DELETE" })
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
    <div className="w-[32rem] py-10 bg-first dark:bg-[#0d141f]/50 flex flex-col items-center shadow-md">
      <p className="text-[15px] font-bold mb-12 dark:text-first">
        {user?.fullName}
      </p>

      <div className="w-full flex flex-col items-center gap-6 px-8">
        <p className="text-[1.3rem] font-light text-black/60 line-clamp-1 self-center dark:text-first/80">
          {user?.email}
        </p>
        <p className="text-[1.4rem] dark:text-first p-6 rounded-lg bg-black/5 dark:bg-black/20">
          {comment}
        </p>
        <div className="w-full flex items-center justify-between gap-2 child:shadow-sm">
          <div
            onClick={() => confirmComment(_id)}
            className="w-full h-14 flex items-center cursor-pointer justify-center text-first text-[1.5rem] font-light border-1 bg-second active:bg-first active:border-second active:text-second rounded-lg"
          >
            تایید
          </div>
          <div
            onClick={() => deleteComment(_id)}
            className="w-full h-14 flex items-center cursor-pointer justify-center text-first text-[1.5rem] font-light border-1 bg-second active:bg-first active:border-second active:text-second rounded-lg"
          >
            پاک کردن
          </div>
        </div>
      </div>
    </div>
  );
});
export default CmsCommentSendedCart;
