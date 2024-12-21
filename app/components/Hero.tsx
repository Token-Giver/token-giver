"use client";
import HeartIcon from "@/svgs/HeartIcon";
import { useRouter } from "next/navigation";
import { H1 } from "./util/Headers";

const Hero = () => {
  const router = useRouter();
  const createCampaign = () => {
    router.push("/create");
  };
  return (
    <section
      id="hero"
      className="container mx-auto flex flex-col justify-between lg:py-[100px] items-center"
    >
      <div>
        <h1 className="text-theme-green font-semibold text-[2.7rem]">
          Secure and Transparent Giving with Blockchain
        </h1>
        <p className="text-center text-base font-medium">
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

      <div className="w-full h-full justify-between mt-8 px-4  py-[78px] gap-4 ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 flex-1">
          <div className=" w-full h-[399px] md:w-[316px]">
            <img
              className=" object-cover w-full h-full group-hover:scale-105 transition-all"
              src={"/4.webp"}
              alt=""
            />
          </div>
          <div className="h-[399px] w-[316px]">
            <img
              className=" object-cover w-full h-full group-hover:scale-105 transition-all"
              src={"/2.webp"}
              alt=""
            />
          </div>
          <div className="h-[399px] w-[316px]">
            <img
              className=" object-cover w-full h-full group-hover:scale-105 transition-all"
              src={"/3.webp"}
              alt=""
            />
          </div>
          <div className="h-[399px] w-[316px]">
            <img
              className=" object-cover w-full h-full group-hover:scale-105 transition-all"
              src={"/0.webp"}
              alt=""
            />
          </div>
        </div>
      </div>
     
    </section>
  );
};

export default Hero;
