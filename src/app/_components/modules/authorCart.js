"use client";
import Image from "next/image";
import Link from "next/link";
import React, { memo } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
const AuthorCart = memo(({ authorData }) => {
  const router = useRouter();
  const { _id, name, job, profile } = authorData;

  const deleteAuthor = (id) => {
    swal({
      icon: "warning",
      title: "هشدار...",
      text: "ایا از حذف نویسنده مطمعنین؟",
      buttons: ["لغو", "تایید"],
    }).then((response) => {
      if (response) {
        fetch(`/api/product/cms/${id}/author`, { method: "DELETE" })
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

  const sendMessage = (id) => {
    swal({
      icon: "warning",
      title: "هشدار...",
      text: "ایا از ارسال پیام مطمعنین؟",
      content: {
        element: "input",
        attributes: {
          placeholder: "پیام خود را بنویسید...",
          type: "text",
        },
      },
      buttons: ["لغو", "تایید"],
    }).then((response) => {
      if (response) {
        fetch(`/api/product/cms/${id}/author`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: response }),
        })
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
    <div className="w-[32rem] h-[32.5rem] pt-14 bg-first dark:bg-[#0d141f]/50 flex flex-col items-center shadow-md rounded-xl overflow-hidden">
      <Image
        src={profile?.trim() || "/images/profile.jpg"}
        alt="product Image"
        width={320}
        height={230}
        placeholder="blur"
        blurDataURL={profile?.trim() || "/images/productDefaultCover.jpg"}
        className="size-52 rounded-full shadow-md object-cover mb-2 border-1 border-second/50"
      />
      <h2 className="px-10 text-[15px] font-bold mb-12 line-clamp-1 dark:text-first">
        {name}
      </h2>

      <div className="w-full flex flex-col items-end gap-12 px-8">
        <p className="text-[1.3rem] font-light text-black/60 line-clamp-1 self-center dark:text-first/80">
          {job}
        </p>
        <div className="w-full flex items-center justify-between gap-2 child:shadow-sm">
          <Link
            href={`/author-bio/${_id}`}
            className="w-32 h-14 flex items-center justify-center text-first text-[1.5rem] font-light border-1 bg-second active:bg-first active:border-second active:text-second rounded-lg"
          >
            مشاهده
          </Link>
          <div
            onClick={() => sendMessage(_id)}
            className="w-32 h-14 flex items-center justify-center text-first text-[1.5rem] font-light border-1 bg-second active:bg-first active:border-second active:text-second rounded-lg cursor-pointer"
          >
            ارسال پیام
          </div>
          <div
            onClick={() => deleteAuthor(_id)}
            className="w-32 h-14 flex items-center justify-center text-first text-[1.5rem] font-light border-1 bg-second active:bg-first active:border-second active:text-second rounded-lg cursor-pointer"
          >
            حذف
          </div>
        </div>
      </div>
    </div>
  );
});

export default AuthorCart;
