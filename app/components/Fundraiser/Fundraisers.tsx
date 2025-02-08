"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { campaign_contract } from "@/app/utils/data";
import { fetchCampaigns } from "@/app/utils/helper";
import FeaturedCampaigns from "./FeaturedCampaigns";
import CardLoader, { BigCardLoader } from "../loading/CardLoader";
import { BigCard, Card } from "./Card";
import { CATEGORIES } from "@/static";

const Fundraisers = () => {
  const router = useRouter();
  const [collections, setCollections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const handleRouteToCampaigns = () => {
    router.push("/explore");
  };

  useEffect(() => {
    fetchCampaigns(campaign_contract, setLoading, setCollections);
    return () => {};
  }, []);

  return (
    <section className="max-w-[1536px]  2xl:mx-auto">
      <FeaturedCampaigns />

      <div className="mt-16 ">
        <div className="relative  mx-auto mb-8">
          {/* Gradient indicators for scroll */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent z-10"></div>

          {/* Scrollable container */}
          <div className="overflow-x-auto flex gap-4 pb-4 px-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] scrollbar-hide">
            {/* Category buttons */}
            {CATEGORIES.map((category, index) => (
              <button
                key={index}
                className={`shrink-0 font-agrandir px-2 py-1 text-sm rounded-full transition-colors ${
                  index === 0
                    ? "bg-accent-green text-white hover:bg-[#0f6647]"
                    : " bg-[#F7F7F6] text-foreground-primary"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        {loading ? (
          <BigCardLoader />
        ) : (
          <BigCard
            cid={collections[0].cid}
            causeName={collections[0].name || "Unknown Cause"}
            imageSrc={
              `${
                process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL
              }${collections[0].image?.slice(7, -1)}?pinataGatewayToken=${
                process.env.NEXT_PUBLIC_PINATA_API_KEY
              }` || "/default-image.webp"
            }
            location={collections[0].location}
            progress={0}
            token_id={collections[0].id}
            campaign_address={collections[0].campaign_address || "0x0"}
            target={collections[0].target}
            url={`${collections[0].name
              .replace(/[^a-zA-Z ]/g, "")
              .replace(/ /g, "-")
              .toLocaleLowerCase()
              .replace(/-+/g, "-")}/${collections[0].campaign_address}/${
              collections[0].cid
            }`}
            description={collections[0].description}
          />
        )}

        <div className="mt-16 max-w-[1242px] flex flex-col items-center mx-auto">
          <div className="grid grid-cols-4  gap-4 ">
            {loading
              ? Array.from({ length: 12 }).map((_, idx) => (
                  <CardLoader key={idx} />
                ))
              : collections.slice(1, 9).map((data, idx) => {
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
          <button
            onClick={handleRouteToCampaigns}
            className="ring-1 ring-[#808080] w-[7rem] mx-auto text-sm px-4 py-2 mt-8 rounded-[25px] text-foreground-primary"
          >
            See more
          </button>
        </div>
      </div>
    </section>
  );
};

export default Fundraisers;
