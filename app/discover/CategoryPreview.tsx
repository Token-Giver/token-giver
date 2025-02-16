"use client";
import RightArrowIcon from "@/svgs/RightArrowIcon";
import CardLoader from "../components/loading/CardLoader";
import { Card } from "../components/Fundraiser/Card";
import { useEffect, useState } from "react";
import { fetchCampaigns } from "../utils/helper";
import { campaign_contract } from "../utils/data";
import Link from "next/link";

const CategoryPreview = ({ categoryName }: { categoryName: string }) => {
  const [collections, setCollections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    fetchCampaigns(campaign_contract, setLoading, (campaigns: any[]) => {
      // Limit to first 8 campaigns
      setCollections(campaigns.slice(0, 8));
    });
    return () => {};
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 4 >= collections.length ? 0 : prev + 4));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev - 4 < 0 ? Math.max(collections.length - 4, 0) : prev - 4
    );
  };

  const isLastSlide = currentSlide + 4 >= collections.length;
  const isFirstSlide = currentSlide === 0;

  return collections.length > 0 ? (
    <div className="mx-auto max-w-[1204px] space-y-4">
      <div className="flex justify-between px-6">
        <h3 className="text-2xl">
          <span className="font-agrandir">{categoryName}</span>{" "}
          <span>Fundraisers</span>{" "}
        </h3>
        {collections.length > 4 && (
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
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 25}%)` }}
        >
          {loading
            ? Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="w-1/4 flex-shrink-0">
                  <CardLoader />
                </div>
              ))
            : collections.map((data, idx) => {
                const path = data.name
                  .replace(/[^a-zA-Z ]/g, "")
                  .replace(/ /g, "-")
                  .toLocaleLowerCase()
                  .replace(/-+/g, "-");

                const url = `${path}/${data.campaign_address}/${data.cid}`;
                return (
                  <div key={idx} className="w-1/4 flex-shrink-0">
                    <Card
                      cid={data.cid}
                      causeName={data.name || "Unknown Cause"}
                      imageSrc={
                        `${
                          process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL
                        }${data.image?.slice(7, -1)}?pinataGatewayToken=${
                          process.env.NEXT_PUBLIC_PINATA_API_KEY
                        }` || "/default-image.webp"
                      }
                      location={data.location}
                      progress={0}
                      token_id={data.id}
                      campaign_address={data.campaign_address || "0x0"}
                      target={data.target}
                      url={url}
                    />
                  </div>
                );
              })}
        </div>
      </div>
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
    </div>
  ) : null;
};

export default CategoryPreview;
