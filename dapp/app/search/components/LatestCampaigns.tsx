"use client";
import Card from "@/app/components/Fundraiser/Card";
import CardLoader from "@/app/components/loading/CardLoader";
import { H3 } from "@/app/components/util/Headers";
import { fetchBalance } from "@/app/utils/helper";
import Logo from "@/svgs/Logo";
import { Campaign } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CampaignCard = ({
  alt,
  causeName,
  src,
  campaignAddress,
  target,
  cid,
}: {
  src: string;
  alt: string;
  cid: string;
  causeName: string;
  campaignAddress: string;
  target: string;
}) => {
  const router = useRouter();
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    fetchBalance(campaignAddress, setBalance);
  }, []);
  const width = `${Math.min((balance / parseInt(target)) * 100, 100)}%`;
  const image =
    `${process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL}${src?.slice(
      7,
      -1
    )}?pinataGatewayToken=${process.env.NEXT_PUBLIC_PINATA_API_KEY}` ||
    "/default-image.webp";

  const handleRoute = () => {
    const path = causeName
      .replace(/[^a-zA-Z ]/g, "")
      .replace(/ /g, "-")
      .toLocaleLowerCase()
      .replace(/-+/g, "-");

    const url = `${path}/${campaignAddress}/${cid}`;
    router.push(url);
  };
  return (
    <div
      onClick={handleRoute}
      className="flex flex-col gap-4 cursor-pointer group"
    >
      <div className="w-full h-[300px] rounded-[10px] lg:flex-1  overflow-hidden">
        <Image
          className="rounded-[10px] w-full h-full object-cover object-center group-hover:scale-105  transition-all"
          loader={() => image}
          src={image}
          alt={alt}
          width={400}
          height={400}
        />
      </div>
      <p>{causeName || "Unknown Cause"}</p>
      <div className="">
        <div className="w-full h-[.25rem] mb-2 relative">
          <div className="w-full h-[1vw] max-h-[.25rem] bg-[#127c5548] rounded-full mb-4"></div>
          <div
            style={{
              width: width,
            }}
            className={`h-[1vw] max-h-[.25rem] bg-[#127C56] rounded-full mb-4 top-0 absolute`}
          ></div>
        </div>
        <div className="flex justify-between px-2 text-[.875rem]">
          <p>{balance} STRK raised</p>
        </div>
      </div>
    </div>
  );
};

const LatestCampaigns = ({
  campaigns,
  loading,
}: {
  campaigns: Campaign[];
  loading: boolean;
}) => {
  return (
    <section className=" max-w-[40rem]  mx-auto lg:mx-0 lg:max-w-none">
      <H3 style="mb-4">Latest campaigns</H3>
      {loading ? (
        <div className="grid gap-4  md:gap-8 lg:grid-cols-3 md:max-w-[800px] lg:max-w-none md:mx-auto  md:justify-center">
          {Array.from({ length: 12 }).map((_, idx) => (
            <CardLoader key={idx} />
          ))}
        </div>
      ) : (
        campaigns.length > 0 && (
          <div className="lg:grid lg:grid-cols-2 gap-8 lg:h-[70svh]">
            <CampaignCard
              alt=""
              causeName={campaigns[0].name || "Unknown Cause"}
              cid={campaigns[0].cid}
              src={campaigns[0].image}
              campaignAddress={campaigns[0].campaign_address || ""}
              target={campaigns[0].target}
            />
            {campaigns.length >= 5 ? (
              <div className="lg:grid lg:grid-cols-2 gap-4">
                <CampaignCard
                  alt=""
                  causeName={campaigns[1].name || "Unknown Cause"}
                  cid={campaigns[1].cid}
                  src={campaigns[1].image}
                  campaignAddress={campaigns[1].campaign_address || ""}
                  target={campaigns[1].target}
                />

                <CampaignCard
                  alt=""
                  causeName={campaigns[2].name || "Unknown Cause"}
                  cid={campaigns[2].cid}
                  src={campaigns[2].image}
                  campaignAddress={campaigns[2].campaign_address || ""}
                  target={campaigns[2].target}
                />
                <CampaignCard
                  alt=""
                  causeName={campaigns[3].name || "Unknown Cause"}
                  cid={campaigns[3].cid}
                  src={campaigns[3].image}
                  campaignAddress={campaigns[3].campaign_address || ""}
                  target={campaigns[3].target}
                />
                <CampaignCard
                  alt=""
                  causeName={campaigns[4].name || "Unknown Cause"}
                  cid={campaigns[4].cid}
                  src={campaigns[4].image}
                  campaignAddress={campaigns[4].campaign_address || ""}
                  target={campaigns[4].target}
                />
              </div>
            ) : (
              <div className="text-theme-green flex items-center justify-center">
                <Logo />
              </div>
            )}
          </div>
        )
      )}
    </section>
  );
};

export default LatestCampaigns;
