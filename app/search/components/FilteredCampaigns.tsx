import { Card } from "@/app/components/Fundraiser/Card";
import { Campaign } from "@/types";

const FilteredCampaigns = ({ campaigns }: { campaigns: Campaign[] }) => {
  return (
    <div className="mx-auto mb-8 mt-16 flex max-w-[1242px] animate-fadeIn flex-col">
      <h3 className="ml-6 font-agrandir text-2xl text-foreground-primary">
        Search Results
      </h3>
      <div className="grid grid-cols-4 gap-4">
        {campaigns.map((campaign, idx) => {
          const path = campaign.name
            .replace(/[^a-zA-Z ]/g, "")
            .replace(/ /g, "-")
            .toLocaleLowerCase()
            .replace(/-+/g, "-");

          const url = `${path}/${campaign.campaign_address}/${campaign.cid}`;
          return (
            <Card
              key={idx}
              cid={campaign.cid}
              causeName={campaign.name || "Unknown Cause"}
              imageSrc={
                `${
                  process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL
                }${campaign.image?.slice(7, -1)}?pinataGatewayToken=${
                  process.env.NEXT_PUBLIC_PINATA_API_KEY
                }` || "/default-image.webp"
              }
              location={campaign.location}
              progress={0}
              token_id={campaign.id}
              campaign_address={campaign.campaign_address || "0x0"}
              target={campaign.target}
              url={url}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FilteredCampaigns;
