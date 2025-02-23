"use client";
import CampaignSlider from "@/app/components/Fundraiser/CampaignSlider";
import { BigCard } from "@/app/components/Fundraiser/Card";
import CategorySlider from "@/app/components/Fundraiser/CategorySlider";
import { BigCardLoader } from "@/app/components/loading/CardLoader";
import { Campaign } from "@/types";

const LatestCampaigns = ({
  campaigns,
  loading
}: {
  campaigns: Campaign[];
  loading: boolean;
}) => {
  return (
    <>
      <CategorySlider />
      <div className="my-12">
        {loading ? (
          <BigCardLoader />
        ) : campaigns.length > 0 ? (
          <BigCard
            cid={campaigns[0].cid}
            causeName={campaigns[0].name || "Unknown Cause"}
            imageSrc={
              `${
                process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL
              }${campaigns[0].image?.slice(7, -1)}?pinataGatewayToken=${
                process.env.NEXT_PUBLIC_PINATA_API_KEY
              }` || "/default-image.webp"
            }
            location={campaigns[0].location}
            progress={0}
            token_id={campaigns[0].id}
            campaign_address={campaigns[0].campaign_address || "0x0"}
            target={campaigns[0].target}
            url={`${campaigns[0].name
              .replace(/[^a-zA-Z ]/g, "")
              .replace(/ /g, "-")
              .toLocaleLowerCase()
              .replace(/-+/g, "-")}/${campaigns[0].campaign_address}/${
              campaigns[0].cid
            }`}
            description={campaigns[0].description}
          />
        ) : null}
      </div>
      <div className="my-12">
        <CampaignSlider />
      </div>
    </>
  );
};

export default LatestCampaigns;
