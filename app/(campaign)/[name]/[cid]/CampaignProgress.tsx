import { formatNumberCompact } from "@/app/utils";
import VerifiedIcon from "@/svgs/VerifiedIcon";
import MoreInfo from "./MoreInfo";

interface CampaignProgressProps {
  balance: number;
  target: string;
  location: string;
  donationCount: number;
  onDonate: () => void;
}

const CampaignProgress = ({
  balance,
  target,
  location,
  donationCount,
  onDonate
}: CampaignProgressProps) => {
  const width = `${Math.min((balance / parseInt(target)) * 100, 100)}%`;

  return (
    <div className="top-[5rem] flex h-fit max-w-[450px] flex-col gap-3 p-8 lg:sticky">
      <p className="flex items-center gap-1 text-accent-green">
        <VerifiedIcon />
        Verified & Protected Campaign{" "}
      </p>
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
        <div
          style={{
            width: width
          }}
          className={`absolute top-0 mb-4 h-[1vw] max-h-[.25rem] rounded-full bg-[#34AA6D]`}
        ></div>
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
        <MoreInfo />
      </div>
      <button
        className="w-full rounded-[25px] bg-accent-green px-2 py-2 text-white"
        onClick={onDonate}
      >
        <span>Donate now</span>
      </button>
    </div>
  );
};

export default CampaignProgress;
