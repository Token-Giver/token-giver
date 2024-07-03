"use client";
import HeartIcon from "@/svgs/HeartIcon";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();
  const createCampaign = () => {
    router.push("/create");
  };
  return (
    <section
      style={{
        height: "calc(100vh - 10rem)",
      }}
      className="flex flex-col justify-between  items-center"
    >
      <div>
        <h1 className=" font-semibold mb-4 text-center">
          Lorem ipsum dolor sit amet, adipisicing elit.
        </h1>
        <p className="text-center">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Asperiores
          minus sit itaque odio molestiae porro repudiandae.{" "}
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
      <div className=" lg:w-[80%] h-[65%] flex justify-between p-8 gap-4">
        <div className="h-full w-[20%] bg-red-600 rounded-tl-[150px]">
          {/* <Image
            className=" rounded-tl-[150px] object-cover w-full h-full group-hover:scale-105 transition-all"
            loader={() => "/0.webp"}
            src={"/0.webp"}
            alt=""
            width={400}
            height={400}
          /> */}
        </div>
        <div className="grid grid-rows-2  grid-cols-5 gap-4 flex-1">
          <div className=" w-full h-full bg-purple-600 col-span-2 rounded-r-full">
            {/* <Image
              className="rounded-r-full object-cover w-full h-full group-hover:scale-105 transition-all"
              loader={() => "/1.webp"}
              src={"/1.webp"}
              alt=""
              width={400}
              height={400}
            /> */}
          </div>
          <div className=" w-full h-full col-span-3  bg-purple-600 rounded-l-full rounded-tr-full">
            {/* <Image
              className="rounded-l-full rounded-tr-full object-cover w-full h-full group-hover:scale-105 transition-all"
              loader={() => "/3.webp"}
              src={"/3.webp"}
              alt=""
              width={400}
              height={400}
            /> */}
          </div>
          <div className=" w-full h-full col-span-3  bg-purple-600 rounded-bl-[120px] rounded-tr-[120px]">
            {/* <Image
              className="rounded-bl-[120px] rounded-tr-[120px] object-cover w-full h-full group-hover:scale-105 transition-all"
              loader={() => "/2.webp"}
              src={"/3.webp"}
              alt=""
              width={400}
              height={400}
            /> */}
          </div>
          <div className=" w-full h-full  flex items-center  justify-center col-span-2">
            <HeartIcon />
          </div>
        </div>
        <div className=" h-full w-[20%]  bg-purple-600 rounded-full">
          {/* <Image
            className=" rounded-full object-cover w-full h-full group-hover:scale-105 transition-all"
            loader={() => "/4.webp"}
            src={"/4.webp"}
            alt=""
            width={400}
            height={400}
          /> */}
        </div>
      </div>
    </section>
  );
};

export default Hero;
