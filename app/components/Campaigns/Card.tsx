import { Campaign } from "@/types";
import React from "react";

interface CampaignCardProps {
  campaign: Campaign;
}

const CampaignCard: React.FC<CampaignCardProps> = ({ campaign }) => {
  const target = parseFloat(campaign.target) || 0;

  return (
    <div className="w-full max-w-sm bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={campaign.image}
        alt={campaign.name}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <p className="text-sm text-gray-600">{campaign.location}</p>
        <h2 className="text-xl font-semibold mt-2">{campaign.name}</h2>
        <p className="text-sm text-gray-500 mt-1">{campaign.description}</p>

        <div className="mt-4 flex justify-between items-center">
          <div>
            <p className="text-lg font-bold">{target.toLocaleString()}</p>
            <p className="text-sm text-gray-500">USD</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;
