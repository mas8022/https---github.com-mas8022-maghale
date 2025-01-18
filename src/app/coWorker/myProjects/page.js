import React, { memo } from "react";
import Title from "../../_components/template/title";
import Cart from "../../_components/modules/cart";
import connectToDb from "@/configs/db";
import productModel from "@/models/product";
import { GetAuthorId } from "@/utils/author";
import TextBox from "../../_components/modules/textBox";

const page = memo(async () => {
  connectToDb();
  const authorId = await GetAuthorId();

  const products = await productModel
    .find(
      { ...(authorId && { author: authorId }), status: "publish" },
      "title cover duration sellCount price discount"
    )
    .populate("author", "name")
    .sort({ _id: -1 })
    .lean();

  return (
    <div className="w-full">
      <Title title={"پروژه های من"} />

      <div className="w-full flex justify-center">
        {products?.length ? (
          <div className="grid grid-cols-1 lgg:grid-cols-2  2xl:grid-cols-3 gap-8">
            {products.map((item) => (
              <Cart
                btnMode={"edit"}
                productData={JSON.parse(JSON.stringify(item))}
                key={item._id}
              />
            ))}
          </div>
        ) : (
          <TextBox text="محصولی در این قسمت وجود ندارد" />
        )}
      </div>
    </div>
  );
});

export default page;
