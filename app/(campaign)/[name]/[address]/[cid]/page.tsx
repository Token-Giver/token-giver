"use client";
import CampaignLoader from "@/app/components/loading/CampaignLoader";
import { fetchCampaign, fetchContentFromIPFS } from "@/app/utils/helper";
import CalenderIcon from "@/svgs/CalenderIcon";
import DonateIcon from "@/svgs/DonateIcon";
import ProfileIcon from "@/svgs/ProfileIcon";
import ShareIcon from "@/svgs/ShareIcon";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Container from "@/app/components/util/Container";
import { H2 } from "@/app/components/util/Headers";
import HeroRibbon from "./components/HeroRibbon";
import { Campaign } from "@/types";
import Icon from "@/app/components/icons/icon";
import moment from "moment";
import WhyTokenGiver from "@/app/components/WhyTokenGiver";
import DonateBanner from "@/app/components/DonateBanner";
import { CampaignCard } from "@/app/components/CampaignCard";

const page = ({
  params,
}: {
  params: { name: string; address: string; cid: string };
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [campaignDetails, setCampaignDetails] = useState<Campaign | null>(null);

  const donateNow = () => {
    if (params.address && params.cid) {
      const campaignAddress = params.address;
      const campaignName = params.name;
      const cid = params.cid;
      router.push(`/${campaignName}/${campaignAddress}/${cid}/donate`);
    }
  };

  useEffect(() => {
    if (params.address && params.cid) {
      setIsLoading(true);
      fetchContentFromIPFS(params.cid)
        .then(
          (campaignDetails) =>
            campaignDetails && setCampaignDetails(campaignDetails)
        )
        .finally(() => setIsLoading(false));
    }
  }, [params]);

  const campaignImage = useMemo(() => {
    const imageUrl = campaignDetails?.image.slice(7, -1);
    return imageUrl
      ? `${process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL}${imageUrl}?pinataGatewayToken=${process.env.NEXT_PUBLIC_PINATA_API_KEY}`
      : "/default-image.webp";
  }, [campaignDetails]);

  if (isLoading) return <CampaignLoader />;

  if (campaignDetails)
    return (
      <>
        <div className="max-w-[1312px] mx-auto">
          <HeroRibbon
            campaign={campaignDetails}
            address={params.address}
            handleDonate={donateNow}
          />
          <div className="max-w-[720px] mx-auto mb-44 px-5">
            <h1 className="text-center text-3xl font-bold mb-6">
              {campaignDetails.name}
            </h1>
            <div className="rounded-lg h-[400px] relative w-full object-contain mx-auto">
              <Image
                className="rounded-lg h-full w-full"
                loader={() => campaignImage}
                src={campaignImage}
                unoptimized
                priority
                fill
                alt=""
              />
            </div>

            <div className="flex items-center gap-4 py-6 border-b border-tkg-gray-300 mb-6">
              <Icon name="logo_sm" />
              <p>
                {campaignDetails.organizer} is organizing this fundraiser on
                behalf of {campaignDetails.beneficiary}
              </p>
            </div>

            <div className="flex items-center gap-10 mb-7 justify-center">
              <button
                className="bg-tkg-primary text-white py-3 px-6 rounded-full max-h-11 leading-none"
                onClick={donateNow}
              >
                Donate
              </button>
              <button className="border border-black py-3 px-6 rounded-full text-black max-h-11 leading-none">
                Share
              </button>
            </div>

            <div className="mb-10">
              <h1 className="pb-2 border-b border-tkg-gray-300 text-[24px] font-bold leading-8 mb-4">
                Detail
              </h1>
              <p className="text-sm leading-6">{campaignDetails.description}</p>
            </div>
            <div className="mb-10">
              <h1 className="pb-2 border-b border-tkg-gray-300 text-[24px] font-bold leading-8 mb-7">
                Organiser
              </h1>
              <div className="flex md:w-4/5 gap-x-4 justify-between">
                <div className="flex gap-2.5">
                  <Icon name="logo_sm" />
                  <div>
                    <h1 className="font-medium text-[22px] leading-7">
                      {campaignDetails.organizer}
                    </h1>
                    <span className="mb-10 mt-2 block">Organiser</span>
                    <button className="border border-black py-3 px-6 rounded-full text-black max-h-11 leading-none">
                      Connect
                    </button>
                  </div>
                </div>
                <Icon name="right_arrow_in_square" />
                <div className="flex gap-2.5">
                  <Icon name="logo_sm" />
                  <div>
                    <h1 className="font-medium text-[22px] leading-7">
                      {campaignDetails.beneficiary}
                    </h1>
                    <span className="mb-10 mt-2 block">Beneficiary</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-10">
              <h1 className="pb-2 border-b border-tkg-gray-300 text-[24px] font-bold leading-8 mb-4">
                Word of support
              </h1>
              <p className="mb-4">Please donate to share words of support.</p>
              <p className="text-sm leading-6">
                Even I'm am sick and suffering a lot right now I dicide to make
                a donation to this lovely family and I wanna wish them from the
                bottom of my heart Recovery ( I know verry well what means
                suffering)❤️ if you can help my gofundme page too please with a
                small Donation( I'm really suffering). Love you all and happy
                holidays
              </p>
            </div>
            <h1 className="py-2 border-y border-tkg-gray-300">
              Created {moment(campaignDetails.created_at).fromNow()}
            </h1>
          </div>
          <div className="mb-36 px-5">
            <h1 className="text-[24px] font-bold leading-8 mb-10">
              Browse ongoing campaigns
            </h1>
            <div className="mb-20 flex gap-7 items-center flex-wrap gap-y-2">
              <button className="border border-black py-3 px-6 rounded-full text-black max-h-11 leading-none">
                All
              </button>
              <button className="border border-black py-3 px-6 rounded-full text-black max-h-11 leading-none">
                category 1
              </button>
              <button className="border border-black py-3 px-6 rounded-full text-black max-h-11 leading-none">
                category 2
              </button>
              <button className="border border-black py-3 px-6 rounded-full text-black max-h-11 leading-none">
                category 3
              </button>
              <button className="border border-black py-3 px-6 rounded-full text-black max-h-11 leading-none">
                category 4
              </button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-24 gap-y-20">
              <CampaignCard />
              <CampaignCard />
              <CampaignCard />
              <CampaignCard />
              <CampaignCard />
              <CampaignCard />
            </div>
          </div>
        </div>
        <WhyTokenGiver />
        <DonateBanner handleDonate={donateNow} />
      </>
    );
};

export default page;
