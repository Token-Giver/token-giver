"use client";
import { fetchCampaign } from "@/app/utils/helper";
import ProfileIcon from "@/svgs/ProfileIcon";
import ShareIcon from "@/svgs/ShareIcon";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CampaignSlider from "./CampaignSlider";
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
  params,
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
    address: "",
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
        <section className="min-h-[40vh] max-w-[1204px] mx-auto px-16 py-8 mt-[5rem]">
          <h2 className="text-foreground-primary mb-6 font-agrandir text-3xl">
            {campaignDetails.name}
          </h2>
          <div className="text-foreground-primary">
            <div className="flex gap-8 items-center">
              <div className="flex gap-2 items-center">
                <div className="h-[40px] grid place-content-center w-[40px] rounded-full bg-[#F7F7F6]">
                  <ProfileIcon />
                </div>
                <p>{campaignDetails.organizer}</p>
              </div>
              <div className="flex gap-2 items-center">
                <p className="text-foreground-secondary">category:</p>
                <div className="px-3 font-agrandir w-fit py-2 rounded-[25px] bg-[#F7F7F6]">
                  <p>Education</p>
                </div>
              </div>
              <p className="mt-auto flex items-center gap-1 ml-auto">
                Share campaign{" "}
                <span>
                  <ShareIcon />
                </span>
              </p>
            </div>
            <div className="h-[31rem] mt-3 rounded-[10px] mb-8 relative">
              <Image
                className="rounded-[10px] bg-cover h-full w-full"
                loader={() => campaignDetails.image}
                src={campaignDetails.image}
                unoptimized
                priority
                fill
                alt={`${campaignDetails.name} banner image`}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <CampaignDetails
              description={campaignDetails.description}
              organizer={campaignDetails.organizer}
              beneficiary={campaignDetails.beneficiary}
              date={campaignDetails.date}
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
        <div className="min-h-[40vh]  grid place-content-center max-w-[1204px] mx-auto px-16 py-8 mt-[5rem]">
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
      <CampaignSlider />
    </>
  );
};

export default page;
