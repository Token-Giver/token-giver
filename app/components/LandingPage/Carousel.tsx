import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const ImageCarousel: React.FC = () => {
  return (
    <div className="w-full h-full mt-8 px-4 py-[78px]">
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination]}
        pagination={{ clickable: true }}
        className="w-full"
      >
        <SwiperSlide>
          <div className="w-full h-[399px]">
            <img
              className="object-cover w-full h-full group-hover:scale-105 transition-all"
              src={"/4.webp"}
              alt="Image 1"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-[399px]">
            <img
              className="object-cover w-full h-full group-hover:scale-105 transition-all"
              src={"/2.webp"}
              alt="Image 2"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-[399px]">
            <img
              className="object-cover w-full h-full group-hover:scale-105 transition-all"
              src={"/3.webp"}
              alt="Image 3"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-[399px]">
            <img
              className="object-cover w-full h-full group-hover:scale-105 transition-all"
              src={"/0.webp"}
              alt="Image 4"
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default ImageCarousel;
