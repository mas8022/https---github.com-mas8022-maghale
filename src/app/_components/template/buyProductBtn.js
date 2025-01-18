"use client";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import swal from "sweetalert";

const BuyProductBtn = ({ productId }) => {
  const router = useRouter()
  const buyProduct = (productId) => {

    swal({
      title: "خرید دوره",
      text: "ایا میخواهید دوره را خریداری کنید؟",
      buttons: ["لغو", "تایید"],
    }).then((response) => {
      if (response) {
        fetch(`/api/buyProduct/${productId}`, { method: "PUT" })
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
    <div className="w-full px-10 py-7 bg-second/10 border-y-2 border-y-second rounded-lg flex flex-col items-center justify-center gap-12">
      <span className="text-4xl text-center">
        در صورت تمایل به تماشا ویدئو این دوره باید این دوره را خریداری کنید
      </span>
      <button
        onClick={() => buyProduct(productId)}
        className="px-9 py-4 pb-5 flex text-3xl bg-second text-first rounded-xl active:bg-second/70 cursor-pointer"
      >
        خرید دوره
      </button>
    </div>
  );
};

export default BuyProductBtn;
