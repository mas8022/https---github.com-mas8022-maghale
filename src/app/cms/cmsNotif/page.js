import React from "react";
import CmsNotifCart from "../../_components/modules/cmsNotifCart";
import contactUsMessageModel from "@/models/contactUsMessage";
import connectToDb from "@/configs/db";
const page = async () => {
  connectToDb();
  const comments = await contactUsMessageModel.find(
    { isAnswer: false },
    "fullName email phone message"
  );

  return (
    <div>
      <div className="w-full  flex flex-col items-end gap-40 py-[5rem] md:pr-14">
        <div className="w-full flex justify-center">
          <div className="grid grid-cols-1 lgg:grid-cols-2  2xl:grid-cols-3 gap-8">
            {comments?.length
              ? comments.map((item) => (
                  <CmsNotifCart
                    commentData={JSON.parse(JSON.stringify(item))}
                    key={item._id}
                  />
                ))
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
