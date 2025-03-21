"use client";
import FeaturedCampaigns from "./FeaturedCampaigns";
import CardLoader, { BigCardLoader } from "../loading/CardLoader";
import { BigCard, Card } from "./Card";
import CategorySlider from "./CategorySlider";
import { useQuery } from "@apollo/client";
import { GET_ALL_CAMPAIGNS } from "@/graphql/queries";
import Link from "next/link";
import { ICampaign } from "@/types/campaigns";

const CampaignGrid = ({ campaigns }: { campaigns: ICampaign[] }) => {
  return (
    <div className="grid animate-fadeIn grid-cols-4 gap-4">
      {campaigns.slice(1).map((data) => {
        const url = `${data.campaign_name}/${data.campaign_id}`;
        return (
          <Card
            key={data.campaign_id}
            cid={data.campaign_id}
            causeName={data.campaign_name || "Unknown Cause"}
            imageSrc={data.cover_photo || "/default-image.webp"}
            location={""}
            progress={data.total_donations}
            token_id={data.campaign_id}
            campaign_address={data.campaign_address || "0x0"}
            target={String(data.target_amount)}
            url={url}
          />
        );
      })}
    </div>
  );
};

const LoadingGrid = () => (
  <div className="grid grid-cols-4 gap-4">
    {Array.from({ length: 8 }).map((_, idx) => (
      <CardLoader key={idx} />
    ))}
  </div>
);

const HeroCampaign = ({ campaign }: { campaign: ICampaign }) => (
  <BigCard
    cid={campaign.campaign_id}
    causeName={campaign.campaign_name || "Unknown Cause"}
    imageSrc={campaign.cover_photo || "/default-image.webp"}
    location={"Nairobi, Kenya"}
    progress={campaign.total_donations}
    token_id={campaign.campaign_id}
    campaign_address={campaign.campaign_address || "0x0"}
    target={String(campaign.target_amount)}
    url={`${campaign.campaign_name}`}
    description={campaign.campaign_description}
  />
);

const Fundraisers = () => {
  const { data, loading } = useQuery(GET_ALL_CAMPAIGNS, {
    variables: { limit: 9 }
  });
  const campaigns: ICampaign[] = data?.getAllCampaigns.items || [];

  return (
    <section className="max-w-[1536px] 2xl:mx-auto">
      <FeaturedCampaigns />

      <div className="mt-16">
        <CategorySlider />
        {loading ? (
          <BigCardLoader />
        ) : (
          campaigns[0] && <HeroCampaign campaign={campaigns[0]} />
        )}

        <div className="mx-auto mt-16 flex max-w-[1242px] flex-col items-center">
          {loading ? <LoadingGrid /> : <CampaignGrid campaigns={campaigns} />}

          <Link
            href={"/discover"}
            className="mx-auto mt-8 w-[7rem] rounded-[25px] px-4 py-2 text-sm text-foreground-primary ring-1 ring-[#808080]"
          >
            See more
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Fundraisers;
