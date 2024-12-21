import Image from "next/image";
import { ProgressBar } from "./ProgressBar";
import Icon from "./icons/icon";

export function CampaignCard() {
  return (
    <div className="font-rethink-sans rounded-lg bg-white md:bg-inherit">
      <div className="flex flex-row-reverse justify-between gap-x-8 md:flex-col p-6 md:p-0">
        <div className="relative aspect-[377/253.5] w-full md:max-w-none max-w-[250px]">
          <Image
            className="rounded-lg h-full w-full"
            src={"/1.webp"}
            fill
            alt=""
          />
        </div>
        <div className="md:p-6 bg-white">
          <button className="border border-black py-2.5 text-sm md:text-base md:py-3 px-6 rounded-full text-black max-h-11 leading-none whitespace-nowrap">
            Random Category
          </button>
        </div>
      </div>
      <div className="bg-white px-6 pb-6 rounded-b-lg">
        <h1 className="mb-6">Reform children playground </h1>
        <div className="w-full">
          <p
            style={{ left: "86%" }}
            className="relative -translate-x-full w-fit"
          >
            86% there
          </p>
        </div>
        <div>
          <ProgressBar percent={0.86} />
        </div>
        <div className="flex justify-between mt-2.5 mb-6">
          <p>
            <span className="font-bold">25,000</span> STRK raised
          </p>
          <p>
            Target <span className="font-bold">25,000</span> STRK
          </p>
        </div>

        <div className="flex justify-between items-center">
          <Icon name="colors" />
          <p className="">Be part of the 200+ Donors</p>
        </div>
      </div>
    </div>
  );
}
