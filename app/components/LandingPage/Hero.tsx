"use client";
import { useRouter } from "next/navigation";
import ImageCarousel from "./Carousel";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Hero = () => {
  const router = useRouter();
  const createCampaign = () => {
    router.push("/create");
  };
  return (
    <section className="container mx-auto flex flex-col justify-between lg:py-[100px] items-center">
      <div className="flex flex-col items-center justify-center space-y-[18px]">
        <h1 className="text-theme-green text-center font-semibold text-[18px] lg:text-[2.7rem]">
          Secure and Transparent Giving with Blockchain
        </h1>
        <p className="text-center text-[14px] lg:text-base font-medium">
          Merging Heart with Technology: Secure, Transparent Giving for Maximum
          Impact
        </p>
      </div>
      <div>
        <button
          onClick={createCampaign}
          className="bg-theme-green text-white px-6 py-2 mt-4 rounded-[25px]"
        >
          Start a Campaign
        </button>
      </div>

      <div className="w-full">
        <ImageCarousel />
      </div>

    </section>
  );
};

export default Hero;
