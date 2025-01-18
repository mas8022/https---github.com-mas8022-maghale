import React from "react";
import Title from "../_components/template/title";
import Cart from "../_components/modules/cart";
import Hr from "../_components/modules/hr";
import connectToDb from "@/configs/db";
import userModel from "@/models/user";
import { MeId } from "@/utils/me";
import TextBox from "../_components/modules/textBox";

const page = async () => {
  connectToDb();
  const meId = await MeId();
  let products = [];

  if (meId) {
    const user = await userModel
      .findOne({ _id: meId }, "_id")
      .populate(
        "myProducts",
        "cover title author price discount sellCount duration"
      );

    products = user.myProducts;
  }

  return (
    <div className="w-full bg-first dark:bg-[#1e293b]">
      <Title title={"دوره های شما"} />
      <div className="w-full flex justify-center">
        <div className="grid grid-cols-1 lgg:grid-cols-2  2xl:grid-cols-3 gap-8">
          {products?.length ? (
            products.map((item) => <Cart productData={item} key={item._id} />)
          ) : (
           <TextBox text="محصولی در این قسمت وجود ندارد"/>
          )}
        </div>
      </div>
      <Hr />
    </div>
  );
};

export default page;
