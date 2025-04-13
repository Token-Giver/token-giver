import { Card } from "@/app/components/Fundraiser/Card";
import RightArrowIcon from "@/svgs/RightArrowIcon";
import { useState } from "react";
import CardLoader from "../loading/CardLoader";
import { GET_ALL_CAMPAIGNS } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import { ICampaign } from "@/types/campaigns";

const CampaignSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const { data, loading } = useQuery(GET_ALL_CAMPAIGNS, {
    variables: { limit: 12 }
  });
  const campaigns: ICampaign[] = data?.getAllCampaigns.items || [];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 4 >= campaigns.length ? 0 : prev + 4));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev - 4 < 0 ? Math.max(campaigns.length - 4, 0) : prev - 4
    );
  };

  const isLastSlide = currentSlide + 4 >= campaigns.length;
  const isFirstSlide = currentSlide === 0;

  return (
    <div className="mx-auto max-w-[1204px] space-y-4 lg:px-[20px]">
      <div className="hidden items-center justify-end gap-4 pr-[14px] sm:flex lg:pr-0">
        <button
          onClick={prevSlide}
          className={`grid h-[30px] w-[30px] rotate-180 place-content-center rounded-full ${
            isFirstSlide
              ? "bg-gray-200 text-[#0000004D]"
              : "bg-accent-green text-white"
          }`}
        >
          <RightArrowIcon />
        </button>

        <button
          onClick={nextSlide}
          className={`grid h-[30px] w-[30px] place-content-center rounded-full ${
            isLastSlide
              ? "bg-gray-200 text-[#0000004D]"
              : "bg-accent-green text-white"
          }`}
        >
          <RightArrowIcon />
        </button>
      </div>
      <div className="overflow-hidden">
        <div
          className="flex gap-2 transition-transform duration-500 ease-in-out sm:flex-row"
          style={{ transform: `translateX(-${currentSlide * 25}%)` }}
        >
          {loading
            ? Array.from({ length: 4 }).map((_, idx) => (
                <div
                  key={idx}
                  className="mx-auto max-w-[335px] flex-shrink-0 sm:w-1/2 lg:w-1/3 xl:w-1/4"
                >
                  <CardLoader />
                </div>
              ))
            : campaigns.map((campaign, idx) => {
                const url = `/${campaign.campaign_name.toLowerCase().replace(/\s+/g, "-")}/${campaign.campaign_id}`;
                return (
                  <div
                    key={campaign.campaign_id}
                    className="w-full max-w-[335px] flex-shrink-0 sm:w-1/2 lg:w-1/3 xl:w-1/4"
                  >
                    <Card
                      cid={campaign.campaign_id}
                      causeName={campaign.campaign_name || "Unknown Cause"}
                      imageSrc={campaign.cover_photo || "/default-image.webp"}
                      location={campaign.location}
                      progress={campaign.total_donations}
                      token_id={campaign.campaign_id}
                      campaign_address={campaign.campaign_address || "0x0"}
                      target={String(campaign.target_amount)}
                      url={url}
                    />
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
};

export default CampaignSlider;
