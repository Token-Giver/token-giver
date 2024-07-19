"use client";
import { useEffect, useState } from "react";
import Card from "./Card";
import CardLoader from "@/app/components/loading/CardLoader";
import { useRouter } from "next/navigation";
import { COLLECTION_CONTRACT_ADDRESS } from "@/address";
import campaign_contract_abi from "../../../public/abi/campaign_abi.json";
import token_abi from "../../../public/abi/token_abi.json";
import { Contract, RpcProvider } from "starknet";
import { CAMPAIGN_CONTRACT_ADDRESS } from "@/app/utils/data";
import { fetchContentFromIPFS } from "@/app/utils/helper";
import { STRK_SEPOLIA } from "@/app/utils/constant";
import { formatCurrency } from "@/app/utils/currency";

const Fundraisers = () => {
  const router = useRouter();
  const [collections, setCollections] = useState<any[]>([]);
  const [balance, setBalance] = useState("0");
  const [loading, setLoading] = useState(true);
  const handleRouteToCampaigns = () => {
    router.push("/campaigns");
  };

  const provider = new RpcProvider({
    nodeUrl: "https://starknet-sepolia.public.blastapi.io",
  });

  let campaign_contract = new Contract(
    campaign_contract_abi,
    CAMPAIGN_CONTRACT_ADDRESS,
    provider
  );

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const campaigns: any = await campaign_contract.get_campaigns();
        console.log(campaigns, "campdsf");
        const campaignPromises = campaigns.map((cid: string) =>
          fetchContentFromIPFS(cid.slice(7, -1))
        );
        const campaignData = await Promise.all(campaignPromises);
        setCollections(campaignData.filter((data) => data !== null));
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
      <h2 className="my-[5rem]">Browse Fundraisers</h2>

      <section
        id="fundraisers"
        className="grid gap-4  md:gap-8 lg:grid-cols-3 md:max-w-[800px] lg:max-w-none md:mx-auto  md:justify-center "
      >
        {loading
          ? Array.from({ length: 12 }).map((_, idx) => <CardLoader key={idx} />)
          : collections.map((data, idx) => {
              return (
                <Card
                  cid={data.cid}
                  causeName={data.name || "Unknown Cause"}
                  imageSrc={
                    `https://ipfs.io/ipfs/${data.image?.slice(7, -1)}` ||
                    "/default-image.webp"
                  }
                  location={data.location}
                  progress={0}
                  key={idx}
                  token_id={data.id}
                  campaign_address={data.campaign_address || "0x0"}
                  target={data.target}
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
    </section>
  );
};

export default Fundraisers;
