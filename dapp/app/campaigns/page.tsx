"use client";
import { useEffect, useState } from "react";
import Card from "../components/Fundraiser/Card";
import CardLoader from "../components/loading/CardLoader";
import { COLLECTION_CONTRACT_ADDRESS } from "@/address";

const page = () => {
  const [cursor, setCursor] = useState(null);
  const [reachedEnd, setReachedEnd] = useState<"more" | "end">("more");
  const [collections, setCollections] = useState<any[]>([]);
  const [cachedCollections, setCachedCollections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCampaigns = async () => {
    const apiKey = process.env.NEXT_PUBLIC_ARK_API_KEY || "";

    const endpoint = `https://testnet-api.arkproject.dev/v1/tokens/${COLLECTION_CONTRACT_ADDRESS}?limit=24`;
    const cursorEndpoint = `https://testnet-api.arkproject.dev/v1/tokens/${COLLECTION_CONTRACT_ADDRESS}?cursor=${cursor}&limit=12`;

    try {
      const response = await fetch(cursor ? cursorEndpoint : endpoint, {
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
      setCursor(data.cursor);
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
    <section className="min-h-screen mt-[5rem] py-10 px-4 md:px-10 lg:px-16">
      <h2 className="my-[5rem]">Browse Fundraisers</h2>

      <section
        id="fundraisers"
        className="grid gap-4  md:gap-8 lg:grid-cols-3 md:max-w-[800px] lg:max-w-none md:mx-auto  md:justify-center "
      >
        {loading
          ? Array.from({ length: 12 }).map((_, idx) => <CardLoader key={idx} />)
          : cachedCollections.map((nft, idx) => {
              const { name, image } = nft.metadata?.normalized || {};
              const imageUrl = image?.replace("ipfs://", "");
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
    </section>
  );
};

export default page;
