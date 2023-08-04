import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";

const ImageSlider = () => {
    return (
        <>
            <Swiper
                slidesPerView={"auto"}
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper w-full h-[25rem]"
            >
                <SwiperSlide className="bg-[url(/slide1.png)] bg-cover bg-center bg-no-repeat cursor-grab" />
                <SwiperSlide className="bg-[url(/slide2.png)] bg-cover bg-center bg-no-repeat cursor-grab" />
                <SwiperSlide className="bg-[url(/slide3.png)] bg-cover bg-center bg-no-repeat cursor-grab" />
                <SwiperSlide className="bg-[url(/slide1.png)] bg-cover bg-center bg-no-repeat cursor-grab" />
                <SwiperSlide className="bg-[url(/pc.png)] bg-cover bg-center bg-no-repeat cursor-grab" />
            </Swiper>
        </>
    );
};

export default ImageSlider;
