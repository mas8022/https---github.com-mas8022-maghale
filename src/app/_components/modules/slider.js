"use client";
import React from "react";
import Cart from "./cart";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

const Sliders = ({ productsData }) => {
  return (
    <Swiper
      breakpoints={{
        100: { slidesPerView: 1 },
        800: { slidesPerView: 2 },
        1000: { slidesPerView: 3 },
        1391: { slidesPerView: 4 },
      }}
      slidesPerView={4}
      spaceBetween={10}
      className="!p-2 overflow-hidden rounded-xl"
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      modules={[Autoplay]}
      loop={true}
    >
      {productsData?.length
        ? productsData.map((item) => (
            <SwiperSlide
              key={item._id}
              className="!flex items-center justify-center"
            >
              <Cart productData={item} />
            </SwiperSlide>
          ))
        : null}
    </Swiper>
  );
};

export default Sliders;
