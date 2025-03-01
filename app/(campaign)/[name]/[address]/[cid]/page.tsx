"use client";
import { fetchCampaign } from "@/app/utils/helper";
import ProfileIcon from "@/svgs/ProfileIcon";
import ShareIcon from "@/svgs/ShareIcon";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CampaignSlider from "../../../../components/Fundraiser/CampaignSlider";
import CampaignProgress from "./CampaignProgress";
import CampaignDetails from "./CampaignDetails";

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

const page = ({
  params
}: {
  params: { name: string; address: string; cid: string };
}) => {
  const router = useRouter();
  const [balance, setBalance] = useState(0);
  const [donationCount, setDonationCount] = useState(0);

  const donateNow = () => {
    if (params.address && params.cid) {
      const campaignAddress = params.address;
      const campaignName = params.name;
      const cid = params.cid;
      router.push(`/${campaignName}/${campaignAddress}/${cid}/donate`);
    }
  };

  const [campaignDetails, setCampaignDetails] = useState<CampaignDetails>({
    name: "",
    image: "/default-image.webp",
    description: "",
    date: "",
    organizer: "",
    beneficiary: "",
    location: "",
    target: "",
    address: ""
  });
  useEffect(() => {
    if (params.address && params.cid) {
      fetchCampaign(
        params.cid,
        setBalance,
        setDonationCount,
        setCampaignDetails,
        null
      );
    }
  }, [params]);
  const width = `${Math.min(
    (balance / parseInt(campaignDetails.target)) * 100,
    100
  )}%`;
  return (
    <>
      {campaignDetails.name ? (
        <section className="mx-auto mt-[5rem] min-h-[40vh] w-full animate-fadeIn lg:px-16 py-8">
          <h2 className="mb-6 font-agrandir whitespace-nowrap text-2xl md:text-3xl text-foreground-primary px-[16px]">
            {campaignDetails.name}
          </h2>
          <div className="text-foreground-primary">
            <div className="flex flex-col md:flex-row justify-start md:justify-between lg:items-center gap-4 px-[16px]">
              <div className="flex items-center whitespace-nowrap gap-2 w-auto">
                <div className="grid min-h-[40px] min-w-[40px] place-content-center rounded-full bg-[#F7F7F6]">
                  <ProfileIcon />
                </div>
                <p className="whitespace-nowrap">{campaignDetails.organizer}</p>
              </div>
              <div className=" w-full flex flex-col xs:flex-row xs:items-center justify-between flex-wrap">
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
            <div className="relative mb-8 mt-3 h-[389px] md:h-[31rem] md:rounded-[10px] max-w-[1204] md:mx-[16px] lg:mx-0 ">
              <Image
                className="h-full w-full md:rounded-[10px] bg-cover"
                loader={() => campaignDetails.image}
                src={campaignDetails.image}
                unoptimized
                priority
                fill
                alt={`${campaignDetails.name} banner image`}
              />
            </div>
          </div>
          <div className="flex flex-col-reverse lg:flex-row gap-4 px-[16px]">
            <CampaignDetails
              description={campaignDetails.description}
              organizer={campaignDetails.organizer}
              beneficiary={campaignDetails.beneficiary}
              date={campaignDetails.date}
              images={[
                "/default-image.webp",
                "/default-image.webp",
                "/default-image.webp",
                "/default-image.webp",
                "/default-image.webp"
              ]}
            />
            <CampaignProgress
              balance={balance}
              target={campaignDetails.target}
              location={campaignDetails.location}
              donationCount={donationCount}
              onDonate={donateNow}
            />
          </div>
        </section>
      ) : (
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
      )}
      <div className="mx-auto max-w-[1204px] space-y-4 px-[20px]">
        <h3 className="text-2xl text-foreground-primary px-[16px]">
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
