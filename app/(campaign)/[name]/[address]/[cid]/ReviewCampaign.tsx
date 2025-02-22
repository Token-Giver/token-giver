import { AllFormFields } from "@/app/create/page";
import { Dialog, DialogContent, DialogTitle } from "@/app/ui/dialog";
import Image from "next/image";
import ProfileIcon from "@/svgs/ProfileIcon";
import CalenderIcon from "@/svgs/CalenderIcon";
import RightArrowIcon from "@/svgs/RightArrowIcon";
import { useEffect, useState } from "react";

const ReviewCampaign = ({
  setShowReview,
  showReview,
  formData,
  createCampaign
}: {
  setShowReview: (value: React.SetStateAction<boolean>) => void;
  showReview: boolean;
  formData: AllFormFields;
  createCampaign: () => void;
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

    // Cleanup URLs when component unmounts
    return () => {
      imageUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [showReview, formData.bannerImage, formData.additionalImages]);

  return (
    <Dialog open={showReview} onOpenChange={setShowReview}>
      <DialogContent className="max-h-[90vh] max-w-[95vw] p-6 md:max-w-[80vw] lg:max-w-[65vw]">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <DialogTitle className="font-agrandir text-2xl font-bold">
              Campaign Preview
            </DialogTitle>
            <button
              onClick={createCampaign}
              className="rounded-[8px] bg-accent-green px-4 py-2 text-sm text-white"
            >
              Mint Campaign
            </button>
          </div>

          <div className="max-h-[75vh] overflow-y-auto">
            <div className="mx-auto max-w-[602px] space-y-8">
              {imageUrls.length > 0 && (
                <div className="relative h-48 w-full overflow-hidden rounded-lg">
                  <Image
                    src={imageUrls[0]}
                    alt="Campaign banner"
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <div className="space-y-8">
                <h3 className="text-2xl text-foreground-primary">
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
                  <div className="mb-8 flex items-center justify-between">
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
                        <p className="text-xl text-foreground-secondary">
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

                {/* Location */}
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
                              <p className="font-medium">{url}</p>
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
                                  <p className="font-medium">{link.url}</p>
                                </div>
                              )
                          )}
                        </div>
                      )}
                  </div>
                </div>
              )}

              {/* Additional Images */}
              {imageUrls.length > 1 && (
                <div>
                  <h4 className="mb-4 font-agrandir text-base font-bold text-foreground-primary/80">
                    More Images
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {imageUrls.slice(1, 5).map((imageUrl, index) => (
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
                        {index === 3 && imageUrls.length > 5 && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                            <span className="font-agrandir text-2xl text-white">
                              +{imageUrls.length - 5}
                            </span>
                          </div>
                        )}
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
      </DialogContent>
    </Dialog>
  );
};

export default ReviewCampaign;
