"use client";
import ProfileIcon from "@/svgs/ProfileIcon";
import ShareIcon from "@/svgs/ShareIcon";
import Image from "next/image";
import { useState } from "react";

import CampaignProgress from "./CampaignProgress";
import CampaignDetails from "./CampaignDetails";
import CampaignSlider from "@/app/components/Fundraiser/CampaignSlider";
import { useQuery } from "@apollo/client";
import { GET_CAMPAIGN_BY_ID } from "@/graphql/queries";
import { ICampaign } from "@/types/campaigns";

interface CampaignDetails {
  name: string;
  image: string;
  description: string;
  date: string;
  organizer: string;
  beneficiary: string;
  location: string;
  target: string;
  address: string;
}

const page = ({ params }: { params: { name: string; cid: string } }) => {
  const [balance, setBalance] = useState(0);

  const { data, loading } = useQuery(GET_CAMPAIGN_BY_ID, {
    variables: {
      campaignId: Number(params.cid)
    }
  });
  const campaign: ICampaign = data?.getCampaignById;

  return (
    <>
      {loading ? (
        <div className="mx-auto mt-[5rem] grid min-h-[40vh] max-w-[1204px] place-content-center py-8">
          <Image
            alt="loading"
            src={"/logo-sm.png"}
            role="progressbar"
            width={200}
            height={200}
            className="animate-zoom-loading"
          />
        </div>
      ) : (
        <section className="mx-auto mt-[5rem] min-h-[40vh] w-full max-w-[1204px] animate-fadeIn py-8 lg:px-16">
          <h2 className="mb-6 whitespace-nowrap px-[16px] font-agrandir text-2xl text-foreground-primary md:text-3xl">
            {campaign.campaign_name}
          </h2>
          <div className="text-foreground-primary">
            <div className="flex flex-col justify-start gap-4 px-[16px] md:flex-row md:justify-between lg:items-center">
              <div className="flex w-auto items-center gap-2 whitespace-nowrap">
                <div className="grid min-h-[40px] min-w-[40px] place-content-center rounded-full bg-[#F7F7F6]">
                  <ProfileIcon />
                </div>
                <p className="whitespace-nowrap">{campaign.organizer}</p>
              </div>
              <div className="flex w-full flex-col flex-wrap justify-between xs:flex-row xs:items-center">
                <div className="flex items-center gap-2">
                  <p className="text-foreground-secondary">category:</p>
                  <p className="font-semibold">Education</p>
                </div>
                <button className="ml-auto flex items-center gap-1 transition-all hover:text-accent-green">
                  Share campaign <ShareIcon />
                </button>
              </div>
            </div>
            <div className="relative mb-8 mt-3 h-[389px] max-w-[1204px] overflow-hidden md:mx-[16px] md:h-[31rem] md:rounded-[10px] lg:mx-0">
              <div
                className="absolute inset-0 scale-110 bg-cover bg-center blur-xl"
                style={{ backgroundImage: `url(${campaign.cover_photo})` }}
              />

              <Image
                className="relative h-full w-full object-contain md:rounded-[10px]"
                loader={() => campaign.cover_photo}
                src={campaign.cover_photo}
                unoptimized
                priority
                fill
                alt={`${campaign.campaign_name} banner image`}
              />
            </div>
          </div>
          <div className="flex flex-col-reverse gap-4 px-[16px] lg:flex-row">
            <CampaignDetails
              description={campaign.campaign_description}
              organizer={campaign.organizer}
              beneficiary={campaign.beneficiary}
              date={campaign.created_at}
              images={campaign.campaign_images}
            />
            <CampaignProgress
              balance={balance}
              target={campaign.target_amount}
              location={campaign.location}
              donationCount={campaign.total_donations}
            />
          </div>
        </section>
      )}
      <div className="mx-auto max-w-[1204px] space-y-4 px-[20px]">
        <h3 className="px-[16px] text-2xl text-foreground-primary">
          <span className="font-agrandir font-bold">Make a Difference.</span>{" "}
          <span className="font-normal">See Similar Campaigns</span>{" "}
          <span className="font-agrandir font-bold">like This </span>
        </h3>
      </div>
      <CampaignSlider />
    </>
  );
};

export default page;
