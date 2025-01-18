"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { memo } from "react";
import toast from "react-hot-toast";
import swal from "sweetalert";

const CmsUserCart = memo(({ userData }) => {
  const router = useRouter();
  const { _id, fullName, email, profile } = userData;

  const blockUser = (id) => {
    swal({
      icon: "warning",
      title: "هشدار...",
      text: "ایا از بلاک کاربر مطمعنین؟",
      buttons: ["لغو", "تایید"],
    }).then((response) => {
      if (response) {
        fetch(`/api/cms/blockUser/${id}`, { method: "PUT" })
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
    <div className="w-[32rem] h-[32.5rem] py-10 bg-first dark:bg-[#0d141f]/50 flex flex-col items-center shadow-md">
      <Image
        src={profile?.trim() || "/images/profile.jpg"}
        placeholder="blur"
        blurDataURL={profile?.trim() || "/images/profile.jpg"}
        alt="product Image"
        width={320}
        height={230}
        className="size-52 rounded-full shadow-md object-cover mb-2 border-1 border-second/50"
      />
      <p className="text-[15px] font-bold mb-12 dark:text-first">{fullName}</p>

      <div className="w-full flex flex-col items-center gap-12 px-8">
        <p className="text-[1.3rem] font-light text-black/60 line-clamp-1 self-center dark:text-first/80">
          {email}
        </p>
        <div
          onClick={() => blockUser(_id)}
          className="w-full h-14 flex items-center justify-center text-first text-[1.5rem] font-light border-1 bg-second active:bg-first active:border-second active:text-second rounded-lg cursor-pointer"
        >
          مسدود
        </div>
      </div>
    </div>
  );
});
export default CmsUserCart;
