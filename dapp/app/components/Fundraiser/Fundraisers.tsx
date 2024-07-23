"use client";
import { useEffect, useState } from "react";
import Card from "./Card";
import CardLoader from "@/app/components/loading/CardLoader";
import { useRouter } from "next/navigation";
import { campaign_contract } from "@/app/utils/data";
import { fetchContentFromIPFS } from "@/app/utils/helper";
import Container from "../util/Container";

const Fundraisers = () => {
  const router = useRouter();
  const [collections, setCollections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const handleRouteToCampaigns = () => {
    router.push("/campaigns");
  };

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const campaigns: any = await campaign_contract.get_campaigns();
        console.log(campaigns, "campdsf");
        const campaignPromises = campaigns.map((cid: string) =>
          fetchContentFromIPFS(cid.slice(7, -1))
        );
        const campaignData = await Promise.all(campaignPromises);
        setCollections(
          campaignData
            .filter((data) => data !== null)
            .sort((a, b) => {
              const dateA = new Date(a.created_at).getTime();
              const dateB = new Date(b.created_at).getTime();
              return dateB - dateA;
            })
        );
        console.log(campaignData, "campaign data");
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCampaigns();
    return () => {};
  }, []);

  return (
    <section>
      <Container>
        <h2 className="my-[5rem]">Browse Fundraisers</h2>

        <section
          id="fundraisers"
          className="grid gap-4  md:gap-8 lg:grid-cols-3 md:max-w-[800px] lg:max-w-none md:mx-auto  md:justify-center "
        >
          {loading
            ? Array.from({ length: 12 }).map((_, idx) => (
                <CardLoader key={idx} />
              ))
            : collections.map((data, idx) => {
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
        </section>
        <div className=" flex justify-center">
          <button
            onClick={handleRouteToCampaigns}
            className="px-6 py-2 border-solid border-[1px] ml-10 mt-10 h-fit border-[#127C56] rounded-[25px]"
          >
            Show more
          </button>
        </div>
      </Container>
    </section>
  );
};

export default Fundraisers;
