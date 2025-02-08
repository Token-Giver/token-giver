"use client";
import CardLoader from "@/app/components/loading/CardLoader";
import { H3 } from "@/app/components/util/Headers";
import { fetchBalance, fetchDonationBalance } from "@/app/utils/helper";
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
  maxHeight = "max-h-[200px]"
}: {
  src: string;
  alt: string;
  cid: string;
  causeName: string;
  campaignAddress: string;
  target: string;
  maxHeight?: string;
}) => {
  const router = useRouter();
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    fetchDonationBalance(campaignAddress, setBalance);
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
      className="group flex cursor-pointer flex-col gap-4"
    >
      <div
        className={`h-[300px] w-full rounded-[10px] lg:flex-1 ${maxHeight} overflow-hidden`}
      >
        <Image
          className="h-full w-full rounded-[10px] object-cover object-center transition-all group-hover:scale-105"
          loader={() => image}
          src={image}
          alt={alt}
          width={400}
          height={400}
        />
      </div>

      <p className="line-clamp overflow-hidden capitalize">
        {causeName || "Unknown Cause"}
      </p>
      <div className="">
        <div className="relative mb-2 h-[.25rem] w-full">
          <div className="mb-4 h-[1vw] max-h-[.25rem] w-full rounded-full bg-[#127c5548]"></div>
          <div
            style={{
              width: width
            }}
            className={`absolute top-0 mb-4 h-[1vw] max-h-[.25rem] rounded-full bg-[#127C56]`}
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
  loading
}: {
  campaigns: Campaign[];
  loading: boolean;
}) => {
  return (
    <section className="mx-auto max-w-[40rem] lg:mx-0 lg:max-w-none">
      <H3 style="mb-4">Latest campaigns</H3>
      {loading ? (
        <div className="grid gap-4 md:mx-auto md:max-w-[800px] md:justify-center md:gap-8 lg:max-w-none lg:grid-cols-3">
          {Array.from({ length: 12 }).map((_, idx) => (
            <CardLoader key={idx} />
          ))}
        </div>
      ) : (
        campaigns.length > 0 && (
          <div className="gap-8 lg:grid lg:grid-cols-2">
            <CampaignCard
              alt=""
              causeName={campaigns[0].name || "Unknown Cause"}
              cid={campaigns[0].cid}
              src={campaigns[0].image}
              campaignAddress={campaigns[0].campaign_address || ""}
              target={campaigns[0].target}
              maxHeight="max-h-[520px]"
            />
            {campaigns.length >= 5 ? (
              <div className="gap-4 lg:grid lg:grid-cols-2">
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
              <div className="flex items-center justify-center text-theme-green">
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
