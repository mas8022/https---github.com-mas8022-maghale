import WorkTool from "@/src/app/_components/modules/workTool";
import React, { memo } from "react";
import productModel from "@/models/product";


const page = memo(async ({ params }) => {
  const product = await productModel.findById({ _id: params.id }, "-__v");


  return (
    <div className="w-full">
      <WorkTool
        apiPath={"draftedProject"}
        initialValues={JSON.parse(JSON.stringify(product))}
      />
    </div>
  );
});

export default page;
