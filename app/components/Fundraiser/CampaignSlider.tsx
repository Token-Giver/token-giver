import { Card } from "@/app/components/Fundraiser/Card";
import RightArrowIcon from "@/svgs/RightArrowIcon";
import { useState, useEffect } from "react";
import CardLoader from "../loading/CardLoader";
import { GET_ALL_CAMPAIGNS } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import { ICampaign } from "@/types/campaigns";
import { generateCampaignUrl } from "@/util";

const CampaignSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(4);

  const { data, loading } = useQuery(GET_ALL_CAMPAIGNS, {
    variables: { limit: 12 }
  });
  const campaigns: ICampaign[] = data?.getAllCampaigns.items || [];

  // Update items per slide based on screen size
  useEffect(() => {
    const updateItemsPerSlide = () => {
      if (window.innerWidth < 640) {
        // sm breakpoint
        setItemsPerSlide(1);
      } else if (window.innerWidth < 768) {
        // md breakpoint
        setItemsPerSlide(2);
      } else if (window.innerWidth < 1024) {
        // lg breakpoint
        setItemsPerSlide(3);
      } else if (window.innerWidth < 1280) {
        // xl breakpoint
        setItemsPerSlide(3);
      } else {
        setItemsPerSlide(4);
      }
    };

    updateItemsPerSlide();
    window.addEventListener("resize", updateItemsPerSlide);
    return () => window.removeEventListener("resize", updateItemsPerSlide);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev + itemsPerSlide >= campaigns.length ? 0 : prev + itemsPerSlide
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev - itemsPerSlide < 0
        ? Math.max(campaigns.length - itemsPerSlide, 0)
        : prev - itemsPerSlide
    );
  };

  const isLastSlide = currentSlide + itemsPerSlide >= campaigns.length;
  const isFirstSlide = currentSlide === 0;

  // Calculate transform percentage based on items per slide
  const getTransformPercentage = () => {
    const itemWidth = 100 / itemsPerSlide;
    return currentSlide * itemWidth;
  };

  return (
    <div className="mx-auto max-w-[1204px] space-y-4 lg:px-[20px]">
      {/* Desktop Navigation */}
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

      {/* Mobile Navigation */}
      <div className="flex items-center justify-between gap-4 px-4 sm:hidden">
        <button
          onClick={prevSlide}
          className={`grid h-[40px] w-[40px] rotate-180 place-content-center rounded-full ${
            isFirstSlide
              ? "bg-gray-200 text-[#0000004D]"
              : "bg-accent-green text-white"
          }`}
        >
          <RightArrowIcon />
        </button>

        <button
          onClick={nextSlide}
          className={`grid h-[40px] w-[40px] place-content-center rounded-full ${
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
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${getTransformPercentage()}%)` }}
        >
          {loading
            ? Array.from({ length: 4 }).map((_, idx) => (
                <div
                  key={idx}
                  className="w-full flex-shrink-0 sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3 2xl:w-1/4"
                >
                  <CardLoader />
                </div>
              ))
            : campaigns.map((campaign, idx) => {
                const url = generateCampaignUrl({
                  campaignName: campaign.campaign_name || "campaign",
                  campaignId: campaign.campaign_id
                });

                return (
                  <div
                    key={campaign.campaign_id}
                    className="w-full flex-shrink-0 sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4"
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
