import { Campaign } from "@/types";
import React from "react";
import ProgressBar from "./ProgressBar";

interface CampaignCardProps {
  campaign: Campaign;
}

const CampaignCard: React.FC<CampaignCardProps> = ({ campaign }) => {
  const progressPercentage = Math.min(
    (parseInt(campaign.amountRaised) / parseInt(campaign.target)) * 100,
    100
  );
  return (
    <div className="w-full lg:max-w-sm bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="flex lg:flex-col  justify-between pt-6 px-6 lg:px-0 lg:pt-0">
        <div className="lg:w-full h-[84px] w-[134px] lg:h-[253px] rounded-t-lg order-2 lg:order-1 ">
          <img
            src={campaign.image}
            alt={campaign.name}
            className="rounded-xl lg:rounded-none w-full h-full object-cover"
          />
        </div>

        <div className="order-1 lg:order-2 lg:pt-6 lg:px-6">
          <button className="w-fit px-4 h-[41px] border border-[#ABABAB] rounded-full place-content-center">
            <p className="capitalize">{campaign.category}</p>
          </button>
        </div>
      </div>

      <div className="py-6 px-6 space-y-[20px]">
        <h2 className="text-base">{campaign.name}</h2>

        <div className=" flex justify-between items-center">
          <p className="text-base">
            <span className="font-bold pr-1">{campaign.amountRaised}</span>
            STRK raised
          </p>

          <p className="text-base">
            Target <span className="font-bold pr-1">{campaign.target}</span>
            STRK
          </p>
        </div>

        <ProgressBar percentage={progressPercentage} />

        <div className=" flex justify-between items-center">
          <div className="">
            <img className="w-full h-full" src="/donor-avatars.png" alt="donor-avatars." />
          </div>
          <p className="text-base">Be part of the 50+ Donors</p>
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;
