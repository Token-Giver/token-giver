import { AllFormFields } from "@/app/create/page";
import { Dialog, DialogContent, DialogTitle } from "@/app/ui/dialog";
import Image from "next/image";
import ProfileIcon from "@/svgs/ProfileIcon";
import { useEffect, useState } from "react";
import { Spinner } from "@/app/ui/spinner";
import Link from "next/link";
import ReviewCampaignDetails from "./ReviewCampaignDetails";
import ReviewCampaignProgress from "./ReviewCampaignProgress";

const ReviewCampaign = ({
  setShowReview,
  showReview,
  formData,
  createCampaign,
  creatingCampaign,
  loadingPercentage
}: {
  setShowReview: (value: React.SetStateAction<boolean>) => void;
  showReview: boolean;
  formData: AllFormFields;
  createCampaign: () => void;
  creatingCampaign: boolean;
  loadingPercentage: number;
}) => {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  const getImageArray = () => {
    const images = [];

    if (formData.bannerImage && formData.bannerImage instanceof File) {
      images.push(URL.createObjectURL(formData.bannerImage));
    }

    if (formData.additionalImages && formData.additionalImages.length > 0) {
      Array.from(formData.additionalImages).forEach((image) => {
        images.push(URL.createObjectURL(image));
      });
    }

    return images;
  };

  const [imageUrls, setImageUrls] = useState<string[]>([]);

  useEffect(() => {
    if (showReview) {
      setImageUrls(getImageArray());
    }

    return () => {
      imageUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [showReview, formData.bannerImage, formData.additionalImages]);

  const width = `${loadingPercentage}%`;

  const links = {
    ...formData.socials,
    ...Object.fromEntries(
      formData.customLinks?.map((link, index) => [
        `website${index + 1}`,
        link.url
      ]) || []
    )
  };

  return (
    <Dialog open={showReview} onOpenChange={setShowReview}>
      <DialogContent className="h-screen w-screen max-w-none rounded-none sm:max-w-none">
        {!creatingCampaign ? (
          <div className="z-[10] mx-auto max-h-[99vh] w-full max-w-[1204px] animate-fadeIn overflow-y-auto pb-40 pt-16 md:px-16 md:pb-20">
            <h2 className="mb-6 break-words px-4 font-agrandir text-2xl text-foreground-primary lg:text-3xl">
              {formData.name}
            </h2>
            <div className="text-foreground-primary">
              <div className="flex flex-col justify-start gap-4 px-[16px] md:flex-row md:justify-between lg:items-center">
                <div className="flex w-auto items-center gap-2 whitespace-nowrap">
                  <div className="grid min-h-[40px] min-w-[40px] place-content-center rounded-full bg-[#F7F7F6]">
                    <ProfileIcon />
                  </div>
                  <p className="whitespace-nowrap">{formData.organiser}</p>
                </div>
                <div className="flex w-full flex-col flex-wrap justify-between xs:flex-row xs:items-center">
                  <div className="flex items-center gap-2">
                    <p className="text-foreground-secondary">category:</p>
                    <p className="font-semibold">Education</p>
                  </div>
                </div>
              </div>
              <div className="relative z-[9] mb-8 mt-3 h-[389px] max-w-[1204px] overflow-hidden md:mx-[16px] md:h-[31rem] md:rounded-[10px] lg:mx-0">
                <div
                  className="absolute inset-0 scale-110 bg-cover bg-center blur-xl"
                  style={{ backgroundImage: `url(${imageUrls[0]})` }}
                />

                <Image
                  className="relative h-full w-full object-contain md:rounded-[10px]"
                  loader={() => imageUrls[0]}
                  src={imageUrls[0]}
                  unoptimized
                  priority
                  fill
                  alt={`${formData.name} banner image`}
                />
              </div>
            </div>
            <div className="flex flex-col-reverse gap-4 px-4 md:px-[16px] lg:flex-row">
              <ReviewCampaignDetails
                description={formData.description}
                organizer={formData.organiser}
                beneficiary={formData.beneficiary}
                date={currentDate}
                images={imageUrls.slice(1)}
                socialLinks={links}
              />
              <ReviewCampaignProgress
                balance={0}
                target={formData.target}
                location={formData.location}
                donationCount={0}
                socialLinks={links}
              />
              <div className="fixed bottom-0 left-1/2 flex w-full -translate-x-1/2 justify-between bg-white py-4">
                <div className="mx-auto flex w-full max-w-[1204px] flex-col justify-between gap-2 px-4 md:flex-row md:items-center">
                  <DialogTitle className="m-0 font-agrandir text-xl font-bold sm:mt-1 sm:text-2xl">
                    Campaign Preview
                  </DialogTitle>
                  <div className="flex flex-wrap justify-between gap-2 md:justify-normal">
                    <button
                      onClick={() => setShowReview(false)}
                      className="flex w-full justify-center rounded-[8px] border border-gray-300 px-6 py-2 text-sm text-foreground-primary hover:bg-gray-50 sm:w-auto"
                    >
                      Edit Campaign
                    </button>
                    <button
                      disabled={creatingCampaign}
                      onClick={createCampaign}
                      className="flex w-full items-center justify-center rounded-[8px] bg-accent-green px-4 py-2 text-sm text-white transition-all duration-200 sm:w-auto"
                    >
                      {creatingCampaign ? <Spinner /> : "Mint Campaign"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex animate-fadeIn flex-col items-center gap-4">
            <Image width={100} height={100} src="/minting.png" alt="" />
            <h2 className="font-agrandir text-foreground-primary">
              Minting your campaign
            </h2>

            <div className="w-full max-w-[28rem]">
              <div className="relative mb-2 h-[5px] w-full overflow-hidden rounded-full bg-[#EFEFEF]">
                <div
                  style={{ width: width }}
                  className="absolute left-0 top-0 h-full rounded-full bg-accent-green"
                ></div>
              </div>
            </div>

            <p className="text-foreground-secondary">
              Hang tight! Your campaign is being minted. This may take a few
              moments.
            </p>
          </div>
        )}
        {!createCampaign && loadingPercentage === 100 && (
          <div className="flex h-[70vh] animate-fadeIn flex-col">
            <div className="h-[200px]">
              <Image
                src={"/minting-set.png"}
                alt="donation sent"
                width={900}
                height={288}
                className=""
              />
            </div>
            <div className="flex flex-1 flex-col justify-between gap-8 p-8">
              <DialogTitle srOnly>Campaign Minted</DialogTitle>

              <div className="flex flex-1 flex-col justify-center space-y-4 text-center">
                <h2 className="font-agrandir text-foreground-primary">
                  Campaign Minted
                </h2>
                <div className="mx-auto w-full max-w-[35rem]">
                  <div className="relative mb-2 h-[5px] w-full overflow-hidden rounded-full bg-[#EFEFEF]">
                    <div
                      style={{ width: "100%" }}
                      className="absolute left-0 top-0 h-full rounded-full bg-accent-green"
                    ></div>
                  </div>
                </div>
                <p className="text-center text-foreground-secondary">
                  Congratulations! Your campaign has been successfully minted
                </p>
              </div>

              <Link
                href={"/search"}
                className="inline-block w-full rounded-[10px] bg-[#F5F5F5] px-6 py-3 text-center text-accent-green"
              >
                View Campaigns
              </Link>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ReviewCampaign;
