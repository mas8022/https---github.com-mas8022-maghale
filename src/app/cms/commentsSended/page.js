"use client";
import React, { useEffect, useState } from "react";
import CmsCommentSendedCart from "../../_components/modules/cmsCommentCart";

const page = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(`/api/cms/siteImprovementsComment`)
      .then((res) => res.json())
      .then((data) => data && setComments(data));
  }, []);

  return (
    <div>
      <div className="w-full  flex flex-col items-end gap-40 py-[5rem] md:pr-14">
        <div className="w-full flex justify-center">
          {comments?.length ? (
            <div className="grid grid-cols-1 lgg:grid-cols-2  2xl:grid-cols-3 gap-8">
              {comments.map((item) => (
                <CmsCommentSendedCart
                  commentData={JSON.parse(JSON.stringify(item))}
                  key={item._id}
                />
              ))}
            </div>
          ) : (
            <div className="w-full h-56 flex items-center justify-center border-y-2 border-second/70 bg-second/15 dark:bg-second/5 text-second text-4xl rounded-lg">
              محصولی در این قسمت وجود ندارد
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
