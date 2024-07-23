"use client";
import { useEffect, useState } from "react";
import Card from "../components/Fundraiser/Card";
import CardLoader from "../components/loading/CardLoader";
import { Contract, RpcProvider } from "starknet";
import campaign_contract_abi from "../../public/abi/campaign_abi.json";
import { CAMPAIGN_CONTRACT_ADDRESS } from "../utils/data";
import { fetchContentFromIPFS } from "../utils/helper";
import Container from "../components/util/Container";

const page = () => {
  const [cursor, setCursor] = useState(null);
  const [reachedEnd, setReachedEnd] = useState<"more" | "end">("more");
  const [collections, setCollections] = useState<any[]>([]);
  const [cachedCollections, setCachedCollections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const provider = new RpcProvider({
    nodeUrl: "https://starknet-sepolia.public.blastapi.io",
  });

  let campaign_contract = new Contract(
    campaign_contract_abi,
    CAMPAIGN_CONTRACT_ADDRESS,
    provider
  );

  const fetchCampaigns = async () => {
    try {
      const campaigns = await campaign_contract.get_campaigns();
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
  useEffect(() => {
    window.scrollTo({ top: 0 });
    fetchCampaigns();
    return () => {};
  }, []);

  useEffect(() => {
    setCachedCollections((prev) => {
      const newCollections = collections.filter(
        (collection) =>
          !prev.some((item) => item.token_id === collection.token_id)
      );
      return [...prev, ...newCollections];
    });
    if (cursor === undefined) {
      setReachedEnd("end");
    }
  }, [collections]);

  return (
    <section className="min-h-screen">
      <Container className="mt-[5rem] py-10 px-4 md:px-10 lg:px-16">
        <h2 className="my-[5rem]">Browse Fundraisers</h2>

        <section
          id="fundraisers"
          className="grid gap-4  md:gap-8 lg:grid-cols-3 md:max-w-[800px] lg:max-w-none md:mx-auto  md:justify-center "
        >
          {loading
            ? Array.from({ length: 12 }).map((_, idx) => (
                <CardLoader key={idx} />
              ))
            : cachedCollections.map((nft, idx) => {
                const {
                  name,
                  image,
                  campaign_address,
                  id,
                  location,
                  cid,
                  target,
                } = nft || {};
                const path = name
                  .replace(/[^a-zA-Z ]/g, "")
                  .replace(/ /g, "-")
                  .toLocaleLowerCase()
                  .replace(/-+/g, "-");

                const url = `${path}/${campaign_address}/${cid}`;
                return (
                  <Card
                    causeName={name || "Unknown Cause"}
                    imageSrc={
                      `${
                        process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL
                      }${image.slice(7, -1)}?pinataGatewayToken=${
                        process.env.NEXT_PUBLIC_PINATA_API_KEY
                      }` || "/default-image.webp"
                    }
                    location={location}
                    target={target}
                    key={idx}
                    progress={43}
                    token_id={id}
                    campaign_address={campaign_address || "0x0"}
                    cid={cid}
                    url={url}
                  />
                );
              })}
        </section>
        <div className=" flex justify-center">
          <button
            disabled={reachedEnd === "end"}
            onClick={fetchCampaigns}
            className={`px-6 py-2 border-solid border-[1px] ml-10 mt-10 h-fit border-[#127C56]  rounded-[25px] ${
              reachedEnd === "end"
                ? "opacity-50 cursor-not-allowed"
                : "opacity-100 cursor-pointer"
            }`}
          >
            Show more
          </button>
        </div>
      </Container>
    </section>
  );
};

export default page;
