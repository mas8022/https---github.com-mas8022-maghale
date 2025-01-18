import connectToDb from "@/configs/db";
import WorkTool from "@/src/app/_components/modules/workTool";
import React, { memo } from "react";
import productModel from "@/models/product";

const page = memo(async ({ params }) => {
  const productId = params.id;
  connectToDb();
  const product = await productModel.findOne({ _id: productId }).exec();

  return (
    <div className="w-full">
      <WorkTool initialValues={JSON.parse(JSON.stringify(product))} />
    </div>
  );
});

export default page;
