"use client";
import CardLoader from "@/app/components/loading/CardLoader";
import Container from "@/app/components/util/Container";
import { fetchUserCampaigns } from "@/app/utils/helper";
import { useAccount } from "@starknet-react/core";
import { useEffect, useState } from "react";
import WarningIcon from "@/svgs/WarningIcon";
import { Card } from "@/app/components/Fundraiser/Card";

const page = () => {
  const { address } = useAccount();
  const [collections, setCollections] = useState<any[]>([]);
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (address) {
      setConnected(true);
      fetchUserCampaigns(address, setCollections, setLoading);
    } else {
      setConnected(false);
      setCollections([]);
    }
  }, [address]);

  return (
    <section className="min-h-[100svh] px-4 py-[5rem] lg:px-[10vw]">
      <Container className="flex flex-col gap-8">
        {!address || !connected ? (
          <h2>Connect to see your campaigns</h2>
        ) : (
          <h2>Your current campaigns</h2>
        )}
        <div className="grid gap-4 md:mx-auto md:max-w-[800px] md:justify-center md:gap-8 lg:max-w-none lg:grid-cols-3">
          {loading && address && connected
            ? Array.from({ length: 3 }).map((_, idx) => (
                <CardLoader key={idx} />
              ))
            : collections.map((data, idx) => {
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
                    url={`/campaign/${address}/${data.cid}`}
                  />
                );
              })}
        </div>
        {address && collections.length === 0 && (
          <p className="flex items-center gap-1">
            <span>
              <WarningIcon />
            </span>
            <span>You do not have any campaigns. Try creating one</span>
          </p>
        )}
      </Container>
    </section>
  );
};

export default page;
