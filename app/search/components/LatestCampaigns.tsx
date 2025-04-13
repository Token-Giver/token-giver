"use client";
import CampaignSlider from "@/app/components/Fundraiser/CampaignSlider";
import { BigCard } from "@/app/components/Fundraiser/Card";
import CategorySlider from "@/app/components/Fundraiser/CategorySlider";
import { BigCardLoader } from "@/app/components/loading/CardLoader";
import { GET_ALL_CAMPAIGNS } from "@/graphql/queries";
import { ICampaign } from "@/types/campaigns";
import { useQuery } from "@apollo/client";

const LatestCampaigns = () => {
  const { data, loading } = useQuery(GET_ALL_CAMPAIGNS, {
    variables: { limit: 1 }
  });
  const campaigns: ICampaign[] = data?.getAllCampaigns.items || [];
  return (
    <>
      <CategorySlider />
      <div className="my-12">
        {loading ? (
          <BigCardLoader />
        ) : (
          campaigns[0] && (
            <BigCard
              cid={campaigns[0].campaign_id}
              causeName={campaigns[0].campaign_name || "Unknown Cause"}
              imageSrc={campaigns[0].cover_photo || "/default-image.webp"}
              location={campaigns[0].location}
              progress={campaigns[0].total_donations}
              token_id={campaigns[0].campaign_id}
              campaign_address={campaigns[0].campaign_address || "0x0"}
              target={String(campaigns[0].target_amount)}
              url={`${campaigns[0].campaign_name.toLowerCase().replace(/\s+/g, "-")}/${campaigns[0].campaign_id}`}
              description={campaigns[0].campaign_description}
            />
          )
        )}
      </div>
      <div className="my-12">
        <CampaignSlider />
      </div>
    </>
  );
};

export default LatestCampaigns;
