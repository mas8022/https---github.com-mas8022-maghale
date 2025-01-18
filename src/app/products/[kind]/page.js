"use client";
import React, { useEffect, useState } from "react";
import SideFilterMobile from "../../_components/template/sideFilter";
import Cart from "../../_components/modules/cart";
import SideFilterPC from "../../_components/template/sideFilterPc";
import Hr from "../../_components/modules/hr";
import { useLocalStorage } from "mas22/useLocalStorage/useLocalStorage";
import { MoonLoader } from "react-spinners";

export default function products({ params }) {
  const [filter, setFilter] = useLocalStorage("sideFilterValue", "all");
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(true);

  const fetchProducts = () => {
    
    fetch("/api/product/allProducts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ searchParam: params.kind, filter }),
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data);
        setLoader(false);
      });
  };

  useEffect(() => {
    if (filter) {
      fetchProducts();
    }
  }, []);

  useEffect(() => {
    if (filter) {
      fetchProducts();
    }
  }, [filter]);

  return (
    <>
      <div className="w-full flex">
        <SideFilterPC setFilter={setFilter} filter={filter} />

        <div className="w-full  flex flex-col items-end gap-16 py-[5rem] md:pr-14">
          <SideFilterMobile setFilter={setFilter} filter={filter} />

          {products?.length ? (
            <div className="w-full flex justify-center">
              <div className="grid grid-cols-1 lgg:grid-cols-2  2xl:grid-cols-3 gap-8">
                {products.map((item) => (
                  <Cart productData={item} key={item._id} />
                ))}
              </div>
            </div>
          ) : (
            <div className="w-full h-96 border-y-2 border-y-second/70 bg-second/10 text-second text-4xl font-light flex items-center justify-center rounded-xl">
              {loader ? (
                <MoonLoader size={80} color="#f97316" />
              ) : (
                <span>کالایی یافت نشد ...</span>
              )}
            </div>
          )}
        </div>
      </div>
      <Hr />
    </>
  );
}
