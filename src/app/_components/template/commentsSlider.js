"use client";
import React, { memo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import CommentBox from "../modules/commentBox";

const CommentsSlider = memo(({ comments }) => {
  return (
    <Swiper
      breakpoints={{
        100: { slidesPerView: 1 },
        800: { slidesPerView: 2 },
        1000: { slidesPerView: 3 },
      }}
      spaceBetween={50}
      slidesPerView={3}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      modules={[Autoplay]}
      loop={true}
      className="!p-2 !pb-[12rem]"
    >
      {comments?.length
        ? comments.map((item) => (
            <SwiperSlide key={item._id}>
              <CommentBox {...item} />
            </SwiperSlide>
          ))
        : null}
    </Swiper>
  );
});

export default CommentsSlider;
