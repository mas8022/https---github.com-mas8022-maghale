"use client";
import { useRef, useEffect, memo } from "react";

const GetVideoDuration = memo(({ setDuration, file }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!file) return;

    if (file.type && file.type.startsWith("video/")) {
      const video = videoRef.current;

      if (video) {
        video.preload = "metadata";

        video.onloadedmetadata = function () {
          const duration = video.duration;
          setDuration(duration);
          window.URL.revokeObjectURL(video.src);
        };

        const blobURL = URL.createObjectURL(file);
        video.src = blobURL;

        return () => {
          window.URL.revokeObjectURL(blobURL);
        };
      }
    }
  }, [file, setDuration]);

  return file && <video ref={videoRef} className="hidden"></video>;
});

export default GetVideoDuration;
