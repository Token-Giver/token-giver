"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { campaign_contract } from "@/app/utils/data";
import { fetchCampaigns } from "@/app/utils/helper";
import FeaturedCampaigns from "./FeaturedCampaigns";
import CardLoader, { BigCardLoader } from "../loading/CardLoader";
import { BigCard, Card } from "./Card";
import CategorySlider from "./CategorySlider";

const Fundraisers = () => {
  const router = useRouter();
  const [collections, setCollections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const handleRouteToCampaigns = () => {
    router.push("/discover");
  };

  useEffect(() => {
    fetchCampaigns(campaign_contract, setLoading, setCollections);
    return () => {};
  }, []);

  return (
    <section className="max-w-[1536px] 2xl:mx-auto">
      <FeaturedCampaigns />

      <div className="mt-16">
        <CategorySlider />
        {loading ? (
          <BigCardLoader />
        ) : (
          <BigCard
          // .cid
            cid={collections[0].cid}
            causeName={collections[0].name || "Unknown Cause"}
            imageSrc={
              `${
                process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL
              }${collections[0]?.image?.slice(7, -1)}?pinataGatewayToken=${
                process.env.NEXT_PUBLIC_PINATA_API_KEY
              }` || "/default-image.webp"
            }
            location={collections[0]?.location}
            progress={0}
            token_id={collections[0]?.id}
            campaign_address={collections[0]?.campaign_address || "0x0"}
            target={collections[0].target}
            url={`${collections[0].name
              .replace(/[^a-zA-Z ]/g, "")
              .replace(/ /g, "-")
              .toLocaleLowerCase()
              .replace(/-+/g, "-")}/${collections[0]?.campaign_address}/${
              collections[0].cid
            }`}
            description={collections[0]?.description}
          />
        )}

        <div className="mx-auto mt-16 flex max-w-[1242px] flex-col items-center">
          <div className="grid grid-cols-4 gap-4">
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
            className="mx-auto mt-8 w-[7rem] rounded-[25px] px-4 py-2 text-sm text-foreground-primary ring-1 ring-[#808080]"
          >
            See more
          </button>
        </div>
      </div>
    </section>
  );
};

export default Fundraisers;
