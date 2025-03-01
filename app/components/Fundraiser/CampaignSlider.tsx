import { Card } from "@/app/components/Fundraiser/Card";
import { campaign_contract } from "@/app/utils/data";
import { fetchCampaigns } from "@/app/utils/helper";
import RightArrowIcon from "@/svgs/RightArrowIcon";
import { useEffect, useState } from "react";
import { CardLoader } from "../loading/CardLoader";

const CampaignSlider = () => {
  const [collections, setCollections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    fetchCampaigns(campaign_contract, setLoading, setCollections);
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

  return (
    <div className="mx-auto max-w-[1204px] space-y-4  lg:px-[20px]">
      <div className=" hidden sm:flex items-center justify-end gap-4 pr-[14px] lg:pr-0">
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
          className="flex flex-col sm:flex-row transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 25}%)` }}
        >
          {loading
            ? Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="mx-auto max-w-[335px] sm:w-1/2 lg:w-1/3 xl:w-1/4 flex-shrink-0">
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
                  <div key={idx} className="mx-auto max-w-[335px] sm:w-1/2 lg:w-1/3 xl:w-1/4 flex-shrink-0">
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
    </div>
  );
};

export default CampaignSlider;
