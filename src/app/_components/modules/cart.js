import useConvertTime from "@/utils/useConvertTime";
import useDiscountPrice from "@/utils/useDiscountPrice";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Cart = ({ productData, btnMode }) => {
  const {
    _id,
    group,
    title,
    cover,
    duration,
    sellCount,
    price,
    discount,
    author,
  } = productData;

  const { hour, minute } = useConvertTime(duration);
  const discountPrice = useDiscountPrice(price, discount);

  return (
    <div className="w-[32rem] h-[32.5rem] bg-first dark:bg-[#374151] flex flex-col shadow-md rounded-xl overflow-hidden">
      <Image
        src={cover || "/images/productDefaultCover.jpg"}
        alt="product Image"
        width={250}
        height={200}
        placeholder="blur"
        blurDataURL={cover || "/images/productDefaultCover.jpg"}
        className="w-full h-60 mb-5 object-cover"
      />
      <h2 className="px-10 text-[15px] font-bold mb-12 line-clamp-1 dark:text-first">
        {title}
      </h2>

      <div className="w-full flex justify-between px-10 items-center gap-2">
        <div className="flex flex-col items-center gap-3">
          <span className="text-[13px] text-black/60 dark:text-first/60 self-start">
            {author?.name}
          </span>
          {hour && minute ? (
            <span className="text-[13px] text-black/60 dark:text-first/60 mt-2">
              {hour} ساعت و {minute} دقیقه
            </span>
          ) : null}

          <div className="flex items-end justify-start gap-2 self-start">
            <Image
              src="/images/student.svg"
              placeholder="blur"
              blurDataURL={"/images/student.svg"}
              width={50}
              height={50}
              alt="تعداد دانشجو"
              className="size-10 object-cover dark:invert"
            />
            <span className="text-[1.4rem] font-light dark:text-first">
              {sellCount}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-end gap-4 justify-start">
          {price === 0 ? (
            <p className="text-3xl h-[3.85rem] font-bold text-green-500 dark:text-green-300">
              رایگان
            </p>
          ) : (
            <p className="text-end w-[10rem] text-[1.3rem] text-black/80 dark:text-first/80 font-light">
              <span className="line-through">{price.toLocaleString()}</span>{" "}
              <span>{discountPrice.toLocaleString()}</span>
              تومان
            </p>
          )}
          {btnMode === "draft" ? (
            <Link
              href={`/coWorker/draftedProject/${_id}`}
              className="w-32 h-14 flex items-center justify-center text-first text-[1.5rem] font-light border-1 dark:border-second bg-second active:bg-first dark:active:bg-first/0 active:border-second active:text-second rounded-lg"
            >
              ادامه
            </Link>
          ) : btnMode === "edit" ? (
            <Link
              href={`/coWorker/myProjects/${_id}`}
              className="w-32 h-14 flex items-center justify-center text-first text-[1.5rem] font-light border-1 dark:border-second bg-second active:bg-first dark:active:bg-first/0 active:border-second active:text-second rounded-lg"
            >
              ویرایش
            </Link>
          ) : (
            <Link
              href={`/products/${group}/${_id}`}
              className="w-32 h-14 flex items-center justify-center text-first text-[1.5rem] font-light border-1 dark:border-second bg-second active:bg-first dark:active:bg-first/0 active:border-second active:text-second rounded-lg"
            >
              مشاهده
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
