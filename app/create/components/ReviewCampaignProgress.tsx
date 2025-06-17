import { formatNumberCompact } from "@/app/utils";
import ReviewMoreInfo from "./ReviewMoreInfo";

const ReviewCampaignProgress = ({
  balance,
  target,
  location,
  donationCount,
  socialLinks
}: {
  balance: number;
  target: number;
  location: string;
  donationCount: number;
  socialLinks: { [key: string]: string };
}) => {
  return (
    <div className="top-0 flex h-fit max-w-[450px] flex-col gap-3 lg:sticky lg:p-8">
      <p className="text-xl font-medium tracking-tight">
        {formatNumberCompact(balance || 0)} STRK
      </p>
      <p className="text-foreground-secondary">
        Raised till now{" "}
        <span className="text-xs font-bold text-accent-green">
          {" "}
          (Target: {formatNumberCompact(Number(target) || 0)} STRK)
        </span>{" "}
      </p>
      <div className="relative mb-2 h-[.25rem] w-full">
        <div className="mb-4 h-[1.5vw] max-h-[.25rem] w-full rounded-full bg-[#EFEFEF]"></div>
      </div>
      <p className="text-xl font-medium tracking-tight">
        {formatNumberCompact(Number(target) || 0)} STRK
      </p>
      <p className="text-foreground-secondary">Campaign goal</p>

      <p className="text-xl font-medium tracking-tight">{location}</p>
      <p className="text-foreground-secondary">Campaign location</p>
      <p className="text-accent-green">
        {formatNumberCompact(Number(donationCount) || 0)}{" "}
        {donationCount > 1 ? "donations" : "donation"}
      </p>
      <div className="hidden lg:flex">
        <ReviewMoreInfo socialLinks={socialLinks} />
      </div>
      <div className="block w-full rounded-[25px] bg-accent-green px-2 py-2 text-center text-white lg:min-w-[23rem]">
        Donate now
      </div>
    </div>
  );
};

export default ReviewCampaignProgress;
