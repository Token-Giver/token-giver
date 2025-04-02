"use client";
import ProfileIcon from "@/svgs/ProfileIcon";
import ShareIcon from "@/svgs/ShareIcon";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import CampaignProgress from "./CampaignProgress";
import CampaignDetails from "./CampaignDetails";
import CampaignSlider from "@/app/components/Fundraiser/CampaignSlider";
import { useQuery } from "@apollo/client";
import { GET_CAMPAIGN_BY_ID } from "@/graphql/queries";

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
  const router = useRouter();
  const [balance, setBalance] = useState(0);

  const donateNow = () => {
    if (params.name && params.cid) {
      const campaignName = params.name;
      const cid = params.cid;
      router.push(`/${campaignName}/${cid}/donate`);
    }
  };

  const { data, loading } = useQuery(GET_CAMPAIGN_BY_ID, {
    variables: {
      campaignId: Number(params.cid)
    }
  });
  const campaign = data?.getCampaignById;

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
        <section className="mx-auto mt-[5rem] min-h-[40vh] w-full animate-fadeIn py-8 lg:px-16">
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
                  <div className="w-fit rounded-[25px] bg-[#F7F7F6] px-3 py-2 font-agrandir">
                    <p>Education</p>
                  </div>
                </div>
                <p className="ml-auto flex items-center gap-1">
                  Share campaign{" "}
                  <span>
                    <ShareIcon />
                  </span>
                </p>
              </div>
            </div>
            <div className="relative mb-8 mt-3 h-[389px] max-w-[1204px] md:mx-[16px] md:h-[31rem] md:rounded-[10px] lg:mx-0">
              <Image
                className="h-full w-full bg-cover md:rounded-[10px]"
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
              onDonate={donateNow}
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
