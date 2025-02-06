"use client";
import { useEffect, useState } from "react";
import CardLoader from "../components/loading/CardLoader";
import { campaign_contract } from "../utils/data";
import { fetchCampaigns } from "../utils/helper";
import Container from "../components/util/Container";
import { H2 } from "../components/util/Headers";
import { Card } from "../components/Fundraiser/Card";

const page = () => {
  const [cursor, setCursor] = useState(null);
  const [reachedEnd, setReachedEnd] = useState<"more" | "end">("more");
  const [collections, setCollections] = useState<any[]>([]);
  const [cachedCollections, setCachedCollections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    fetchCampaigns(campaign_contract, setLoading, setCollections);
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
        <H2 style="my-[5rem]">Browse Fundraisers</H2>
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
      </Container>
    </section>
  );
};

export default page;
