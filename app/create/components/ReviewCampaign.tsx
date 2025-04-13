import { AllFormFields } from "@/app/create/page";
import { Dialog, DialogContent, DialogTitle } from "@/app/ui/dialog";
import Image from "next/image";
import ProfileIcon from "@/svgs/ProfileIcon";
import CalenderIcon from "@/svgs/CalenderIcon";
import RightArrowIcon from "@/svgs/RightArrowIcon";
import { useEffect, useState } from "react";
import { Spinner } from "@/app/ui/spinner";
import Link from "next/link";

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

  return (
    <Dialog open={showReview} onOpenChange={setShowReview}>
      <DialogContent
        className={`max-h-[90vh] min-h-[70vh] w-[95vw] md:w-[85vw] lg:w-[75vw] xl:w-[65vw] 2xl:max-w-[1200px]`}
      >
        {!creatingCampaign ? (
          <div className="animate-fadeIn space-y-6 p-6">
            <div className="mx-auto flex max-w-[800px] flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:pr-8">
              <DialogTitle className="mt-8 pr-8 font-agrandir text-xl font-bold sm:mt-1 sm:text-2xl">
                Campaign Preview
              </DialogTitle>
              <button
                disabled={creatingCampaign}
                onClick={createCampaign}
                className="flex items-center justify-center rounded-[8px] bg-accent-green px-4 py-2 text-sm text-white transition-all duration-200 sm:w-auto"
              >
                {creatingCampaign ? <Spinner /> : "Mint Campaign"}
              </button>
            </div>

            <div className="max-h-[75vh] overflow-y-auto">
              <div className="mx-auto max-w-[800px] space-y-8">
                {imageUrls.length > 0 && (
                  <div className="relative h-48 w-full overflow-hidden rounded-lg sm:h-64">
                    <Image
                      src={imageUrls[0]}
                      alt="Campaign banner"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                <div className="space-y-8">
                  <h3 className="text-xl text-foreground-primary sm:text-2xl">
                    <span className="font-agrandir font-bold">Campaign </span>
                    <span className="font-normal">Highlights</span>
                  </h3>

                  <div>
                    <h4 className="mb-2 font-agrandir text-lg font-semibold">
                      {formData.name}
                    </h4>
                    <p className="leading-8 text-foreground-secondary">
                      {formData.description}
                    </p>
                    {formData.category && (
                      <div className="mt-2">
                        <span className="text-sm text-foreground-secondary">
                          Category:
                        </span>
                        <span className="ml-2 font-medium">
                          {formData.category}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="rounded-lg bg-[#F7F7F6] p-4">
                    <h4 className="mb-2 font-agrandir text-base font-bold">
                      Target Amount
                    </h4>
                    <p className="text-xl font-bold">{formData.target} STRK</p>
                  </div>

                  <div>
                    <h3 className="mb-6">Organizer and Beneficiary</h3>
                    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-2">
                        <div className="grid h-[40px] w-[40px] place-content-center rounded-full bg-[#F7F7F6]">
                          <ProfileIcon />
                        </div>
                        <div className="max-w-[180px]">
                          <p className="truncate text-base font-bold">
                            {formData.organiser}
                          </p>
                          <p>Organizer</p>
                        </div>
                      </div>
                      {formData.beneficiary && (
                        <>
                          <p className="hidden text-xl text-foreground-secondary sm:block">
                            <RightArrowIcon />
                          </p>
                          <div className="flex items-center gap-2">
                            <div className="grid h-[40px] w-[40px] place-content-center rounded-full bg-[#F7F7F6]">
                              <ProfileIcon />
                            </div>
                            <div className="max-w-[180px]">
                              <p className="truncate text-base font-bold">
                                {formData.beneficiary}
                              </p>
                              <p>Beneficiary</p>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                    <p className="flex items-center gap-2">
                      <span>
                        <CalenderIcon />
                      </span>{" "}
                      {currentDate}
                    </p>
                  </div>

                  {formData.location && (
                    <div className="rounded-lg bg-[#F7F7F6] p-4">
                      <h4 className="mb-2 font-agrandir text-base font-bold">
                        Location
                      </h4>
                      <p>{formData.location}</p>
                    </div>
                  )}
                </div>

                {(formData.socials || formData.customLinks) && (
                  <div className="space-y-4">
                    <h3 className="font-agrandir text-lg font-semibold">
                      Social Links
                    </h3>
                    <div className="grid gap-4 rounded-lg bg-[#F7F7F6] p-4">
                      {formData.socials &&
                        Object.entries(formData.socials).map(
                          ([name, url]) =>
                            url && (
                              <div key={name}>
                                <p className="text-sm capitalize text-foreground-secondary">
                                  {name}
                                </p>
                                <p className="break-all font-medium">{url}</p>
                              </div>
                            )
                        )}
                      {formData.customLinks &&
                        formData.customLinks.length > 0 && (
                          <div>
                            <p className="mb-2 text-sm text-foreground-secondary">
                              Additional Links
                            </p>
                            {formData.customLinks.map(
                              (link, index) =>
                                link.url && (
                                  <div key={index} className="mt-2">
                                    <p className="text-sm text-foreground-secondary">
                                      Website {index + 1}
                                    </p>
                                    <p className="break-all font-medium">
                                      {link.url}
                                    </p>
                                  </div>
                                )
                            )}
                          </div>
                        )}
                    </div>
                  </div>
                )}

                {imageUrls.length > 1 && (
                  <div>
                    <h4 className="mb-4 font-agrandir text-base font-bold text-foreground-primary/80">
                      More Images
                    </h4>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {imageUrls.slice(1).map((imageUrl, index) => (
                        <div
                          key={index}
                          className="relative h-[11rem] w-full overflow-clip rounded-[5px]"
                        >
                          <Image
                            src={imageUrl}
                            alt={`campaign image ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-center pt-4">
                  <button
                    onClick={() => setShowReview(false)}
                    className="rounded-[8px] border border-gray-300 px-6 py-2 text-sm text-foreground-secondary hover:bg-gray-50"
                  >
                    Edit Campaign
                  </button>
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
