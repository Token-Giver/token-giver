import { ProgressBar } from "@/app/components/ProgressBar";
import { fetchDonationBalance, fetchDonationCount } from "@/app/utils/helper";
import { Campaign } from "@/types";
import { useEffect, useState } from "react";

export default function HeroRibbon({
  campaign,
  address,
  handleDonate,
}: {
  campaign: Campaign;
  address: string;
  handleDonate: () => void;
}) {
  const [balance, setBalance] = useState(0);
  const [donationCount, setDonationCount] = useState(0);
  useEffect(() => {
    fetchDonationBalance(address, setBalance);
    fetchDonationCount(address, setDonationCount);
  }, []);

  return (
    <div className="bg-tkg-tint-100 px-7 py-6 flex flex-col lg:flex-row gap-4 items-center mb-8">
      <div className="flex-1 ">
        <div className="grid gap-2 w-full">
          <h1 className="text-[24px] leading-8 font-semibold">
            ${balance} raised
          </h1>
          <div className="flex items-center gap-4">
            <ProgressBar percent={balance / +campaign.target} />
            <span>{((balance / +campaign.target) * 100).toFixed(2)}%</span>
          </div>
          <div className="flex items-center gap-4">
            <span>${(+campaign.target).toLocaleString()} Donation goal</span>
            <span>{donationCount.toLocaleString()} donations</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={handleDonate}
          className="bg-tkg-primary text-white py-3 px-6 rounded-full max-h-11 leading-none"
        >
          Donate
        </button>
        <button className="border border-black py-3 px-6 rounded-full text-black max-h-11 leading-none">
          Share
        </button>
      </div>
    </div>
  );
}
