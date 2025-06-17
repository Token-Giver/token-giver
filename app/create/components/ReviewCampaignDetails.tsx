import ViewModalImage from "@/app/components/viewImageModal";
import CalenderIcon from "@/svgs/CalenderIcon";
import ProfileIcon from "@/svgs/ProfileIcon";
import RightArrowIcon from "@/svgs/RightArrowIcon";
import React, { useEffect, useRef, useState } from "react";
import ReviewMoreInfo from "./ReviewMoreInfo";
import { DialogContent, DialogTitle, Dialog } from "@/app/ui/dialog";

const ReviewCampaignDetails = ({
  organizer,
  date,
  description,
  beneficiary,
  images,
  socialLinks
}: {
  organizer: string;
  description: string;
  beneficiary: string;
  date: string;
  images: string[];
  socialLinks: { [key: string]: string };
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const element = descriptionRef.current;
    if (element) {
      setIsTruncated(element.scrollHeight > element.clientHeight);
    }
  }, [description]);
  return (
    <div className="max-w-[602px] space-y-8">
      <div className="space-y-8">
        <h3 className="text-2xl text-foreground-primary">
          <span className="font-agrandir font-bold">Campaign </span>
          <span className="font-normal">Highlights</span>
        </h3>
        <div>
          <p
            ref={descriptionRef}
            className="line-clamp-[20] leading-8 text-foreground-secondary"
          >
            {description}
          </p>
          {isTruncated && (
            <button
              onClick={() => setIsOpen(true)}
              className="mt-2 text-sm text-accent-green hover:underline"
            >
              Read More
            </button>
          )}
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="max-h-[80vh] p-6">
            <DialogTitle className="font-agrandir text-2xl font-bold">
              Campaign Description
            </DialogTitle>
            <div className="max-h-[70vh] overflow-y-auto">
              <p className="leading-8 text-foreground-secondary">
                {description}
              </p>
            </div>
          </DialogContent>
        </Dialog>
        <div className="lg:hidden">
          <ReviewMoreInfo socialLinks={socialLinks} />
        </div>

        <div>
          <h3 className="mb-6">Organizer and Beneficiary</h3>
          <div className="mb-8 flex flex-col items-start justify-between space-y-[10px] lg:flex-row lg:items-center lg:space-y-0">
            <div className="flex items-center gap-2">
              <div className="grid h-[40px] w-[40px] place-content-center rounded-full bg-[#F7F7F6]">
                <ProfileIcon />
              </div>
              <div className="max-w-[180px]">
                <p className="truncate text-base font-bold">{organizer}</p>

                <p>Organizer</p>
              </div>
            </div>
            {beneficiary && (
              <>
                <p className="ml-[7rem] rotate-90 text-xl text-foreground-secondary lg:ml-0 lg:rotate-0">
                  <RightArrowIcon />
                </p>
                <div className="flex items-center gap-2">
                  <div className="grid h-[40px] w-[40px] place-content-center rounded-full bg-[#F7F7F6]">
                    <ProfileIcon />
                  </div>
                  <div className="max-w-[180px]">
                    <p className="truncate text-base font-bold">
                      {beneficiary}
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
            {new Date(date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric"
            })}
          </p>
        </div>
      </div>
      <div>
        <h4 className="mb-4 font-agrandir text-base font-bold text-foreground-primary/80">
          More Images
        </h4>
        <ViewModalImage images={images} />
      </div>
    </div>
  );
};

export default ReviewCampaignDetails;
