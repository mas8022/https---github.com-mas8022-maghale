"use client";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";
import { memo, useEffect, useState } from "react";

const Player = memo(({ videoSRCes = [], auto }) => {
  const [url, setUrl] = useState(videoSRCes[0]);

  const plyrProps = {
    source: {
      type: "video",
      title: "Example title",
      sources: [
        {
          src: `${url}`,
          type: "video/mp4",
          size: 720,
        },
      ],
    },
    options: {
      autoplay: auto,
    },
  };

  useEffect(() => {
    setUrl(videoSRCes[0]);
  }, []);

  return (
    <div className="w-full flex flex-col gap-12 rounded-lg overflow-hidden">
      <Plyr {...plyrProps} />

      {videoSRCes?.length > 1 ? (
        <div className="w-full flex flex-col gap-6 bg-second/15 dark:bg-second/5 p-10 rounded-xl">
          {videoSRCes.map((item, index) => (
            <div
              onClick={() => {
                setUrl(item);
              }}
              key={index}
              className="w-full py-6 flex px-10 items-center justify-between rounded-xl border-2 border-second/30 bg-first dark:bg-[#1e293b] cursor-pointer active:scale-[99%]"
            >
              <span className="text-3xl text-second dark:text-second/65 tracking-widest">
                ویدعو شماره {index + 1}
              </span>
              <div className="size-20 flex items-center justify-center text-2xl text-second bg-second/10 rounded-full">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
});
export default Player;
