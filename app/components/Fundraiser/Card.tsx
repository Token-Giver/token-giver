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
      className="mx-auto flex min-w-[15rem] cursor-pointer flex-col gap-3 rounded-[10px] px-3 py-4 transition-all hover:bg-[#00594C]/10 max-[510px]:min-w-[22rem] max-xMobile:min-w-full sm:max-w-[20rem]"
    >
      {/* Image */}
      <div className="h-[150px] overflow-hidden rounded-[10px]">
        {/* <Image
          className="h-full w-[303px] rounded-t-[10px] object-cover transition-all hover:scale-105 lg:w-[267px]"
          src={imageSrc}
          alt={imageAltText ? imageAltText : ""}
          width={400}
          height={400}
        /> */}
        <img
          src={imageSrc}
          alt=""
          className="h-full w-[303px] rounded-t-[10px] object-cover transition-all hover:scale-105 lg:w-[267px]"
        />
      </div>

      {/* Details */}
      <div className="flex flex-col gap-2">
        <h4 className="line-clamp overflow-hidden font-agrandir text-[.9em] capitalize text-[#282828]">
          {causeName}
        </h4>
        <p className="flex items-center gap-x-1 text-sm text-foreground-secondary">
          <LocationIcon />
          <span>{location}.</span>
        </p>

        {/* Progress Bar */}
        <div className="w-full max-w-[19rem]">
          <div className="relative mb-2 h-[5px] w-full overflow-hidden rounded-full bg-[#EFEFEF]">
            <div
              style={{ width: width }}
              className="absolute left-0 top-0 h-full rounded-full bg-[#34AA6D]"
            ></div>
          </div>
        </div>

        <div className="flex max-w-[19rem] justify-between text-[.875rem]">
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
      className="mx-auto grid max-w-[1200px] animate-fadeIn cursor-pointer items-center gap-6 mobile:px-4 md:grid-cols-2 md:gap-8"
    >
      <div className="h-[22rem] w-full overflow-clip rounded-[10px]">
        {/* <Image
          className="h-full w-full rounded-t-[10px] bg-cover object-cover transition-all group-hover:scale-105"
          src={imageSrc}
          alt={imageAltText ? imageAltText : ""}
          width={400}
          height={400}
        /> */}
        <img
          src={imageSrc}
          alt=""
          className="h-full w-full rounded-t-[10px] bg-cover object-cover transition-all group-hover:scale-105"
        />
      </div>
      <div className="flex h-fit flex-col gap-4 rounded-[10px] py-2 max-md:max-w-[580px] md:h-[22rem]">
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

        <p className="line-clamp-8 text-foreground-secondary">{description}</p>
        <div className="relative mb-2 h-[.25rem] lg:w-full">
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
      </div>
    </div>
  );
};
