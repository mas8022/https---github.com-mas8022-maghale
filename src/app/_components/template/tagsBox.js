import React, { memo } from "react";

const TagsBox = memo(({ tags }) => {
  return (
    <div className="w-full">
      <div className="w-full p-12  flex flex-wrap bg-second/5 dark:bg-black/15 rounded-3xl overflow-hidden shadow-md dark:shadow-lg dark:child:text-first/50">
        <div className="w-full border-b-[1px] border-second/50 pb-2 mb-6">
          <p className="text-[2.3rem] font-bold dark:text-first">بر چسب ها</p>
        </div>

        {tags?.length
          ? tags.map((item, index) => (
              <div key={index}>
                <div className="w-3 h-3"></div>

                <span className="text-[1.4rem] font-bold text-black/50 dark:text-first/70">
                  #{item}
                </span>
              </div>
            ))
          : null}
      </div>
    </div>
  );
});

export default TagsBox;
