"use client";
import useToggle from "@/utils/toggle";
import useConvertTime from "@/utils/useConvertTime";
import useDiscountPrice from "@/utils/useDiscountPrice";
import useSanitizeInput from "@/utils/useSanitizeInput";
import Image from "next/image";
import Link from "next/link";
import React, { memo, useEffect, useState } from "react";

const MainSearch = memo(() => {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);

  const searchHandler = (e) => {
    toggleOpen(e);

    if (search.trim()) {
      fetch(`/api/searchProducts/${search}`)
        .then((res) => res.json())
        .then((data) => setProducts(data));
    }
  };
  const [isOpen, toggleOpen] = useToggle("MainSearchList");

  useEffect(() => {
    if (!isOpen) {
      setProducts([]);
    }
  }, [isOpen]);

  return (
    <div className="w-full flex flex-col rounded-3xl items-center">
  
      <div className="w-full py-10 pb-14 border-y-1 border-y-second/90 bg-second/10 flex flex-col gap-12 items-center justify-center rounded-3xl">
        <p className="md:text-[2.5rem] text-[2rem] font-light text-black/60 dark:text-first">
          دنبال چه اموزشی هستید؟
        </p>
        <div className="md:w-1/2 w-[70%] h-16 flex overflow-hidden rounded-lg">
          <button
            onClick={(e) => searchHandler(e)}
            className="ld:w-1/6 w-2/6 h-full bg-second text-first xxm:text-[1.5rem] text-[1.4rem] font-light active:bg-second/50"
          >
            جستجو
          </button>
          <input
            type="search"
            value={search}
            onChange={(e) => {
              setSearch(useSanitizeInput(e.target.value));
            }}
            className="w-full sm:px-8 px-5 text-[1.5rem] text-black dark:text-first font-light focus:outline-none outline-none dark:bg-first/30"
          />
        </div>
      </div>
      {products?.length ? (
        <div className="lgg:w-[80%] w-full h-auto max-h-[35rem] overflow-y-scroll shadow-lg rounded-lg custom-scrollbar p-5">
          {products.map((item) => (
            <Link href={`/products/${item.group}/${item._id}`} key={item._id}>
              <div className="w-full xxd:h-36 h-auto xxd:p-0 p-5 border-2 hover:bg-blue-500/5 flex mmd:flex-row flex-row-reverse items-center xxd:justify-between justify-center mb-6 rounded-xl overflow-hidden">
                <Image
                  src={
                    item?.cover ? item.cover : "/images/productDefaultCover.jpg"
                  }
                  width={130}
                  height={130}
                  alt="عکس محصول"
                  className="h-full mmd:w-40 w-60 object-cover xxd:block hidden"
                />
                <div className="w-full h-full flex mmd:flex-row flex-col px-5 justify-between xxd:gap-0 gap-2">
                  <div className="h-full flex flex-col justify-evenly xxd:gap-0 gap-4">
                    <h2 className="text-[1.7rem] dark:text-first line-clamp-1">
                      {item.title}
                    </h2>
                    <div className="flex xxd:flex-row flex-wrap gap-5">
                      <p className="text-xl text-black/60 dark:text-first/60 font-light">
                        نام استاد: {item.author?.name}
                      </p>
                      {item.duration ? (
                        <p className="text-xl text-black/60 dark:text-first/60 font-light">{`ساعت تدریس:  ${
                          useConvertTime(item.duration).hour
                        } ساعت و ${
                          useConvertTime(item.duration).minute
                        } دقیقه`}</p>
                      ) : null}
                      <p className="text-xl text-black/60 dark:text-first/60 font-light">{`تعداد دانشجو: ${item.sellCount}`}</p>
                    </div>
                  </div>
                  <div className="h-full flex flex-col justify-evenly pl-5">
                    {item.price === 0 ? (
                      <p className="text-3xl h-[3.85rem] font-bold text-green-500 dark:text-green-300">
                        رایگان
                      </p>
                    ) : (
                      <p className="text-end w-[10rem] text-[1.3rem] text-black/80 dark:text-first/80 font-light mmd:block flex gap-2">
                        <span className="line-through">
                          {item.price.toLocaleString()}
                        </span>{" "}
                        <span>
                          {useDiscountPrice(
                            item.price,
                            item.discount
                          ).toLocaleString()}
                        </span>
                        تومان
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
});

export default MainSearch;
