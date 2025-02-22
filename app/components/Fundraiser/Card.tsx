"use client";
import LocationIcon from "@/svgs/LocationIcon";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchBalance, fetchDonationBalance } from "@/app/utils/helper";
import { formatNumberCompact } from "@/app/utils";

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
  description?: string;
};

export const Card = ({
  causeName,
  imageSrc,
  location,
  imageAltText,
  campaign_address,
  target,
  url
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
      className="flex h-[19rem] w-[18.4rem] cursor-pointer flex-col gap-3 rounded-[10px] p-4 transition-all hover:bg-[#00594C]/10"
    >
      <div className="h-[150px] overflow-clip rounded-[10px]">
        <Image
          className="h-full w-full rounded-t-[10px] bg-cover object-cover transition-all group-hover:scale-105"
          src={imageSrc}
          alt={imageAltText ? imageAltText : ""}
          width={400}
          height={400}
        />
      </div>
      <div className="flex flex-col gap-2">
        <h4 className="line-clamp overflow-hidden font-agrandir text-[.9em] capitalize text-[#282828]">
          {causeName}
        </h4>
        <p className="flex items-center gap-x-1 text-foreground-secondary">
          <span>
            <LocationIcon />
          </span>
          <span className="text-[.8rem]">{location}.</span>
        </p>
        <div className="">
          <div className="relative mb-2 h-[.25rem] w-full">
            <div className="mb-4 h-[1.5vw] max-h-[.25rem] w-full rounded-full bg-[#EFEFEF]"></div>
            <div
              style={{
                width: width
              }}
              className={`absolute top-0 mb-4 h-[1vw] max-h-[.25rem] rounded-full bg-[#34AA6D]`}
            ></div>
          </div>
          <div className="flex justify-between px-2 text-[.875rem]">
            <p>
              {formatNumberCompact(balance || 0)} STRK{" "}
              <span>
                of {formatNumberCompact(Number(target) || 0)} STRK raised
              </span>
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
  description
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
      className="mx-auto grid max-w-[1200px] animate-fadeIn grid-cols-2 items-center gap-8"
    >
      <div className="h-[22rem] w-full overflow-clip rounded-[10px]">
        <Image
          className="h-full w-full rounded-t-[10px] bg-cover object-cover transition-all group-hover:scale-105"
          src={imageSrc}
          alt={imageAltText ? imageAltText : ""}
          width={400}
          height={400}
        />
      </div>
      <div className="flex h-[22rem] flex-col gap-4 rounded-[10px] py-2">
        <div>
          <h4 className="text-l line-clamp overflow-hidden font-agrandir capitalize text-[#282828]">
            {causeName}
          </h4>
          <p className="flex items-center gap-x-1 text-foreground-secondary">
            <span>
              <LocationIcon />
            </span>
            <span className="text-[.8rem]">{location}.</span>
          </p>
        </div>

        <p className="text-foreground-secondary">{description}</p>
        <div className="relative mb-2 h-[.25rem] w-full">
          <div className="mb-4 h-[1.5vw] max-h-[.25rem] w-full rounded-full bg-[#EFEFEF]"></div>
          <div
            style={{
              width: width
            }}
            className={`absolute top-0 mb-4 h-[1vw] max-h-[.25rem] rounded-full bg-[#34AA6D]`}
          ></div>
        </div>
        <div className="flex gap-6">
          <div>
            <p className="mb-2 text-[.9em] font-semibold text-foreground-primary">
              {formatNumberCompact(balance || 0)} STRK
            </p>
            <p className="text-foreground-secondary">Total raised</p>
          </div>
          <div>
            <p className="mb-2 text-[.9em] font-semibold text-foreground-primary">
              {formatNumberCompact(Number(target) || 0)} STRK
            </p>
            <p className="text-foreground-secondary">Target</p>
          </div>
        </div>
        <button className="w-[7rem] rounded-[25px] px-4 py-2 text-sm text-foreground-primary ring-1 ring-[#808080]">
          Learn more
        </button>
      </div>
    </div>
  );
};
