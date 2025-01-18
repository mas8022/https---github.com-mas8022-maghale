"use client";
import React, { memo } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
const CmsNotifCart = memo(({ commentData }) => {
  const router = useRouter();
  const { _id, fullName, email, phone, message } = commentData;

  const deleteComment = async (id) => {
    await swal({
      icon: "warning",
      title: "هشدار",
      text: "ایا از حذف نظر مطمعنین؟",
      buttons: ["لغو", "تایید"],
    }).then((response) => {
      if (response) {
        fetch(`/api/cms/contactMessage/${id}/delete`, {
          method: "DELETE",
        }).then((res) =>
          res.json().then((result) => {
            if (result.status === 200) {
              toast.success(result.message);
            } else {
              toast.error(result.message);
            }
          })
        );
      }
    });
    router.refresh();
  };

  return (
    <div className="w-[32rem] py-10 bg-first dark:bg-[#0d141f]/50 flex flex-col items-center shadow-md">
      <p className="text-[15px] font-bold mb-12 dark:text-first">{fullName}</p>

      <div className="w-full flex flex-col items-center gap-12 px-8">
        <p className="text-[1.3rem] font-light text-black/60 line-clamp-1 self-center dark:text-first/80">
          {phone}
        </p>
        <p className="text-[1.3rem] font-light text-black/60 line-clamp-1 self-center dark:text-first/80">
          {email}
        </p>
        <p className="text-[1.4rem] dark:text-first p-6 rounded-lg bg-black/5 dark:bg-black/20">
          {message}
        </p>
        <div className="w-full flex items-center justify-between gap-2 child:shadow-sm">
          <div
            onClick={() => deleteComment(_id)}
            className="w-full h-14 flex items-center cursor-pointer justify-center text-first text-[1.5rem] font-light border-1 bg-second active:bg-first active:border-second active:text-second rounded-lg cursor-pointer"
          >
            پاک کردن
          </div>
        </div>
      </div>
    </div>
  );
});
export default CmsNotifCart;
