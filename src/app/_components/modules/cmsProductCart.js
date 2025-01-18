"use client";
import useConvertTime from "@/utils/useConvertTime";
import useDiscountPrice from "@/utils/useDiscountPrice";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { memo } from "react";
import toast from "react-hot-toast";

const CmsProductCart = memo(({ productData }) => {
  const router = useRouter();
  const {
    _id,
    title,
    price,
    author,
    sellCount,
    discount,
    cover,
    duration,
    group,
  } = productData;

  const discountPrice = useDiscountPrice(price, discount);

  const { hour, minute } = useConvertTime(duration);

  const deleteProduct = (id) => {
    swal({
      icon: "warning",
      title: "هشدار...",
      text: "ایا از حذف محصول مطمعنین؟",
      buttons: ["لغو", "تایید"],
    }).then((response) => {
      if (response) {
        fetch(`/api/product/cms/${id}/deleteProduct`, { method: "DELETE" })
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
    <div className="w-[32rem] bg-first dark:bg-[#0d141f]/50 flex flex-col shadow-md pb-9 rounded-xl overflow-hidden">
      <Image
        src={cover || "/images/productDefaultCover.jpg"}
        alt="product Image"
        width={250}
        height={200}
        placeholder="blur"
        blurDataURL={cover || "/images/productDefaultCover.jpg"}
        className="w-full h-auto mb-5 object-cover"
      />

      <h2 className="px-10 text-[15px] font-bold mb-12 line-clamp-1 dark:text-first">
        {title}
      </h2>

      <div className="w-full flex justify-between px-10 items-center gap-2 mb-12">
        <div className="flex flex-col items-start gap-3">
          <span className="text-[13px] text-black/60 dark:text-first/60">
            {author?.name}
          </span>
          {Number(hour) || Number(minute) ? (
            <span className="text-[13px] text-black/60 dark:text-first/60">
              {hour} ساعت و {minute} دقیقه
            </span>
          ) : null}
          <span className="text-[13px] text-black/60 dark:text-first/60">
            دانشجو:{sellCount}
          </span>
        </div>

        <p className="text-end w-[10rem] text-[1.3rem] text-black/80 dark:text-first/80 font-light">
          <span className="line-through">{discountPrice}</span>{" "}
          <span>{price}</span>
          تومان
        </p>
      </div>
      <div className="w-full flex px-10 items-center justify-between">
        <Link
          href={`/products/${group}/${_id}`}
          className="w-32 h-14 flex items-center justify-center text-first text-[1.5rem] font-light border-1 bg-second active:bg-first active:border-second active:text-second rounded-lg"
        >
          مشاهده
        </Link>

        <div
          onClick={() => deleteProduct(_id)}
          className="w-32 h-14 flex items-center justify-center text-first text-[1.5rem] font-light border-1 bg-second active:bg-first active:border-second active:text-second rounded-lg cursor-pointer"
        >
          پاک کردن
        </div>

        <Link
          href={`/cms/editProduct/${_id}`}
          className="w-32 h-14 flex items-center justify-center text-first text-[1.5rem] font-light border-1 bg-second active:bg-first active:border-second active:text-second rounded-lg cursor-pointer"
        >
          ویرایش
        </Link>
      </div>
    </div>
  );
});
export default CmsProductCart;
