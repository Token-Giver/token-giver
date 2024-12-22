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
  isLastCard?: boolean;
};

const Card = ({
  causeName,
  imageSrc,
  location,
  imageAltText,
  campaign_address,
  target,
  url,
  isLastCard,
}: CardType) => {
  const router = useRouter();
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    fetchDonationBalance(campaign_address, setBalance);
  }, []);

  const handleRoute = () => {
    router.push(url);
  };

  const width = `${Math.min(
    parseFloat(((balance / parseInt(target)) * 100).toFixed(2)),
    100
  )}%`;

  return (
    <div
      onClick={handleRoute}
      className={`p-6 lg:p-0 ${
        !isLastCard ? "border-b border-dark-gray lg:border-b-0" : ""
      } lg:bg-white lg:rounded-lg cursor-pointer lg:max-w-[23.5rem]`}
    >
      <div className="flex items-start justify-between mb-6 lg:flex-col lg:gap-6 ">
        <button className="lg:mx-6 px-6 py-2.5 border border-dark-gray rounded-[3rem] text-center lg:order-2">
          Category
        </button>
        {imageSrc ? (
          <Image
            className="rounded-[0.25rem] lg:rounded-b-none object-cover lg:rounded-t-lg lg:order-1 lg:w-[377px] lg:h-[253px]"
            src={imageSrc}
            alt={imageAltText ? imageAltText : ""}
            width={125}
            height={84}
          />
        ) : (
          <div className="w-[125px] h-[84px] lg:w-[377px] lg:h-[253px] bg-gradient-linear"></div>
        )}
      </div>
      <div className="lg:mx-6 lg:pb-6">
        <p className="font-medium text-md leading-5">{causeName}</p>
        <div className="my-6">
          <p className="text-center mb-2.5 font-normal text-md">
            {width} there
          </p>
          <div className="w-full bg-[#D9D9D9] rounded-full h-[6px]">
            <div
              className="bg-pantone-green h-[6px] rounded-full"
              style={{
                width: width,
              }}
            ></div>
          </div>
        </div>
        <div className="flex justify-between mt-2.5 mb-6">
          <p className="text-md leading-5  font-bold">
            {balance.toFixed(2)}{" "}
            <span className="font-normal">STRK raised</span>
          </p>

          <p className="text-md leading-5 font-normal">
            Target <span className="font-bold">{target}</span> STRK
          </p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex -space-x-4 rtl:space-x-reverse">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className={`w-8 h-8 rounded-full`}
                style={{
                  backgroundColor: ["#A16262", "#B8D04F", "#76BAD4", "#B62FB6"][
                    index
                  ],
                }}
              ></div>
            ))}
          </div>
          <p className="text-md leading-5 font-normal">
            Be part of the 200+ Donors
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
