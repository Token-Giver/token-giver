import { Card } from "@/app/components/Fundraiser/Card";
import CardLoader from "@/app/components/loading/CardLoader";
import { campaign_contract } from "@/app/utils/data";
import { fetchCampaigns } from "@/app/utils/helper";
import RightArrowIcon from "@/svgs/RightArrowIcon";
import { useEffect, useState } from "react";

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
    <div className="mx-auto max-w-[1204px] space-y-4">
      <h3 className="text-2xl text-foreground-primary">
        <span className="font-agrandir font-bold">Make a Difference.</span>{" "}
        <span className="font-normal">See Similar Campaigns</span>{" "}
        <span className="font-agrandir font-bold">like This </span>
      </h3>
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
      <div className="flex items-center justify-between">
        {loading
          ? Array.from({ length: 4 }).map((_, idx) => <CardLoader key={idx} />)
          : collections
              .slice(currentSlide, currentSlide + 4)
              .map((data, idx) => {
                const path = data.name
                  .replace(/[^a-zA-Z ]/g, "")
                  .replace(/ /g, "-")
                  .toLocaleLowerCase()
                  .replace(/-+/g, "-");

                const url = `${path}/${data.campaign_address}/${data.cid}`;
                return (
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
                    key={idx}
                    token_id={data.id}
                    campaign_address={data.campaign_address || "0x0"}
                    target={data.target}
                    url={url}
                  />
                );
              })}
      </div>
    </div>
  );
};

export default CampaignSlider;
