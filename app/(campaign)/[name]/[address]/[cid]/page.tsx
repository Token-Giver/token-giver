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
        <section className="mx-auto mt-[5rem] min-h-[40vh] max-w-[1204px] animate-fadeIn px-16 py-8">
          <h2 className="mb-6 font-agrandir text-3xl text-foreground-primary">
            {campaignDetails.name}
          </h2>
          <div className="text-foreground-primary">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <div className="grid h-[40px] w-[40px] place-content-center rounded-full bg-[#F7F7F6]">
                  <ProfileIcon />
                </div>
                <p>{campaignDetails.organizer}</p>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-foreground-secondary">category:</p>
                <div className="w-fit rounded-[25px] bg-[#F7F7F6] px-3 py-2 font-agrandir">
                  <p>Education</p>
                </div>
              </div>
              <p className="ml-auto mt-auto flex items-center gap-1">
                Share campaign{" "}
                <span>
                  <ShareIcon />
                </span>
              </p>
            </div>
            <div className="relative mb-8 mt-3 h-[31rem] rounded-[10px]">
              <Image
                className="h-full w-full rounded-[10px] bg-cover"
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
        <div className="mx-auto mt-[5rem] grid min-h-[40vh] max-w-[1204px] place-content-center px-16 py-8">
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
