"use client";
import HeartIcon from "@/svgs/HeartIcon";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();
  const createCampaign = () => {
    router.push("/create");
  };
  return (
    <section
      id="hero"
      className="container mx-auto flex flex-col justify-between  items-center"
    >
      <div>
        <h1 className=" font-semibold mb-4 text-center">
          Transform Charity with Blockchain.
        </h1>
        <p className="text-center">
          Create impactful campaigns and donate through innovative NFTs. Token
          Giver empowers every act of kindness.
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
      <div className="w-screen lg:min-w-[1024px] lg:w-[80%] h-[65%]">
        <div className=" w-full h-full grid grid-cols-3 gap-1 px-4 mt-8  md:hidden">
          <div className="h-full rounded-tl-[150px]">
            <img
              className=" rounded-tl-[150px] object-cover w-full h-full group-hover:scale-105 transition-all"
              src={"/4.webp"}
              alt=""
              width={400}
              height={400}
            />
          </div>

          <div className=" w-full h-full  flex items-center  justify-center ">
            <HeartIcon />
          </div>

          <div className=" w-full h-full rounded-r-full">
            <img
              className="rounded-r-full object-cover w-full h-full group-hover:scale-105 transition-all"
              src={"/3.webp"}
              alt=""
              width={400}
              height={400}
            />
          </div>
        </div>
        <div className=" w-full h-full justify-between mt-8 px-4 md:p-8 gap-4 hidden md:flex">
          <div className="h-full w-[20%] rounded-tl-[150px] hidden md:block">
            <img
              className=" rounded-tl-[150px] object-cover w-full h-full group-hover:scale-105 transition-all"
              src={"/4.webp"}
              alt=""
              width={400}
              height={400}
            />
          </div>
          <div className="grid grid-rows-2  grid-cols-5 gap-4 flex-1">
            <div className=" w-full h-full col-span-2 rounded-r-full">
              <img
                className="rounded-r-full object-cover w-full h-full group-hover:scale-105 transition-all"
                src={"/1.webp"}
                alt=""
                width={400}
                height={400}
              />
            </div>
            <div className=" w-full h-full col-span-3 rounded-l-full rounded-tr-full">
              <img
                className="rounded-l-full rounded-tr-full object-cover w-full h-full group-hover:scale-105 transition-all"
                src={"/2.webp"}
                alt=""
                width={400}
                height={400}
              />
            </div>
            <div className=" w-full h-full col-span-3 rounded-bl-[120px] rounded-tr-[120px]">
              <img
                className="rounded-bl-[120px] rounded-tr-[120px] object-cover w-full h-full group-hover:scale-105 transition-all"
                src={"/3.webp"}
                alt=""
                width={400}
                height={400}
              />
            </div>
            <div className=" w-full h-full  flex items-center  justify-center col-span-2">
              <HeartIcon />
            </div>
          </div>
          <div className=" h-full w-[20%] rounded-full">
            <img
              className=" rounded-full object-cover w-full h-full group-hover:scale-105 transition-all"
              src={"/0.webp"}
              alt=""
              width={400}
              height={400}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
