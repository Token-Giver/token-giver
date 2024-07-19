"use client";
import LocationIcon from "@/svgs/LocationIcon";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Contract, RpcProvider } from "starknet";
import token_abi from "../../../public/abi/token_abi.json";
import { STRK_SEPOLIA } from "@/app/utils/constant";
import { useState } from "react";
import { formatCurrency } from "@/app/utils/currency";

type CardType = {
  causeName: string;
  imageSrc: string;
  imageAltText?: string;
  location: string;
  progress: number;
  campaign_address: string;
  token_id: string;
  cid: string;
  target: string;
};

const Card = ({
  cid,
  causeName,
  imageSrc,
  location,
  progress,
  imageAltText,
  campaign_address,
  target,
  token_id,
}: CardType) => {
  const router = useRouter();
  const [balance, setBalance] = useState("0");
  const provider = new RpcProvider({
    nodeUrl: "https://starknet-sepolia.public.blastapi.io",
  });

  let strk_contract = new Contract(token_abi, STRK_SEPOLIA, provider);

  async function fetchBalance() {
    try {
      const strk = await strk_contract.balanceOf(campaign_address);
      // @ts-ignore
      const strkBalance = formatCurrency(strk?.balance?.low.toString());
      setBalance(strkBalance.toString() || "0");
    } catch (err) {
      console.log(err);
    }
  }

  fetchBalance();

  const handleRoute = () => {
    const path = causeName
      .replace(/[^a-zA-Z ]/g, "")
      .replace(/ /g, "-")
      .toLocaleLowerCase()
      .replace(/-+/g, "-");
    router.push(`${path}/${campaign_address}/${cid}`);
  };

  return (
    <div
      onClick={handleRoute}
      className=" grid grid-cols-6 items-center lg:flex lg:flex-col lg:justify-between  rounded-[10px] lg:h-[26.25rem]  w-full lg:max-w-[22.8rem] cursor-pointer group justify-self-center hover:bg-[#e4efe7] p-2 transition-all card"
    >
      <div className="w-[30vw] h-[30vw] max-w-[15.6rem] max-h-[15.6rem] lg:w-full lg:h-full lg:max-w-[21.8rem] lg:max-h-[21.8rem] bg-gray-100  rounded-[10px] col-span-2 overflow-hidden">
        {imageSrc ? (
          <Image
            className="rounded-t-[10px] w-full h-full group-hover:scale-105 object-cover transition-all"
            loader={() => imageSrc}
            src={imageSrc}
            alt={imageAltText ? imageAltText : ""}
            width={400}
            height={400}
          />
        ) : (
          <div className="w-[30vw] h-[30vw] max-w-[15.6rem] max-h-[15.6rem] lg:w-full lg:h-full lg:max-w-[21.8rem] lg:max-h-[21.8rem] bg-gradient-linear  group-hover:scale-105 transition-all"></div>
        )}
      </div>
      <div className="col-span-4 py-8 px-4 lg:py-4 lg:w-full">
        <div className=" h-[100px] flex flex-col gap-4 overflow-hidden ">
          <h4 className="text-[.9em] overflow-hidden capitalize line-clamp">
            {causeName}
          </h4>
          <p className=" flex items-center gap-x-1">
            <span>
              <LocationIcon />
            </span>
            <span className="text-[.8rem]">{location}.</span>
          </p>
        </div>

        <div className="">
          <div className="w-full h-[.25rem] mb-2 relative">
            <div className="w-full h-[1vw] max-h-[.25rem] bg-[#127c5548] rounded-full mb-4"></div>
            <div
              style={{
                width: `${(parseInt(balance) / parseInt(target)) * 100}%`,
              }}
              className={`h-[1vw] max-h-[.25rem] bg-[#127C56] rounded-full mb-4 top-0 absolute`}
            ></div>
          </div>
          <div className="flex justify-between px-2 text-[.875rem]">
            <p>{parseFloat(balance).toFixed(2)} STRK</p>
            <p>
              {((parseFloat(balance) / parseFloat(target)) * 100).toFixed(2)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
