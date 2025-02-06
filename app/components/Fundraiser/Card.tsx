"use client";
import LocationIcon from "@/svgs/LocationIcon";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchBalance, fetchDonationBalance } from "@/app/utils/helper";

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
  url: string;
};

export const Card = ({
  causeName,
  imageSrc,
  location,
  imageAltText,
  campaign_address,
  target,
  url,
}: CardType) => {
  const router = useRouter();
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    fetchDonationBalance(campaign_address, setBalance);
  }, []);

  const handleRoute = () => {
    router.push(url);
  };

  const width = `${Math.min((balance / parseInt(target)) * 100, 100)}%`;

  return (
    <div
      onClick={handleRoute}
      className="w-[18.4rem] cursor-pointer hover:bg-[#00594C]/10 transition-all rounded-[10px] flex-col flex gap-3 h-[19rem] p-4"
    >
      <div className="h-[150px] rounded-[10px] overflow-clip">
        <Image
          className="rounded-t-[10px] bg-cover w-full h-full group-hover:scale-105 object-cover transition-all"
          src={imageSrc}
          alt={imageAltText ? imageAltText : ""}
          width={400}
          height={400}
        />
      </div>
      <div className="flex flex-col gap-2">
        <h4 className="text-[.9em] font-agrandir text-[#282828] overflow-hidden capitalize line-clamp">
          {causeName}
        </h4>
        <p className=" flex text-foreground-secondary items-center gap-x-1">
          <span>
            <LocationIcon />
          </span>
          <span className="text-[.8rem]">{location}.</span>
        </p>
        <div className="">
          <div className="w-full h-[.25rem] mb-2 relative">
            <div className="w-full h-[1.5vw] max-h-[.25rem] bg-[#EFEFEF] rounded-full mb-4"></div>
            <div
              style={{
                width: width,
              }}
              className={`h-[1vw] max-h-[.25rem] bg-[#34AA6D] rounded-full mb-4 top-0 absolute`}
            ></div>
          </div>
          <div className="flex justify-between px-2 text-[.875rem]">
            <p>
              {balance.toFixed(2)} STRK <span>of {target} STRK raised</span>
            </p>
            <p>{((balance / parseFloat(target)) * 100).toFixed(2)}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const BigCard = ({
  causeName,
  imageSrc,
  location,
  imageAltText,
  campaign_address,
  target,
  url,
}: CardType) => {
  const router = useRouter();
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    fetchDonationBalance(campaign_address, setBalance);
  }, []);

  const handleRoute = () => {
    router.push(url);
  };

  const width = `${Math.min((balance / parseInt(target)) * 100, 100)}%`;
  return (
    <div
      onClick={handleRoute}
      className="flex gap-8 items-center max-w-[1200px] mx-auto"
    >
      <div className="overflow-clip h-[22rem] rounded-[10px] w-full">
        <Image
          className="rounded-t-[10px] bg-cover w-full h-full group-hover:scale-105 object-cover transition-all"
          src={imageSrc}
          alt={imageAltText ? imageAltText : ""}
          width={400}
          height={400}
        />
      </div>
      <div className="h-[22rem] flex flex-col py-2 gap-4 rounded-[10px] ">
        <div>
          <h4 className="text-l font-agrandir text-[#282828] overflow-hidden capitalize line-clamp">
            {causeName}
          </h4>
          <p className=" flex text-foreground-secondary items-center gap-x-1">
            <span>
              <LocationIcon />
            </span>
            <span className="text-[.8rem]">{location}.</span>
          </p>
        </div>

        <p className="text-foreground-secondary">
          We are currently organizing a fundraising to assist us in getting
          sport equipment's and planning for the event. Supporting
          underprivileged children with access to quality education.
        </p>
        <div className="w-full h-[.25rem] mb-2 relative">
          <div className="w-full h-[1.5vw] max-h-[.25rem] bg-[#EFEFEF] rounded-full mb-4"></div>
          <div
            style={{
              width: width,
            }}
            className={`h-[1vw] max-h-[.25rem] bg-[#34AA6D] rounded-full mb-4 top-0 absolute`}
          ></div>
        </div>
        <div className="flex gap-6">
          <div>
            <p className="font-semibold mb-2 text-[.9em] text-foreground-primary">
              {balance.toFixed(2)} STRK
            </p>
            <p className="text-foreground-secondary">Total raised</p>
          </div>
          <div>
            <p className="font-semibold mb-2 text-[.9em]  text-foreground-primary">
              {target} STRK
            </p>
            <p className="text-foreground-secondary">Target</p>
          </div>
        </div>
        <button className="ring-1  ring-[#808080] w-[7rem]  text-sm px-4 py-2  rounded-[25px] text-foreground-primary">
          Learn more
        </button>
      </div>
    </div>
  );
};
