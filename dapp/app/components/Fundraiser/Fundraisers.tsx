"use client";
import { useEffect, useState } from "react";
import Card from "./Card";
import CardLoader from "@/app/loading/CardLoader";
import { useRouter } from "next/navigation";
import { COLLECTION_CONTRACT_ADDRESS } from "@/address";

const Fundraisers = () => {
  const router = useRouter();
  const [collections, setCollections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const handleRouteToCampaigns = () => {
    router.push("/campaigns");
  };
  useEffect(() => {
    const fetchCampaigns = async () => {
      const apiKey = process.env.NEXT_PUBLIC_ARK_API_KEY || "";
      const endpoint = `https://testnet-api.arkproject.dev/v1/tokens/${COLLECTION_CONTRACT_ADDRESS}?limit=12`;

      try {
        const response = await fetch(endpoint, {
          method: "GET",
          headers: {
            "x-api-key": apiKey,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCollections(data.result);
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
          : collections.map((nft, idx) => {
              const { name, image } = nft.metadata?.normalized || {};
              const imageUrl = image.replace("ipfs://", "");
              const { contract_address, token_id } = nft || {};
              return (
                <Card
                  causeName={name || "Unknown Cause"}
                  imageSrc={
                    `https://ipfs.io/ipfs/${imageUrl}` || "/default-image.webp"
                  }
                  location="Abuja,Nigeria"
                  key={idx}
                  progress={43}
                  token_id={token_id}
                  contract_address={contract_address}
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
