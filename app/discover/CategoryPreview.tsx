"use client";
import RightArrowIcon from "@/svgs/RightArrowIcon";
import CardLoader from "../components/loading/CardLoader";
import { Card } from "../components/Fundraiser/Card";
import { useState } from "react";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import { ICampaign } from "@/types/campaigns";
import { GET_CAMPAIGNS_BY_CATEGORY } from "@/graphql/queries";

const CategoryPreview = ({
  categoryName,
  categorySlug
}: {
  categoryName: string;
  categorySlug: string;
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const { data, loading } = useQuery(GET_CAMPAIGNS_BY_CATEGORY, {
    variables: {
      name: categorySlug,
      limit: 12
    }
  });

  const campaigns: ICampaign[] = data?.getCampaignsByCategory?.items || [];

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

  return campaigns.length > 0 ? (
    <div className="mx-auto max-w-[1204px] space-y-4">
      <div className="flex justify-between">
        <h3 className="text-2xl">
          <span className="font-agrandir capitalize">{categoryName}</span>{" "}
          <span>Fundraisers</span>{" "}
        </h3>
        {campaigns.length > 4 && (
          <div className="flex items-center justify-end gap-4">
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
        )}
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
      {campaigns.length > 4 && (
        <div className="px-6">
          <Link
            className="group ml-auto flex w-fit items-center gap-1 hover:text-accent-green"
            href={`/discover/${categoryName.toLowerCase().replace(/\s+/g, "-")}`}
          >
            see more{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1">
              <RightArrowIcon />
            </span>
          </Link>
        </div>
      )}
    </div>
  ) : null;
};

export default CategoryPreview;
