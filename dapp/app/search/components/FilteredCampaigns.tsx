import Card from "@/app/components/Fundraiser/Card";
import { H3 } from "@/app/components/util/Headers";
import { Campaign } from "@/types";

const FilteredCampaigns = ({ campaigns }: { campaigns: Campaign[] }) => {
  return (
    <section>
      <H3 style="mb-4">Search Results</H3>
      <div className="grid gap-4  md:gap-8 lg:grid-cols-3 md:max-w-[800px] lg:max-w-none md:mx-auto  md:justify-center">
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
    </section>
  );
};

export default FilteredCampaigns;
